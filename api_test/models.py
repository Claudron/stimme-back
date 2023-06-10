from django.db import models

class Content(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    

    def __str__(self) -> str:
        return self.title
    class Meta:
        ordering = ['title']