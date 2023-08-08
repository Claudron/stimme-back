from django.contrib import admin

from .models import ContentImage, Category
from tags.models import TaggedItem
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


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'display_parent')
    search_fields = ('name',)
    list_filter = ('parent',)
    ordering = ('parent__name', 'name',)

    def display_parent(self, obj):
        return " -> ".join(self.get_parents(obj))

    def get_parents(self, obj):
        # Create a list to store the names
        names = []

        # While there is a parent, add the parent's name to the list and move up the tree
        while obj is not None:
            names.append(obj.name)
            obj = obj.parent

        # Reverse the list so that the root is at the beginning and return it
        return names[::-1]

    display_parent.short_description = 'Parent Categories'


admin.site.register(models.Content, ContentAdmin,)
admin.site.register(Category, CategoryAdmin)
