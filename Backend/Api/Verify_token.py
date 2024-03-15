from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from .authentication import JWTAuthentication

@api_view(['GET'])
@authentication_classes([JWTAuthentication])  
@permission_classes([IsAuthenticated])
def verify_token(request):
    print(request,"-----------------")
    user = request.user  # This will give you the user associated with the token
    # You can now serialize the user object or return specific user information as needed
    user_data = {
        'username': user.username,
        'email': user.email,
        'phone_number': user.phone_number,
        'is_superuser':user.is_superuser,
    }
    return Response(user_data)