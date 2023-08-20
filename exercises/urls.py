from django.urls import path
from .views import ExerciseMethodList

urlpatterns = [
    # path('exercises/', ExerciseMethodList.as_view(), name='exercise-list'),
    path('method/', ExerciseMethodList.as_view(), name='exercise-method-list'),
]
