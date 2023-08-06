from django.contrib import admin
from .models import ContentImage, Category
from . import models


class ContentImageInline(admin.TabularInline):
    model = ContentImage
    extra = 1


class ContentAdmin(admin.ModelAdmin):
    inlines = [ContentImageInline]
    list_display = ('id', 'title', 'date_created', 'display_categories')
    ordering = ('title', 'id', 'date_created')
    search_fields = ('title',)
    list_filter = ('date_created',)

    def display_categories(self, obj):
        return ", ".join(category.name for category in obj.category.all())
    display_categories.short_description = 'Categories'


admin.site.register(models.Content, ContentAdmin,)
admin.site.register(Category)
