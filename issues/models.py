from django.db import models
from users.models import User
from agencies.models import Agency

class Issue(models.Model):
    CATEGORY_CHOICES = (
        ('water', 'Water'),
        ('electricity', 'Electricity'),
        ('road', 'Road'),
        ('waste', 'Waste'),
    )

    PRIORITY_CHOICES = (
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    )

    STATUS_CHOICES = (
        ('submitted', 'Submitted'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
    )

    reporter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reported_issues')
    assigned_agency = models.ForeignKey(Agency, on_delete=models.SET_NULL, null=True, blank=True, related_name='issues')
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='submitted')
    latitude = models.FloatField()
    longitude = models.FloatField()
    photo = models.ImageField(upload_to='issue_photos/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Issue #{self.id} ({self.category}) - {self.status}"
