from rest_framework import serializers
from djoser.serializers import UserCreateSerializer

from Employee.models import Employee,Employee_skill
from Projects.models import Project,Project_skill

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id','username','first_name','last_name','email','date_joined','contact_address','designation','blood_group','phone_number','password']
    
    def create(self, data):
        emp = super().create(data)
        emp.set_password(data['password'])
        emp.save()
        return emp
    
    def update(self, instance, data):
        emp = super().update(instance, data)
        print(data['password'])
        try:
            emp.set_password(data['password'])
            emp.save()
            print(data['password'])
        except KeyError:
            pass
        return emp

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model=Project
        fields= ['id','title','description','starting_date','deadline','lead']

class EmployeeSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model=Employee_skill
        fields = ['employee', 'skill','expertiseLevel']

class ProjectSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model= Project_skill
        fields = ['project','skill','expertiseLevel']


