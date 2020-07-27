from rest_framework import serializers

from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    key = serializers.IntegerField(source='id')

    class Meta:
        model = Task
        fields = ('key', 'title', 'memo', 'created')

