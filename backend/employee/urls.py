from django.urls import include, path

from .views import members,listOfUsers 
urlpatterns = [
    path('',members,name="employee"),
    path('users',listOfUsers,name="employee")
]