from django.contrib import admin
from .models import ContentImage
from . import models


class ContentImageInline(admin.TabularInline):
    model = ContentImage
    extra = 1

class ContentAdmin(admin.ModelAdmin):
    inlines = [ContentImageInline]
    list_display = ('id', 'title', 'date_created')
    ordering = ('title', 'id', 'date_created')



admin.site.register(models.Content, ContentAdmin)