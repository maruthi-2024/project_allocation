# Generated by Django 5.0.3 on 2024-03-12 10:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Employee', '0003_rename_emp_skills_employee_skills'),
        ('Skills', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Employee_skills',
            new_name='Employee_skill',
        ),
    ]