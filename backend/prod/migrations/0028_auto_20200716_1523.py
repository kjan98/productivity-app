# Generated by Django 3.0.6 on 2020-07-16 15:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('prod', '0027_auto_20200716_1507'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='colors',
        ),
        migrations.AddField(
            model_name='project',
            name='project_color',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='project_color', to='prod.Color'),
        ),
    ]
