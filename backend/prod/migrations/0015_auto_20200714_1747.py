# Generated by Django 3.0.6 on 2020-07-14 17:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('prod', '0014_auto_20200714_1606'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='projectColor',
            new_name='project_id',
        ),
    ]
