from django.urls import  include, path, re_path
from django.views.generic import TemplateView

from .viewset import testclass,testadmin
from .views import Employee_login,Login_view
from .Employee_view import Employees_Viewset,Employee_detail,Employee_skill_viewset,Employee_skill_detail
from .Project_view import project_viewset,Project_detail,Project_skill_detail
from .Verify_token import verify_token

urlpatterns=[
    path("test/",testclass),
    path("testa/",testadmin),
    path("emp_view/",Employees_Viewset,name="employees view"),
    path("emp/<int:eid>",Employee_detail,name="employee edit"),
    path("proj_view",project_viewset,name="projects view"),
    path("proj/<int:pid>",Project_detail,name="project detail"),
    path("emp_skill_view",Employee_skill_viewset,name="employee skill view"),
    path("emp/<int:eid>",Employee_skill_detail,name="employee skill detaol"),
    path("login/",Employee_login,name="login"),
    path("logintest",Login_view,name="login temp"),
    path("proj_skill/",Project_skill_detail,name="project skill detail"),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path("tokenv/",verify_token,name="verifu token")
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]