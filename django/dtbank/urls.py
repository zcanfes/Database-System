from django.urls import path

from .views import create_table, create_trigger, insert_data, requirements

urlpatterns = [
    path('api/create/table', create_table.index),
    path('api/create/trigger', create_trigger.index),
    path('api/insert/data', insert_data.index),

    path('api/login/user', requirements.LoginUser.as_view()),
    path('api/login/manager', requirements.LoginManager.as_view()),

    path('api/insert/user', requirements.InsertUser.as_view()),

    path('api/delete_update_drug', requirements.DeleteUpdateDrug.as_view()),
    path('api/delete_protein', requirements.DeleteProtein.as_view()),
    path('api/interactions/<str:id>', requirements.Interactions.as_view()),
    path('api/side_effects/<str:id>', requirements.SideEffects.as_view()),
]
