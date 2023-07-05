from django.contrib import admin
from . import models


class ContentAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    ordering = ('title', 'id',)


admin.site.register(models.Content, ContentAdmin)
