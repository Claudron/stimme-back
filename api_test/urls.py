from django.urls import path
from . import views

urlpatterns = [
    path('content/', views.content_list),
    path('content/<int:id>', views.content_detail)
]
