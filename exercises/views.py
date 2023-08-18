from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Exercise
from .serializers import ExerciseSerializer
from rest_framework.response import Response
from rest_framework import status

class ExerciseList(APIView):
        # permission_classes = [IsAuthenticated]

        queryset = Exercise.objects.all()
        serializer_class = ExerciseSerializer

        def get(self, request, *args, **kwargs):
                exercises = Exercise.objects.all()
                serializer = ExerciseSerializer(exercises, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)

