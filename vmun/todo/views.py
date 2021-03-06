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
    def get(self, request, *args, **kwargs):
        # qs = Task.objects.all()
        return JsonResponse({'objects': 'test'})    

    def post(self, request, *args, **kwargs):
        if 'delete' in request.POST.get("method"):
            Task.objects.filter(id=request.POST.get("keyid")).delete()
            return JsonResponse({'success': True})
        elif 'update' in request.POST.get("method"):
            td = Task.objects.filter(id=request.POST.get("idx"))
            t = request.POST.get("title")
            m = request.POST.get("memo")
            td.update(title=t, memo=m)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False})
        