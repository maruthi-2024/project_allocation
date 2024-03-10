from django.shortcuts import render
from django.http import HttpResponse

from .models import User

def members(request):
    return render(request,"home.html")

def listOfUsers(request):
    list_of_users=User.objects.all().values()
    for mem in list_of_users:
        print(mem)
    return render(request,"home.html")