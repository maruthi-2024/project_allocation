from datetime import datetime, timedelta

import jwt
import Backend.settings as settings
from rest_framework import authentication
from rest_framework.exceptions import AuthenticationFailed


from Employee.models import Employee

class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        jwt_token = request.META.get('HTTP_AUTHORIZATION')
        if jwt_token is None:
            return None

        jwt_token = JWTAuthentication.get_the_token_from_header(jwt_token) 

        try:
            payload = jwt.decode(jwt_token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token expired')
        except jwt.InvalidTokenError: 
            raise AuthenticationFailed('Invalid token')
        print(payload,"payload")
        username_or_email = payload.get('employee_identifier')
        if username_or_email is None:
            raise AuthenticationFailed('Employee identifier not found in JWT')

        emp = Employee.objects.filter(username=username_or_email).first()
        if emp is None:
            emp = Employee.objects.filter(email=username_or_email).first()
            if emp is None:
                raise AuthenticationFailed('User not found')
        return emp, payload

    def authenticate_header(self, request):
        return 'Bearer'

    @classmethod
    def create_jwt(cls, emp):
        payload = {
            'employee_identifier': emp.username,
            'exp': int((datetime.now() + timedelta(hours=settings.JWT_CONF['TOKEN_LIFETIME_HOURS'])).timestamp()),
            'iat': datetime.now().timestamp(),
            'username': emp.username,
            'email': emp.email,
            'is_superuser':emp.is_superuser
        }

        # Encode the JWT with your secret key
        jwt_token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

        return jwt_token

    @classmethod
    def get_the_token_from_header(cls, token):
        token = token.replace('Bearer', '').replace(' ', '') 
        return token