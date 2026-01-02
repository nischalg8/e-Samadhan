from django.db import models
from users.models import User

class Agency(models.Model):
    name = models.CharField(max_length=100)  # KUKL, NEA, Municipality
    users = models.ManyToManyField(User, related_name='agencies', blank=True)   # which gov_admins belong to this agency

    def __str__(self):
        return self.name
