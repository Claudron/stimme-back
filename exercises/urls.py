from django.urls import path
from .views import ExerciseMethodList, ExerciseList

urlpatterns = [
    path('exercises/', ExerciseList.as_view(), name='exercise-list'),
    path('method/', ExerciseMethodList.as_view(), name='exercise-method-list'),
]
