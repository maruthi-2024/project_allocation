from django.urls import  include, path, re_path
from django.views.generic import TemplateView

   
from .views import Login
from .User_view import User_projects,User_skills,User_details
from .Employee_view import Employees_View,Employee_skills
from .Project_view import Project_viewset,Project_detail,Project_skill_detail,Employees_in_Project
from .Skills_view import Skill_viewset

urlpatterns=[
    #for user login
    path("login/",Login,name="login"),

    #for getting user details and creating,deleting  employee
    path("user/",User_details,name="employee"),

    #to get user projects
    path("user_projs/",User_projects,name="employee project"),

    #to get user skills
    path("user_skills/",User_skills,name="employee skill detail"),

    #to get all the empolyees with detail
    path("emps_view/",Employees_View,name="employees view"),

    #to get employee skills 
    path("emp_skills/<int:eid>",Employee_skills,name="employee skill view"),
    
    #get req skills of the proj
    path("proj_skills/<int:pid>",Project_skill_detail,name="project skill detail"),

    #get emplyees present in the project
    path("emps_in_proj/<int:pid>",Employees_in_Project,name="Employees in project"),

    #to create project
    path("proj_view/",Project_viewset,name="projects view"),

    #to get list of skills
    path("skills/",Skill_viewset,name="get skill set"),

    path("proj/<int:pid>",Project_detail,name="project detail"),
    

    
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]