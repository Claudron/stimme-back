from rest_framework import serializers
from .models import ExerciseMethod, ExerciseMethodFile


class ExerciseMethodFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseMethodFile
        fields = '__all__'


class ExerciseMethodSerializer(serializers.ModelSerializer):
    files = ExerciseMethodFileSerializer(many=True, read_only=True)

    class Meta:
        model = ExerciseMethod
        fields = ['id', 'name', 'files']
