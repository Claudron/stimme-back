from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline
from content.admin import ContentAdmin
from tags.models import TaggedItem
from content.models import Content

class TagInline(GenericTabularInline):
    autocomplete_fields = ['tag']
    model = TaggedItem

class CustomContentAdmin(ContentAdmin):
    inlines = [TagInline] + ContentAdmin.inlines 


admin.site.unregister(Content)
admin.site.register(Content, CustomContentAdmin)