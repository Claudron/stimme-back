from django.contrib import admin
from .models import ContentImage, AudioContent, Category
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


class AudioContentAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'date_created', 'display_categories')
    ordering = ('title', 'id', 'date_created')
    search_fields = ('title',)
    list_filter = ('date_created',)

    def display_categories(self, obj):
        return ", ".join(category.name for category in obj.category.all())
    display_categories.short_description = 'Categories'


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ('name',)


admin.site.register(models.PostContent, ContentAdmin)
admin.site.register(models.AudioContent, AudioContentAdmin)
admin.site.register(Category, CategoryAdmin)
