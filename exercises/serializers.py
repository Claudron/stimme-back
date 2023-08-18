from rest_framework import serializers
from .models import Exercise, ExerciseFile

class ExerciseFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseFile
        fields = '__all__'

class ExerciseSerializer(serializers.ModelSerializer):
    files = ExerciseFileSerializer(many=True, read_only=True)

    class Meta:
        model = Exercise
        fields = ['id', 'name', 'files']
