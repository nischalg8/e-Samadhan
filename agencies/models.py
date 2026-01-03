
from django.db import models

class Agency(models.Model):
    AGENCY_TYPES = (
        ('KUKL', 'KUKL'),
        ('NEA', 'NEA'),
        ('MUNICIPALITY', 'Municipality'),
        
    )

    name = models.CharField(max_length=100)
    agency_type = models.CharField(max_length=30, choices=AGENCY_TYPES)

    def __str__(self):
        return self.name
