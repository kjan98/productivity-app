# Generated by Django 3.0.6 on 2020-07-16 14:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('prod', '0022_auto_20200716_1423'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='current',
            name='task_id',
        ),
        migrations.AddField(
            model_name='current',
            name='tasks',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='prod.Task'),
        ),
    ]
