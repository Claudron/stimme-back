from django.urls import path, include
from . import views
from .views import ContentList, ContentDetail


urlpatterns = [
    path('content/', ContentList.as_view(), name='content_list'),
    path('content/<int:id>/', ContentDetail.as_view(), name='content_detail'),
]
