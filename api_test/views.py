from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Content
from .serializers import ContentSerializer


@api_view()
def content_list(request):
    queryset = Content.objects.all()
    serializer = ContentSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view()
def content_detail(request, id):
    content = Content.objects.get(pk=id)
    serializer = ContentSerializer(content)
    return Response(serializer.data)
