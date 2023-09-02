from django.shortcuts import render
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import PostContent, Category, AudioContent
from .serializers import PostContentSerializer, CategoryListSerializer, AudioContentSerializer



class ContentList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = PostContent.objects.all()

        # Filter by category
        category_id = request.query_params.get('categories', None)
        if category_id:
            queryset = queryset.filter(category__id=category_id)

        # Here, print the queryset before filtering by search
        print("Query before search filter:", queryset.query)

        # Filter by search
        search_text = request.query_params.get('search', None)
        if search_text:
            queryset = queryset.filter(
                Q(title__icontains=search_text) |
                Q(tags__label__icontains=search_text)  # Search in tags
        )

        # Here, print the queryset after filtering by search
        print("Query after search filter:", queryset.query)

        # Order by a specific field
        order = request.query_params.get('ordering', None)
        if order:
            queryset = queryset.order_by(order)

        paginator = PageNumberPagination()
        paginated_queryset = paginator.paginate_queryset(queryset, request)

        if paginated_queryset is not None:
            serializer = PostContentSerializer(paginated_queryset, many=True)
            return paginator.get_paginated_response(serializer.data)

        serializer = PostContentSerializer(queryset, many=True)
        return Response(serializer.data)


class PostContentDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        content = PostContent.objects.get(pk=id)
        serializer = PostContentSerializer(content)
        return Response(serializer.data)


class CategoryList(APIView):
    def get(self, request):
        queryset = Category.objects.all()
        serializer = CategoryListSerializer(queryset, many=True)
        return Response(serializer.data)


class AudioContentDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        audio = AudioContent.objects.get(pk=id)
        serializer = AudioContentSerializer(audio)
        return Response(serializer.data)


class AudioContentList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = AudioContent.objects.all()
        serializer = AudioContentSerializer(queryset, many=True)
        return Response(serializer.data)