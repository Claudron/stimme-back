# Generated by Django 4.2.1 on 2023-08-20 10:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('exercises', '0002_exercisemethod_exercisemethodfile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='exercisefile',
            name='exercise',
        ),
        migrations.DeleteModel(
            name='Exercise',
        ),
        migrations.DeleteModel(
            name='ExerciseFile',
        ),
    ]