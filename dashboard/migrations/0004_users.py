# Generated by Django 3.0.3 on 2020-03-29 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0003_auto_20200326_2345'),
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('name', models.CharField(default='', max_length=1000)),
                ('email', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('password', models.CharField(max_length=100)),
            ],
        ),
    ]
