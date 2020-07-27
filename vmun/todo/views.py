from django.shortcuts import render
from rest_framework import generics
from django.views import View
from django.http import JsonResponse

from .models import Task
from .serializers import TaskSerializer


class TaskListCreate(generics.ListCreateAPIView):
    queryset = Task.objects.get_queryset().order_by('created')
    serializer_class = TaskSerializer


class IndexView(View):
    template_name = "todo/index.html"

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

    def post(self, request, *args, **kwargs):
        if 'delete' in request.POST.get("method"):
            Task.objects.filter(id=request.POST.get("keyid")).delete()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False})
        