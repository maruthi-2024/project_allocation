from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
   phone_number=models.CharField(("phone_number"), max_length=15)
   blood_group=models.CharField(("blood_group"), max_length=10)
   contact_address=models.CharField(("contact_address"), max_length=100)


