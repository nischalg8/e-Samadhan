from django.contrib import admin
from .models import Agency

@admin.register(Agency)
class AgencyAdmin(admin.ModelAdmin):
    list_display = ('name', 'agency_type')
    list_filter = ('agency_type',)
    search_fields = ('name',)
