from rest_framework.status import HTTP_200_OK,HTTP_204_NO_CONTENT,HTTP_400_BAD_REQUEST
from django.contrib.auth import authenticate, login,logout

from rest_framework.decorators import api_view
from rest_framework.response import Response


from .authentication import JWTAuthentication
from .serializers import LoginSerializer

from Employee.models import Employee



from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['POST', 'GET'])
def Login_view(request):
    pass
    print("login")
    if request.method == "GET":
        print("test passed")
        return Response({'message': 'hey login'})
    elif request.method == 'POST':
        # Your POST request handling logic
        username_or_email = request.data.get('username')
        password = request.data.get('password')

        emp = Employee.objects.filter(username=username_or_email).first()
        if emp is None:
            emp = Employee.objects.filter(phone_number=username_or_email).first()

        if emp is None or not emp.check_password(password):
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        # Generate the JWT token
        jwt_token = JWTAuthentication.create_jwt(emp)

        return Response({'token': jwt_token})

    return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)



# @api_view(['POST','GET'])
# def login_view(request):
#     print("login")
#     if request.method == "GET":
#         print("test passed")
#         return HttpResponse("<h1>hey  login </h1>")
#     if request.method == 'POST':
#         serializer = LoginSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)

#         username_or_email = serializer.validated_data.get('username')
#         password = serializer.validated_data.get('password')

#         emp = Employee.objects.filter(username=username_or_email).first()
#         if emp is None:
#             emp = Employee.objects.filter(phone_number=username_or_email).first()

#         if emp is None or not emp.check_password(password):
#             return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

#         # Generate the JWT token
#         jwt_token = JWTAuthentication.create_jwt(emp)

#         return Response({'token': jwt_token})

#     return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)



@api_view(["POST","GET","DELETE"])
def Employee_login(request):
    print("login")
    if request.method == "GET":
        print("test passed")
        return Response({'message': 'hey login'})
    elif request.method == 'POST':
        # Your POST request handling logic
        username_or_email = request.data.get('username')
        password = request.data.get('password')
        print(request.data)
        emp = Employee.objects.filter(username=username_or_email).first()
        print("me",emp)
        if emp is None:
            emp = Employee.objects.filter(phone_number=username_or_email).first()

        if emp is None or not emp.check_password(password):
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        # Generate the JWT token
        jwt_token = JWTAuthentication.create_jwt(emp)

        return Response({'token': jwt_token})

    return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

#    if request.method == "POST":
#         username = request.data['username']
#         password = request.data['password']
#         employee = authenticate(username=username, password=password)
#         if employee:
#             login(request, employee)
#             print("login success")
#             return Response({"eid":employee.id,"is_logged":True},status=HTTP_200_OK)
#         else:
#             print(request,"not log")    
#         return Response(employee.KeyError,status=HTTP_400_BAD_REQUEST)
#    elif request.method == "GET":
#        if request.user.is_authenticated:
#            return Response({"eid":request.user.id,"is_logged":True},status=HTTP_200_OK)
#        return  Response(status=HTTP_400_BAD_REQUEST)
#    elif request.method == "DELETE":
#        print(request.user)
#        if request.user.is_authenticated:
#            logout(request)
#            return Response({"eid":None,"is_logged":False},status=HTTP_204_NO_CONTENT)
#        return  Response(status=HTTP_400_BAD_REQUEST)
       
