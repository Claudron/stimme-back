from django.db import models
from django.utils import timezone

class Content(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    date_created = models.DateTimeField(default=timezone.now)
    date_update = models.DateTimeField(auto_now=True)
    thumbnail = models.ImageField(upload_to='content_thumbnails/', blank=True, null=True)
    content_image = models.ImageField(upload_to='content_images/', blank=True, null=True)


    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['title']



