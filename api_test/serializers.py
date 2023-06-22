from api_test.models import Content
from rest_framework import serializers
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer


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
