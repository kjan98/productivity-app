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

    # def to_representation(self, instance):
    #     data = super(ProjectSerializer, self).to_representation(instance)
    #     project_color = data.pop('project_color')
    #     for key, val in project_color.items():
    #         if key == 'id':
    #             key = 'color_id'
    #         data.update({key: val})
    #     return data


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

    # def to_representation(self, instance):
    #     data = super(CurrentSerializer, self).to_representation(instance)
    #     tasks = data.pop('tasks')
    #     for key, value in tasks.items():
    #         if key == 'id':
    #             key = 'task_id'
    #         data.update({key: value})
    #     return data

    def update(self, instance, data):
        task_data = data.pop('tasks')
        tasks = instance.tasks

        instance.id = data.get('id', instance.id)
        # tasks
        setattr(tasks, 'task', task_data['task'])
        setattr(tasks, 'completed', task_data['completed'])
        # project_info
        project_info = tasks.project_info
        setattr(project_info, 'name', project_info.name)

        # project_color
        color = project_info.project_color
        setattr(color, 'color', color.color)
        setattr(color, 'hex_color', color.hex_color)

        color.save()
        project_info.save()
        tasks.save()
        return instance


class ArchiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archive
        fields = ('id', 'task_id')
