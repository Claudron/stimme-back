from rest_framework import serializers
from .models import Content, ContentImage

class ContentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentImage
        fields = ['image']

class ContentSerializer(serializers.ModelSerializer):
    content_image = ContentImageSerializer(source='images', many=True, read_only=True)

    class Meta:
        model = Content
        fields = ['id', 'title', 'body', 'date_created',
                  'date_update', 'thumbnail', 'content_image', 'embed_video_url']
