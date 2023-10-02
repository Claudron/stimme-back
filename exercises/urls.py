from django.urls import path
from .views import ExerciseMethodList, ExerciseList, UserExercisesPlaylistView, GenerateMethodFileURLView

urlpatterns = [
    path('exercises/', ExerciseList.as_view(), name='exercise-list'),
    path('get-method-file-url/<int:file_reference>/', GenerateMethodFileURLView.as_view(), name='generate-signed-url'),
    path('method/', ExerciseMethodList.as_view(), name='exercise-method-list'),
    path('playlist/', UserExercisesPlaylistView.as_view(), name='user-exercises-playlist'),
]
