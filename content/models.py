from django.db import models

class Content(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    # date_created = models.DateTimeField(auto_now_add=True)
    # date_update = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['title']
