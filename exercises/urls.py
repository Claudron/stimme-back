from django.urls import path
from .views import ExerciseMethodList, ExerciseList, UserExercisesPlaylistView

urlpatterns = [
    path('exercises/', ExerciseList.as_view(), name='exercise-list'),
    path('method/', ExerciseMethodList.as_view(), name='exercise-method-list'),
    path('playlist/', UserExercisesPlaylistView.as_view(), name='user-exercises-playlist'),
]
