from rest_framework.permissions import BasePermission

class IsCitizen(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'citizen'

class IsGovAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'gov_admin'
