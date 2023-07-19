from templated_mail.mail import BaseEmailMessage
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse
from django.shortcuts import render
from django.core.mail import send_mail, mail_admins, BadHeaderError
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from rest_framework import status
from rest_framework.response import Response
from .models import Content
from .serializers import ContentSerializer,  UserCreateSerializer
from djoser.views import TokenCreateView as DjoserTokenCreateView
from djoser.views import UserViewSet
from djoser.email import ActivationEmail
from djoser import utils
from djoser.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import BaseAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenRefreshView as SimpleJWTTokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError


class ContentList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = Content.objects.all()
        serializer = ContentSerializer(queryset, many=True)
        return Response(serializer.data)


class ContentDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        content = Content.objects.get(pk=id)
        serializer = ContentSerializer(content)
        return Response(serializer.data)


# User creation

# class CreateUserView(APIView):
#     authentication_classes = []  # Override global setting
#     permission_classes = []  # This makes the view publicly accessible

#     def post(self, request, format=None):
#         serialized = UserCreateSerializer(data=request.data)
#         if serialized.is_valid():
#             user_model = get_user_model()
#             user_model.objects.create_user(
#                 email=serialized.validated_data['email'],
#                 password=serialized.validated_data['password'],
#                 first_name=serialized.validated_data['first_name'],
#                 last_name=serialized.validated_data['last_name']
#             )
#             return Response({"status": "User created successfully"}, status=status.HTTP_201_CREATED)
#         else:
#             return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)


#  Auth Token

class TokenCreateView(DjoserTokenCreateView):
    authentication_classes = []

    def _action(self, serializer):
        self.user = serializer.user
        token = RefreshToken.for_user(self.user)
        response = Response({"detail": "Success"})
        response.set_cookie("access_token", str(
            token.access_token), httponly=True)
        response.set_cookie("refresh_token", str(
            token), httponly=True)
        return response


class RefreshTokenView(SimpleJWTTokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        token = RefreshToken(refresh_token)
        response = Response({
            'access': str(token.access_token),
            'refresh': str(token),
        })
        response.set_cookie("access_token", str(
            token.access_token), httponly=True)
        response.set_cookie("refresh_token", str(token), httponly=True)
        return response


class LogoutView(APIView):
    def post(self, request):
        try:
            response = Response(
                {"detail": "Logout successful"}, status=status.HTTP_200_OK)
            response.delete_cookie("refresh_token")
            response.delete_cookie("access_token")
            return response
        except (InvalidToken, TokenError) as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)
        if header is None:
            raw_token = request.COOKIES.get(
                'access_token')  # or whatever key you use
        else:
            raw_token = self.get_raw_token(header)

        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)

        return self.get_user(validated_token), validated_token


class AuthStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"authenticated": True}, status=status.HTTP_200_OK)


# Email Test
# if you send more than one email use send_mass_mail


def test_email(request):
    try:
        message = BaseEmailMessage(
            template_name='emails/test_email.html',
            context={'name': 'Claudron'}
        )
        message.send(['jane@gmail.com'])
        # Return a response if the email was sent successfully
        return HttpResponse('Email sent successfully')
    except BadHeaderError:
        # Return a response if there was an error
        return HttpResponse('Invalid header found')
    

# this overrides the djoser activation emaili and using the localhost:5173
# instead of the http://127.0.0.1:8000 of the backendserver. This has to be changed in production!!!
# also check which tmaplate is beeing send

class CustomActivationEmail(ActivationEmail):
    template_name = "email/activation.html"

    def get_context_data(self):
      
        context = super().get_context_data()

        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["domain"] = "localhost:5173"
        context["url"] = settings.ACTIVATION_URL.format(**context)
        return context