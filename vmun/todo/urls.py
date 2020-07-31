from django.urls import path

from . import views


urlpatterns = [
    path('api/task/', views.TaskListCreate.as_view(), name="task_api"),
    path('api/task/<int:id>/', views.TaskObjectView.as_view(), name="task_object"),
    path('', views.IndexView.as_view(), name='index'),
]

