# Generated by Django 4.2.1 on 2023-08-14 14:23

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0009_remove_category_parent'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='PostContent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('date_created', models.DateTimeField(default=django.utils.timezone.now)),
                ('date_update', models.DateTimeField(auto_now=True)),
                ('body', models.TextField()),
                ('thumbnail', models.ImageField(blank=True, null=True, upload_to='content_thumbnails/')),
                ('embed_video_url', models.URLField(blank=True, null=True)),
                ('category', models.ManyToManyField(blank=True, to='content.category')),
                ('tags', models.ManyToManyField(to='content.tag')),
            ],
            options={
                'ordering': ['title'],
            },
        ),
        migrations.AlterField(
            model_name='contentimage',
            name='content',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='content.postcontent'),
        ),
        migrations.DeleteModel(
            name='Content',
        ),
    ]