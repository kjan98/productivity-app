from django.db import models


# Create your models here.
class Color(models.Model):
    hex_color = models.CharField(max_length=120, blank=True)
    color = models.CharField(max_length=120)

    def _str_(self):
        return self.color, self.hex_color


class Project(models.Model):
    name = models.CharField(max_length=120, blank=True)
    project_color = models.ForeignKey(Color,  null=True,  on_delete=models.CASCADE, related_name='project_color')

    def _str_(self):
        return self.name


class Task(models.Model):
    task = models.CharField(max_length=120)
    completed = models.BooleanField(default=False)
    project_info = models.ForeignKey(Project, null=True, on_delete=models.CASCADE, related_name='project_info')

    def _str_(self):
        return self.task


class Time(models.Model):
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)
    timerStart = models.IntegerField(default=0)
    timerTime = models.IntegerField(default=0)
    inProgress = models.BooleanField(default=False)
    timerInterval = models.IntegerField(default=0)

    def _str_(self):
        return self.task_id


class Current(models.Model):
    # foo = models.CharField(default='foo', max_length=120)
    tasks = models.ForeignKey(Task, null=True, blank=True, on_delete=models.CASCADE,  related_name='tasks')

    def _str_(self):
        return self.tasks


class Archive(models.Model):
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE, null=True)

    def _str_(self):
        return self.task_id
