from django.urls import path, include
from . import views
from .views import ContentList, PostContentDetail, CategoryList, AudioContentList, AudioContentDetail


urlpatterns = [
    path('list/', ContentList.as_view(), name='content_list'),
    path('detail/<int:id>/', PostContentDetail.as_view(), name='content_detail'),
    path('categories/', CategoryList.as_view(), name='category_list'),
    path('audio/', AudioContentList.as_view(), name='audio_list'),
    path('audio/<int:id>/', AudioContentDetail.as_view(), name='audio_detail'),
]
