# Generated by Django 3.0.6 on 2020-07-14 01:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('prod', '0013_auto_20200714_0147'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='project_id',
        ),
    ]
