# Generated by Django 5.0.3 on 2024-03-18 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Employee', '0005_alter_employee_blood_group_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='gender',
            field=models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')], default='M', max_length=1, verbose_name='Gender'),
        ),
    ]
