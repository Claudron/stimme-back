from django.urls import path
from .views import ExerciseList

urlpatterns = [
    path('exercises/', ExerciseList.as_view(), name='exercise-list'),
]