from rest_framework import serializers
from .models import Content


class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content
        fields = ['id', 'title', 'body', 'date_created',
                  'date_update', 'thumbnail', 'content_image']
