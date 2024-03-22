from django.http import HttpResponse,JsonResponse,response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.status import HTTP_201_CREATED,HTTP_400_BAD_REQUEST,HTTP_200_OK,HTTP_204_NO_CONTENT
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.auth.decorators import user_passes_test,login_required
from django.contrib.auth import authenticate, login,logout

from Employee.models import Employee,Employee_skill
from Projects.models import Project,Project_skill
from Skills.models import Skill
from .serializers import EmployeeSerializer,ProjectSerializer,EmployeeSkillSerializer,ProjectSkillSerializer
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from Api.authentication import JWTAuthentication



#for getting all employees and creating a new employee only for superuser
@api_view(['POST',"GET"])
@authentication_classes([JWTAuthentication])  
@permission_classes([IsAuthenticated])
@user_passes_test(lambda u: u.is_superuser)
def Employees_View(request):
    print(request.user)
    if request.method == "GET":
        emps= Employee.objects.all()
        serializer = EmployeeSerializer(emps,many=True)
        return JsonResponse(serializer.data,safe=False)
    elif request.method == "POST":
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            print("valid")
            serializer.save()
            return Response(serializer.data,status=HTTP_201_CREATED)
        else:
            print("invalid",serializer.errors)
        return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)


@api_view(['GET','PUT','DELETE'])
@authentication_classes([JWTAuthentication])  
@permission_classes([IsAuthenticated])
@user_passes_test(lambda u: u.is_superuser)
def Employee_skills(request,eid):
    emp_skill_set= Employee_skill.objects.filter(employee=eid)
    emp=Employee.objects.get(id=eid)
    if request.method=="GET":
        serializer = EmployeeSkillSerializer(emp_skill_set,many=True)
        return JsonResponse(serializer.data,safe=False)
    elif request.method=="PUT":
        skill=Skill.objects.get(id=request.data['skill'])
        emp_skill ,created= Employee_skill.objects.get_or_create(employee=emp , skill=skill)
        serializer = EmployeeSkillSerializer(emp_skill,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=HTTP_200_OK)
        else:
            print("invalid",serializer.errors)
        return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        try:
            skill=Skill.objects.get(id=request.data['skill'])
            emp_skill= Employee_skill.objects.get(employee=emp , skill=skill,expertiseLevel=request.data['expertiseLevel'])
            emp_skill.delete()
        except :
            print("no data available for deleting ")
            return Response(status=HTTP_400_BAD_REQUEST)
        
        return Response(status=HTTP_204_NO_CONTENT)




# @api_view(["GET",'POST'])
# def Employee_skill_viewset(request):
#      if request.method == "GET":
#         emps= Employee_skill.objects.all()
#         serializer = EmployeeSkillSerializer(emps,many=True)
#         return JsonResponse(serializer.data,safe=False)
#      elif request.method == "POST":
#         serializer = EmployeeSkillSerializer(data=request.data)
#         if serializer.is_valid():
#             print("valid")
#             serializer.save()
#             return Response(serializer.data,status=HTTP_201_CREATED)
#         else:
#             print("invalid",serializer.errors)
#         return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)