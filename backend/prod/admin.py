from django.contrib import admin
from .models import Task, Time, Current, Archive  # , Project
from .models import Project, Color


# Register your models here.
class ColorAdmin(admin.ModelAdmin):
    list_display = ('id', 'color', 'hex_color')


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'project_color')


class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'task', 'completed',  'project_info')


class TimeAdmin(admin.ModelAdmin):
    list_display = ('id', 'task_id', 'timerStart', 'timerTime', 'inProgress', 'timerInterval')


class CurrentAdmin(admin.ModelAdmin):
    list_display = ('id', 'tasks')


class ArchiveAdmin(admin.ModelAdmin):
    list_display = ('id', 'task_id')


admin.site.register(Task, TaskAdmin)
admin.site.register(Time, TimeAdmin)
admin.site.register(Color, ColorAdmin)
admin.site.register(Current, CurrentAdmin)
admin.site.register(Archive, ArchiveAdmin)
admin.site.register(Project, ProjectAdmin)
