from django.db import models
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=100)
   

    def __str__(self) -> str:
        return self.name

    class Meta:
        ordering = ['name']


class Content(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    date_created = models.DateTimeField(default=timezone.now)
    date_update = models.DateTimeField(auto_now=True)
    thumbnail = models.ImageField(
        upload_to='content_thumbnails/', blank=True, null=True)
    embed_video_url = models.URLField(max_length=200, blank=True, null=True)
    category = models.ManyToManyField(Category, blank=True)

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['title']


class ContentImage(models.Model):
    content = models.ForeignKey(
        Content, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to='content_images/', blank=True, null=True)

    def __str__(self) -> str:
        return f'{self.content.title} - {self.image.name}'

    def delete(self, *args, **kwargs):
        self.image.delete(save=False)
        super().delete(*args, **kwargs)
