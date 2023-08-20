# Generated by Django 4.2.1 on 2023-08-20 09:30

from django.db import migrations, models
import django.db.models.deletion
import exercises.models


class Migration(migrations.Migration):

    dependencies = [
        ('exercises', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExerciseMethod',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='ExerciseMethodFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('direction', models.CharField(max_length=50)),
                ('range', models.CharField(max_length=50)),
                ('tempo', models.CharField(max_length=50)),
                ('file', models.FileField(upload_to=exercises.models.exercise_method_file_path)),
                ('exercise_method', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='files', to='exercises.exercisemethod')),
            ],
        ),
    ]