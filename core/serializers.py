from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.settings import api_settings
from rest_framework import status
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from django.contrib.auth.models import update_last_login
from core.models import Content
from rest_framework import serializers
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer


class ContentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    title = serializers.CharField(max_length=255)
    body = serializers.CharField()

    class Meta:
        model = Content
        fields = ['id', 'title', 'body',]


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'email', 'password', 'first_name', 'last_name']
        # for more fields make two separate api calls single responsibillity!!!


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = ['id', 'email', 'first_name', 'last_name']
        read_only_fields = []

# add error message for inactive users
class InActiveUser(AuthenticationFailed):
    status_code = status.HTTP_406_NOT_ACCEPTABLE
    default_detail = "User is not active, please confirm your email"
    default_code = 'user_is_inactive'


# noinspection PyAbstractClass
class CustomTokenObtainPairSerializer(TokenObtainSerializer):

    @classmethod
    def get_token(cls, user):
        return RefreshToken.for_user(user)

    def validate(self, attrs):
        data = super().validate(attrs)
        if not self.user.is_active:
            raise InActiveUser()

        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data
