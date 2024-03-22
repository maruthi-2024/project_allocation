from django.http import HttpResponse,JsonResponse,response
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_201_CREATED,HTTP_400_BAD_REQUEST,HTTP_200_OK,HTTP_204_NO_CONTENT
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.auth.decorators import user_passes_test,login_required
from django.contrib.auth import authenticate, login,logout


from .authentication import JWTAuthentication
from Employee.models import Employee,Employee_skill
from Projects.models import Project,Project_skill,Project_Employee
from Skills.models import Skill
from .serializers import EmployeeSerializer,ProjectSerializer,EmployeeSkillSerializer,ProjectSkillSerializer


@api_view(["GET",'POST',"PUT"])
@authentication_classes([JWTAuthentication])  
@permission_classes([IsAuthenticated])
def Project_skill_detail(request,pid):
    proj=Project.objects.get(id=pid)
    proj_skill_set= Project_skill.objects.filter(project=proj)
    if request.method=="GET":
        serializer = ProjectSkillSerializer(proj_skill_set,many=True)
        return JsonResponse(serializer.data,safe=False)
    elif request.method=="PUT" or request.method=="POST":
        print(request.data,"-------------------")
        skill=Skill.objects.get(id =request.data['skill'])
        proj_skill ,created= Project_skill.objects.get_or_create(project=proj ,skill=skill)
        print(vars(proj_skill),created)
        serializer = ProjectSkillSerializer(proj_skill,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=HTTP_200_OK)
        else:
            print("invalid",serializer.errors,request.data)
        return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        try:
            proj_skill= Project_skill.objects.get(project=request.data['project'] , skill=request.data['skill'],expertiseLevel=request.data['expertiseLevel'])
            proj_skill.delete()
        except :
            print("no data available for deleting ")
            return Response(status=HTTP_400_BAD_REQUEST)
        
        return Response(status=HTTP_204_NO_CONTENT)


@api_view(["GET"])
@authentication_classes([JWTAuthentication])  
@permission_classes([IsAuthenticated])
def Employees_in_Project(request,pid):
    req_project = Project.objects.get(id=pid)
    if request.method == "GET":
        employee_set=Project_Employee.objects.filter(project=req_project).values('employee')
        employee_ids = [item['employee'] for item in employee_set.values('employee')]
        emps = Employee.objects.filter(id__in=employee_ids)
        serializer = EmployeeSerializer(emps,many=True)
        return Response(serializer.data,status=HTTP_200_OK)
    return Response(status=HTTP_400_BAD_REQUEST)



@api_view(["GET",'POST'])
@authentication_classes([JWTAuthentication])  
@permission_classes([IsAuthenticated])
@user_passes_test(lambda u: u.is_superuser)
def Project_viewset(request):
    if request.method=="GET":
        projs=Project.objects.all()
        serializer=ProjectSerializer(projs,many=True)
        return JsonResponse(serializer.data,safe=False)
    elif request.method=="POST":
        if(request.data["lead"] == ""):
            request.data["lead"]=request.user.id
        serializer=ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            try:
                print(serializer.data)
                project=Project.objects.get(id= serializer.data["id"])
                employee = Employee.objects.get(id = serializer.data["lead"])
                Project_Employee.objects.create(project=project,employee = employee)
            except Exception as e:
                print("project employee creation error",e)
                return Response(status=HTTP_400_BAD_REQUEST)
            return Response(serializer.data,status=HTTP_201_CREATED)
        else:
            print(serializer.errors)
        return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)
    



@api_view(['GET','PUT','DELETE'])
def Project_detail(request,pid):
    proj= Project.objects.get(id=pid)
    if request.method=="GET":
        serializer = ProjectSerializer(proj)
        return JsonResponse(serializer.data,safe=False)
    elif request.method=="PUT":
        serializer = ProjectSerializer(proj,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=HTTP_200_OK)
        else:
            print("invalid",serializer.errors)
        return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        proj.delete()
        return Response(status=HTTP_204_NO_CONTENT)

