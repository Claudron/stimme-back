from rest_framework_simplejwt.views import TokenViewBase
from rest_framework_simplejwt.exceptions import AuthenticationFailed, InvalidToken, TokenError
from .serializers import CustomTokenObtainPairSerializer, InActiveUser
from django.contrib.auth.forms import AuthenticationForm
from templated_mail.mail import BaseEmailMessage
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse
from django.shortcuts import render
from django.core.mail import send_mail, mail_admins, BadHeaderError
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from rest_framework import status
from rest_framework.response import Response
from .serializers import UserCreateSerializer, CustomTokenObtainPairSerializer
from djoser.views import TokenCreateView as DjoserTokenCreateView
from djoser.views import UserViewSet
from djoser.email import ActivationEmail, PasswordResetEmail
from djoser import utils
from djoser.conf import settings as djoser_settings
from django.conf import settings as django_settings
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import BaseAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenRefreshView as SimpleJWTTokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

#  Auth Token


class TokenCreateView(DjoserTokenCreateView):
    authentication_classes = []
    serializer_class = CustomTokenObtainPairSerializer

    def _action(self, serializer):
        self.user = serializer.user
        token = RefreshToken.for_user(self.user)

        response = Response({"detail": "Success"})
        response.set_cookie("access_token", str(
            token.access_token), samesite='None', secure=django_settings.COOKIE_SECURE_SETTING, httponly=True)
        response.set_cookie("refresh_token", str(
            token), samesite='None', secure=django_settings.COOKIE_SECURE_SETTING, httponly=True)

        return response


class RefreshTokenView(SimpleJWTTokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            token = RefreshToken(refresh_token)

            response = Response({
                'access': str(token.access_token),
                'refresh': str(token),
            })
            response.set_cookie("access_token", str(
                token.access_token), samesite='None', secure=django_settings.COOKIE_SECURE_SETTING, httponly=True)
            response.set_cookie("refresh_token", str(
                token), samesite='None', secure=django_settings.COOKIE_SECURE_SETTING, httponly=True)
            return response

        except (InvalidToken, TokenError) as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    authentication_classes = []

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
                'access_token')
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


# this overrides the djoser emails and using the localhost:5173
# instead of the http://127.0.0.1:8000 of the backendserver. This has to be changed in production!!!
# It uses the djoser templates
# these views have to be set in the djoser settings in settings.py

class CustomActivationEmail(ActivationEmail):
    template_name = "email/activation.html"

    def get_context_data(self):
        context = super().get_context_data()

        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)

        # Fetch the domain from Django settings
        context["domain"] = django_settings.CUSTOM_EMAIL_DOMAIN

        context["url"] = djoser_settings.ACTIVATION_URL.format(**context)
        return context


class CustomPasswordResetEmail(PasswordResetEmail):
    template_name = "email/password_reset.html"

    def get_context_data(self):

        context = super().get_context_data()

        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["domain"] = django_settings.CUSTOM_EMAIL_DOMAIN
        context["url"] = djoser_settings.PASSWORD_RESET_CONFIRM_URL.format(
            **context)
        return context
