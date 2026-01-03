from rest_framework import serializers
from .models import Issue
from agencies.models import Agency

class IssueSerializer(serializers.ModelSerializer):
    reporter = serializers.ReadOnlyField(source='reporter.id')
    assigned_agency_name = serializers.ReadOnlyField(source='assigned_agency.name')
    photo = serializers.ImageField(use_url=True, required=False)
    class Meta:
        model = Issue
        fields = [
            "id",
            "reporter",
            "assigned_agency",
            "assigned_agency_name",
            "description",
            "category",
            "priority",
            "status",
            "latitude",
            "longitude",
            "photo",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["status", "assigned_agency", "created_at", "updated_at"]

    def validate_priority(self, value):
        if value not in ['low', 'medium', 'high']:
            raise serializers.ValidationError("Priority must be low, medium, or high")
        return value

    def validate_latitude(self, value):
        if not (-90 <= value <= 90):
            raise serializers.ValidationError("Latitude must be between -90 and 90")
        return value

    def validate_longitude(self, value):
        if not (-180 <= value <= 180):
            raise serializers.ValidationError("Longitude must be between -180 and 180")
        return value
