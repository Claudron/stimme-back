from rest_framework import serializers
from .models import Content

class ContentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    title = serializers.CharField(max_length=255)
    body = serializers.CharField()
    date_created = serializers.DateTimeField()
    date_update = serializers.DateTimeField()
    featured_image = serializers.ImageField()

    class Meta:
        model = Content
        fields = ['id', 'title', 'body', 'date_created', 'date_update', 'featured_image']