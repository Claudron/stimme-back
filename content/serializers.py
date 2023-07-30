from rest_framework import serializers
from .models import Content

class ContentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    title = serializers.CharField(max_length=255)
    body = serializers.CharField()

    class Meta:
        model = Content
        fields = ['id', 'title', 'body',]