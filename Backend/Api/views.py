from rest_framework.decorators import api_view,authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .authentication import JWTAuthentication

from Employee.models import Employee


@api_view(['GET','POST'])
@authentication_classes([JWTAuthentication])  
@permission_classes([IsAuthenticated])
def verify_token(request):
    print(request,"-----------------")
    user = request.user  
    user_data = {
        'username': user.username,
        'email': user.email,
        'phone_number': user.phone_number,
        'is_superuser':user.is_superuser,
    }
    if request.method == "POST":
        print("post verify token ",request.data)
    return Response(user_data)


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
       
