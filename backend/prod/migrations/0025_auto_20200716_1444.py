# Generated by Django 3.0.6 on 2020-07-16 14:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('prod', '0024_current_foo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='current',
            name='tasks',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='prod.Task'),
        ),
    ]
