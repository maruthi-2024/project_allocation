from django.urls import  path

from .views import members,listOfemployees,add_emp,project_emp 
urlpatterns = [
    path('',members,name="employee"),
    path('users/',listOfemployees,name="employee"),
    path('add/',add_emp,name="add emp"),
    path("proj/",project_emp,name="project emp")
]