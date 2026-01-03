from django.contrib import admin
from .models import Issue

@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ('id', 'reporter', 'assigned_agency', 'category', 'priority', 'status', 'created_at', 'updated_at')
    list_filter = ('status', 'category', 'priority', 'assigned_agency')
    search_fields = ('reporter__username', 'description')
    ordering = ('-created_at',)
