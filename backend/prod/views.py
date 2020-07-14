from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TaskSerializer, TimeSerializer, CurrentSerializer, ArchiveSerializer
from .models import Task, Time, Current, Archive
from .serializers import ProjectSerializer
from .models import Project


# Create your views here.
# class ProjectView(viewsets.ModelViewSet):
#     serializer_class = ProjectSerializer
#     queryset = Project.objects.all()

class ProjectView(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class TaskView(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TimeView(viewsets.ModelViewSet):
    serializer_class = TimeSerializer
    queryset = Time.objects.all()


class CurrentView(viewsets.ModelViewSet):
    serializer_class = CurrentSerializer
    queryset = Current.objects.all()


class ArchiveView(viewsets.ModelViewSet):
    serializer_class = ArchiveSerializer
    queryset = Archive.objects.all()
