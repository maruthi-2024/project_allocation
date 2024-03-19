from rest_framework.decorators import api_view,authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from Api.serializers import EmployeeSerializer, EmployeeSkillSerializer

from .authentication import JWTAuthentication

from Employee.models import Designation, Employee, Employee_skill


def getSkill(request):
    emp_skills={}
    emp_skill_set= Employee_skill.objects.filter(employee=request.user.id)
    skill_serializer = EmployeeSkillSerializer(emp_skill_set,many=True)
    emp_skills['skills']=skill_serializer.data


@api_view(['GET','POST'])
@authentication_classes([JWTAuthentication])  
@permission_classes([IsAuthenticated])
def verify_token(request):
    print("--------------------",request.user)
    employee=request.user
    designation_name = employee.designation.designation if employee.designation else None
    skills_info = []
    employee_skills = Employee_skill.objects.filter(employee=employee)
    for emp_skill in employee_skills:
        skill_name = emp_skill.skill.skill if emp_skill.skill else None
        expertise_level = emp_skill.get_expertiseLevel_display()  
        skills_info.append({'skill_name': skill_name, 'expertise_level': expertise_level,'id':emp_skill.id})
        
    serializer=EmployeeSerializer(employee)
    employee_details=serializer.data
    employee_details['designation'] = designation_name
    employee_details['skills'] = skills_info
    employee_details['gender']=employee.get_gender_display()
    print(employee_details)
    return Response(employee_details)

@api_view(["POST","GET","DELETE"])
def Employee_login(request):
    if request.method == "GET":
        print("test passed")
        return Response({'message': 'hey login'})
    elif request.method == 'POST':
        username_or_email = request.data.get('username')
        password = request.data.get('password')
        print(request.data,"employee login view")
        emp = Employee.objects.filter(username=username_or_email).first()
        if emp is None:
            emp = Employee.objects.filter(email=username_or_email).first()
        if emp is None or not emp.check_password(password):
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        print(emp.username)
        jwt_token = JWTAuthentication.create_jwt(emp)

        return Response({'token': jwt_token})

    return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
       
