from django.contrib import admin, messages
from .models import ExerciseMethod, ExerciseMethodFile, Exercise
from django.conf import settings
import os


class ExerciseMethodFileInline(admin.TabularInline):
    model = ExerciseMethodFile
    extra = 0


class ExerciseMethodAdmin(admin.ModelAdmin):
    inlines = [ExerciseMethodFileInline]
    change_form_template = 'admin/exercise_method_bulk_upload.html'

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

        # Process bulk uploaded files
        for uploaded_file in request.FILES.getlist('files'):
            # Extract details from the file name
            file_name = uploaded_file.name.rsplit(
                '.', 1)[0]  # Removing file extension

            parts = file_name.split('_')
            if len(parts) != 5:
                messages.error(
                    request, f"File '{uploaded_file.name}' does not match the expected format and was skipped.")
                continue
            exercise_name, range, direction1, direction2, tempo = parts
            direction = f"{direction1}_{direction2}"

            # Create ExerciseFile entry
            ExerciseMethodFile.objects.create(
                exercise_method=obj,
                direction=direction,
                range=range,
                tempo=tempo,
                file=uploaded_file
            )


    # Custom delete_selected action to ensure the delete method of the model is called
    def delete_selected(self, request, queryset):
        for obj in queryset:
            obj.delete()
        self.message_user(request, "Selected ExerciseMethods and their associated files and folders have been deleted.")
    delete_selected.short_description = "Delete selected ExerciseMethods and their associated files and folders"

    # Override the actions to use the custom delete_selected
    actions = [delete_selected]      



class ExerciseAdmin(admin.ModelAdmin):
    filter_horizontal = ('methods',)






admin.site.register(ExerciseMethod, ExerciseMethodAdmin)
admin.site.register(Exercise, ExerciseAdmin)
