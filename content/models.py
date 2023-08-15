from django.db import models
from django.utils import timezone
import os


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name

    class Meta:
        ordering = ['name']


class Tag(models.Model):
    label = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.label


class BaseContent(models.Model):
    title = models.CharField(max_length=100)
    date_created = models.DateTimeField(default=timezone.now)
    date_update = models.DateTimeField(auto_now=True)
    category = models.ManyToManyField(Category, blank=True)
    tags = models.ManyToManyField(Tag)

    class Meta:
        abstract = True


class PostContent(BaseContent):
    body = models.TextField()
    thumbnail = models.ImageField(
        upload_to='content_thumbnails/', blank=True, null=True)
    embed_video_url = models.URLField(max_length=200, blank=True, null=True)

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['title']


class AudioContent(BaseContent):
    audio_file = models.FileField(upload_to="audio")

    def delete(self, *args, **kwargs):
        if self.audio_file:
            if os.path.isfile(self.audio_file.path):
                os.remove(self.audio_file.path)
        super().delete(*args, **kwargs)


    def __str__(self) -> str:
        return self.title
    class Meta:
        ordering = ['title']       


class ContentImage(models.Model):
    content = models.ForeignKey(
        PostContent, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to='content_images/', blank=True, null=True)

    def __str__(self) -> str:
        return f'{self.content.title} - {self.image.name}'

    def delete(self, *args, **kwargs):
        self.image.delete(save=False)
        super().delete(*args, **kwargs)
