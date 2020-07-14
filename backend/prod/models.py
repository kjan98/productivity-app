from django.db import models


# Create your models here.
# class Project(models.Model)


class Task(models.Model):
    task = models.CharField(max_length=120)
    completed = models.BooleanField(default=False)
    project = models.CharField(max_length=120)

    def _str_(self):
        return self.task


class Time(models.Model):
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)
    timerStart = models.IntegerField(default=0)
    timerTime = models.IntegerField(default=0)
    inProgress = models.BooleanField(default=False)
    timerTimer = models.IntegerField(default=0)

    def _str_(self):
        return self.task_id


class Current(models.Model):
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)

    def _str_(self):
        return self.task_id


class Archive(models.Model):
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)

    def _str_(self):
        return self.task_id
