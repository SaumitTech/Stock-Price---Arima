from django.db import models

# Create your models here.

class Stocksl(models.Model):
    name = models.CharField(max_length=1000,default='')
    exchange = models.CharField(max_length=100,default='')
    ticker = models.CharField(max_length=100,primary_key=True)
    category = models.CharField(max_length=100,default='')
    label = models.CharField(max_length=1000,default='')


class Users(models.Model):
    name = models.CharField(max_length=1000,default='')
    email = models.CharField(max_length=100,primary_key=True)
    password = models.CharField(max_length=100)

