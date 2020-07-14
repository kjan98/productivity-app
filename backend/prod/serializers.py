from rest_framework import serializers
from .models import Task, Time, Current, Archive  # , Project
# from .models import Project


# class ProjectSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Project
#         fields = ('id', 'color')


class TaskSerializer(serializers.ModelSerializer):
    # projectColor = ProjectSerializer()

    class Meta:
        model = Task
        # fields = ('id', 'task', 'completed', 'projectName',  'projectColor')
        fields = ('id', 'task', 'completed', 'projectName')


# class ProjectSerializer(serializers.ModelSerializer):
#     project_set = TaskSerializer(read_only=True)
#
#     class Meta:
#         model = Project
#         fields = ('id', 'project_set')


class TimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Time
        fields = ('id', 'task_id', 'timerStart', 'timerTime', 'inProgress', 'timerTimer')


class CurrentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Current
        fields = ('id', 'task_id')


class ArchiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archive
        fields = ('id', 'task_id')
