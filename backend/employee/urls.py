from django.urls import include, path

from .views import members 
urlpatterns = [
    path('',members,name="employee")
]