# Generated by Django 5.1.1 on 2024-10-08 14:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_user_is_active_user_is_staff_alter_user_genero'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='estado',
        ),
    ]
