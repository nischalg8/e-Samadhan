from django.contrib.auth.models import AbstractUser
from django.db import models
from agencies.models import Agency

class User(AbstractUser):
    ROLE_CHOICES = (
        ('citizen', 'Citizen'),
        ('gov_admin', 'Government Admin'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    # Citizen fields
    nid = models.CharField(max_length=20, blank=True, null=True, unique=True)
    dob = models.DateField(blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    

    # Agency fields
    staff_id = models.CharField(max_length=50, blank=True, null=True, unique=True)
    agency = models.ForeignKey(Agency, on_delete=models.SET_NULL, null=True, blank=True)
    
    points = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.username} ({self.role})"
