from django.urls import path

from .views import create_table, create_trigger

urlpatterns = [
    path('api/create_table', create_table.index, name='create_table'),
    path('api/create_trigger', create_trigger.index, name='create_trigger'),
]
