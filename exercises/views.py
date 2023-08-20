from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import ExerciseMethod, Exercise
from .serializers import ExerciseMethodSerializer, ExerciseListSerializer
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