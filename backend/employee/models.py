from django.db import models
from django.contrib.auth.models import AbstractUser

class Designation(models.Model):
    designation = models.CharField(("designation"), default="developer", max_length=20, unique=True)

    def __str__(self):
        return self.designation

class User(AbstractUser):
    phone_number = models.CharField(("phone_number"), max_length=15)
    blood_group = models.CharField(("blood_group"), max_length=10)
    contact_address = models.CharField(("contact_address"), max_length=100)
    
    @staticmethod
    def get_default_designation():
        default_designation, _ = Designation.objects.get_or_create(designation="developer")
        #return created obj and boolean represents created or not ,so we negleted boolean 
        return default_designation.pk
    
    default_designation = get_default_designation()

    designation = models.ForeignKey(
        Designation, verbose_name=("designation"),
        default=default_designation, on_delete=models.SET_NULL,null =True
    )

    def __str__(self):
        return self.username
