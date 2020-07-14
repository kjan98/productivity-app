from django.contrib import admin
from .models import Task, Time, Current, Archive, Project


# Register your models here.
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'color')


class TaskAdmin(admin.ModelAdmin):
    # list_display = ('id', 'task', 'completed', 'project')
    list_display = ('id', 'task', 'completed', 'projectName', 'project_id')



class TimeAdmin(admin.ModelAdmin):
    list_display = ('id', 'task_id', 'timerStart', 'timerTime', 'inProgress', 'timerTimer')


class CurrentAdmin(admin.ModelAdmin):
    list_display = ('id', 'task_id')


class ArchiveAdmin(admin.ModelAdmin):
    list_display = ('id', 'task_id')


admin.site.register(Task, TaskAdmin)
admin.site.register(Time, TimeAdmin)
admin.site.register(Current, CurrentAdmin)
admin.site.register(Archive, ArchiveAdmin)
