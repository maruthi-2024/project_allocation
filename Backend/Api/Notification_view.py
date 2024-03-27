from django.http import HttpResponse,JsonResponse,response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.status import HTTP_201_CREATED,HTTP_400_BAD_REQUEST,HTTP_200_OK,HTTP_204_NO_CONTENT
from rest_framework.response import Response


from Employee.models import Employee
from Notification.models import Notification
from .serializers import NotificationSerializer
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from Api.authentication import JWTAuthentication

@api_view(["GET",'POST'])
@authentication_classes([JWTAuthentication])  
@permission_classes([IsAuthenticated])
def Get_notifications(request):
    if request.method == "GET":
        notifications = Notification.objects.filter(employee =request.user)
        print(notifications)
        serializer = NotificationSerializer(notifications,many=True)
        return Response(serializer.data,status = HTTP_200_OK)
    return Response(status=HTTP_400_BAD_REQUEST)
