from django.urls import path

from .views import create_table, create_trigger, insert_table

urlpatterns = [
    path('api/create_table', create_table.index, name='create_table'),
    path('api/create_trigger', create_trigger.index, name='create_trigger'),
    path('api/insert_table', insert_table.index, name='insert_tabler'),
]
