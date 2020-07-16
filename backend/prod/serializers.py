from rest_framework import serializers
from .models import Task, Time, Current, Archive
from .models import Project, Color


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ('id', 'color', 'hex_color')


class ProjectSerializer(serializers.ModelSerializer):
    project_color = ColorSerializer()

    class Meta:
        model = Project
        fields = ('id', 'name', 'project_color')


class TaskSerializer(serializers.ModelSerializer):
    project_info = ProjectSerializer()

    class Meta:
        model = Task
        fields = ('id', 'task', 'completed', 'project_info')


class TimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Time
        fields = ('id', 'task_id', 'timerStart', 'timerTime', 'inProgress', 'timerInterval')


class CurrentSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer()

    class Meta:
        model = Current
        fields = ('id', 'foo', 'tasks')


class ArchiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archive
        fields = ('id', 'task_id')
