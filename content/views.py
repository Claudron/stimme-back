from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Content, Category
from .serializers import ContentSerializer, CategoryListSerializer


class ContentList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = Content.objects.all()

        # Filter by category
        category_id = request.query_params.get('categories', None)
        if category_id:
            queryset = queryset.filter(category__id=category_id)

        # Filter by search
        search_text = request.query_params.get('search', None)
        if search_text:
            queryset = queryset.filter(title__icontains=search_text)

        # Order by a specific field
        order = request.query_params.get('ordering', None)
        if order:
            queryset = queryset.order_by(order)

        paginator = PageNumberPagination()
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        
        if paginated_queryset is not None:
            serializer = ContentSerializer(paginated_queryset, many=True)
            return paginator.get_paginated_response(serializer.data)

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




