from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('citizen', 'Citizen'),
        ('gov_admin', 'Government Admin'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='citizen')
    citizen_id = models.CharField(max_length=20, blank=True, null=True)  # Simulated NID for MVP
    # CHANGED: store a reporter's date of birth so frontend can authenticate
    # using NID + DOB (as requested). Field is optional to preserve existing
    # users; migrations will add this column.
    date_of_birth = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
