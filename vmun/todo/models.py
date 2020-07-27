from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=50)
    memo = models.TextField(max_length=500)
    created = models.DateTimeField(auto_now_add=True)

