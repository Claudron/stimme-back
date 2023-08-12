from rest_framework import serializers
from .models import Content, ContentImage, Category
from django.contrib.contenttypes.models import ContentType
from tags.models import Tag, TaggedItem  

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

class ContentSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()
    category = CategorySerializer(many=True, read_only=True)
    content_image = ContentImageSerializer(source='images', many=True, read_only=True)

    class Meta:
        model = Content
        fields = ['id', 'title', 'body', 'date_created', 'category', 'tags',
                  'date_update', 'thumbnail', 'content_image', 'embed_video_url']

    def get_tags(self, obj):
        content_type = ContentType.objects.get_for_model(obj)
        tagged_items = TaggedItem.objects.filter(content_type=content_type, object_id=obj.id)
        tags = [item.tag for item in tagged_items]
        return TagSerializer(tags, many=True).data
