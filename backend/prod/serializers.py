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

    def to_representation(self, instance):
        data = super(ProjectSerializer, self).to_representation(instance)
        project_color = data.pop('project_color')
        for key, val in project_color.items():
            if key == 'id':
                key = 'color_id'
            data.update({key: val})
        return data


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
        fields = ('id', 'tasks')


class ArchiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archive
        fields = ('id', 'task_id')
