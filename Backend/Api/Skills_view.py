from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_201_CREATED,HTTP_400_BAD_REQUEST,HTTP_200_OK,HTTP_204_NO_CONTENT
from rest_framework.response import Response


from .authentication import JWTAuthentication
from Skills.models import Skill
from .serializers import SkillSerializer

@api_view(["GET"])
# @authentication_classes([JWTAuthentication])  
# @permission_classes([IsAuthenticated])
def Skill_viewset(request):
    if request.method == "GET":
        skill_set=Skill.objects.all()
        serializer = SkillSerializer(skill_set,many=True)
        return Response(serializer.data,status=HTTP_200_OK)
    return Response(status=HTTP_400_BAD_REQUEST)
