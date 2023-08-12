from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Content, Category
from .serializers import ContentSerializer, CategoryListSerializer


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


class CategoryList(APIView):
    def get(self, request):
        queryset = Category.objects.all()
        serializer = CategoryListSerializer(queryset, many=True)
        return Response(serializer.data)




