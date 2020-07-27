from rest_framework import serializers

from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    key = serializers.IntegerField(source='id')
    date = serializers.DateTimeField(source='created', format='%Y-%m-%d %H:%M')

    class Meta:
        model = Task
        fields = ('key', 'title', 'memo', 'date')

