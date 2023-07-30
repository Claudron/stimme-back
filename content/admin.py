from django.contrib import admin
from . import models


class ContentAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'date_created')
    ordering = ('title', 'id', 'date_created')


admin.site.register(models.Content, ContentAdmin)