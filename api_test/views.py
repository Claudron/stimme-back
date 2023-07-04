from rest_framework import status
from rest_framework.response import Response
from .models import Content
from .serializers import ContentSerializer
from djoser.views import TokenCreateView as DjoserTokenCreateView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
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
