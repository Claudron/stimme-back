from datetime import timedelta
from google.cloud import storage
from .models import ExerciseMethodFile
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import ExerciseMethod, Exercise, UserExercisePlaylist
from .serializers import ExerciseMethodSerializer, ExerciseListSerializer, UserExercisePlaylistSerializer
from rest_framework.response import Response
from rest_framework import status


class ExerciseMethodList(APIView):
    # permission_classes = [IsAuthenticated]

    queryset = ExerciseMethod.objects.all()
    serializer_class = ExerciseMethodSerializer

    def get(self, request, *args, **kwargs):
        exercises = ExerciseMethod.objects.all()
        serializer = ExerciseMethodSerializer(exercises, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ExerciseList(APIView):
    def get(self, request):
        queryset = Exercise.objects.all()
        serializer = ExerciseListSerializer(queryset, many=True)
        return Response(serializer.data)


class UserExercisesPlaylistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetch the playlist for the authenticated user
        user_playlist = UserExercisePlaylist.objects.filter(
            user=request.user).first()

        if user_playlist:
            serializer = UserExercisePlaylistSerializer(user_playlist)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "Playlist not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        user_playlist = UserExercisePlaylist.objects.filter(
            user=request.user).first()

        if user_playlist:
            # If the user already has a playlist, update it
            serializer = UserExercisePlaylistSerializer(
                user_playlist, data=request.data)
        else:
            # If the user doesn't have a playlist, create one
            serializer = UserExercisePlaylistSerializer(data=request.data)

        if serializer.is_valid():
            # Associate the playlist with the user and save
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class GenerateMethodFileURLView(APIView):
  
    def get(self, request, file_reference):
        try:
            # Fetch the file object using the file reference (could be ID, filename, etc.)
            exercise_file = ExerciseMethodFile.objects.get(id=file_reference)

            # Use the Google Cloud SDK to generate a fresh signed URL
            # (This part will need adjustments based on your GCS setup)
            storage_client = storage.Client()
            bucket = storage_client.bucket(settings.GS_BUCKET_NAME)
            # Assuming `file` is the FileField in your model
            blob = bucket.blob(exercise_file.file.name)
            signed_url = blob.generate_signed_url(
                version="v4", expiration=timedelta(hours=24))

            return Response({'signed_url': signed_url}, status=status.HTTP_200_OK)

        except ExerciseMethodFile.DoesNotExist:
            return Response({'error': 'File not found.'}, status=status.HTTP_404_NOT_FOUND)
