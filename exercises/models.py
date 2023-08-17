from django.db import models
import os
import shutil
from django.conf import settings

def exercise_file_path(instance, filename):
    return os.path.join('exercises', instance.exercise.name, filename)

class Exercise(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def delete(self, *args, **kwargs):
        # Delete all associated ExerciseFile instances and their files
        for file_instance in self.files.all():
            if file_instance.file:
                if os.path.isfile(file_instance.file.path):
                    os.remove(file_instance.file.path)
            file_instance.delete()

        # Delete the exercise's directory
        exercise_directory = os.path.join(settings.MEDIA_ROOT, 'exercises', self.name)
        if os.path.exists(exercise_directory):
            shutil.rmtree(exercise_directory)

        super().delete(*args, **kwargs)

    def __str__(self):
        return self.name

class ExerciseFile(models.Model):
    exercise = models.ForeignKey(Exercise, related_name='files', on_delete=models.CASCADE)
    direction = models.CharField(max_length=50)
    range = models.CharField(max_length=50)
    tempo = models.CharField(max_length=50)
    file = models.FileField(upload_to=exercise_file_path)

    def __str__(self):
        return f"{self.exercise.name}_{self.range}_{self.direction}_{self.tempo}"
