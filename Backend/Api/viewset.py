from django.http import HttpResponse,JsonResponse,response
from django.contrib.auth import authenticate, login,logout

Login_url=""
from rest_framework.decorators import api_view

@api_view(["GET"])
def testclass(request):
    if request.user.is_authenticated:
       print(request,request.user.email)
       logout(request)
       print("logged out done")
    else:
        employee = authenticate(username="maruthi09", password="phani")
        login(request,employee)
        print("not logged")
    return HttpResponse("<h1>ok</h1>")

def testadmin(request):
    if request.user.is_authenticated:
       print(request,request.user.email)
       logout(request)
       print("admin logged out done")
    else:
        employee = authenticate(username="admin", password="admin")
        login(request,employee)
        print("admin logged in ")
    return HttpResponse("<h1>ok</h1>")







