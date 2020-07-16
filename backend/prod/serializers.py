from rest_framework import serializers
from .models import Task, Time, Current, Archive
from .models import Project, Color

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'name', 'color_id')


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ('id', 'color', 'hex_color')



class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'task', 'completed', 'project_id')

class TimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Time
        fields = ('id', 'task_id', 'timerStart', 'timerTime', 'inProgress', 'timerInterval')


class CurrentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Current
        fields = ('id', 'task_id')


class ArchiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archive
        fields = ('id', 'task_id')
