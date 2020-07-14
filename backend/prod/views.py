from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TaskSerializer, TimeSerializer, CurrentSerializer, ArchiveSerializer, ProjectSerializer
from .models import Task, Time, Current, Archive, Project


# Create your views here.
class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class TimeView(viewsets.ModelViewSet):
    serializer_class = TimeSerializer
    queryset = Time.objects.all()


class CurrentView(viewsets.ModelViewSet):
    serializer_class = CurrentSerializer
    queryset = Current.objects.all()


class ArchiveView(viewsets.ModelViewSet):
    serializer_class = ArchiveSerializer
    queryset = Archive.objects.all()
