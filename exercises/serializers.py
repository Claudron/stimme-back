from rest_framework import serializers
from .models import ExerciseMethod, ExerciseMethodFile, Exercise, UserExercisePlaylist


class ExerciseMethodFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseMethodFile
        fields = ['id', 'direction', 'range', 'tempo']


class ExerciseMethodSerializer(serializers.ModelSerializer):
    files = ExerciseMethodFileSerializer(many=True, read_only=True)

    class Meta:
        model = ExerciseMethod
        fields = ['id', 'name', 'files']



class ExerciseListSerializer(serializers.ModelSerializer):
    methods = ExerciseMethodSerializer(many=True, read_only=True)
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'methods']


class UserExercisePlaylistSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = UserExercisePlaylist
        fields = '__all__'
