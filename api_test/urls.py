from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.content_list),
    path('test/<int:id>', views.content_detail)
]
