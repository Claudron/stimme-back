from rest_framework import serializers
from .models import PostContent, ContentImage, Category, Tag, AudioContent



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']


class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['label']


class ContentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentImage
        fields = ['image']


class PostContentSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    category = CategorySerializer(many=True, read_only=True)
    content_image = ContentImageSerializer(
        source='images', many=True, read_only=True)

    class Meta:
        model = PostContent
        fields = ['id', 'title', 'body', 'date_created', 'date_update',
                  'category', 'tags', 'thumbnail', 'content_image', 'embed_video_url']
        

class AudioContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioContent
        fields = ['id', 'title', 'audio_file', 'date_created', 'date_update', 'category', 'tags']
