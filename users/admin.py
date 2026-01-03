from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from .forms import CustomUserCreationForm, CustomUserChangeForm


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User

    list_display = ('username', 'role', 'email', 'agency')
    list_filter = ('role', 'agency', 'is_staff', 'is_active')
    search_fields = ('username', 'email', 'nid')  # removed citizen_id

    fieldsets = (
        (None, {'fields': ('username', 'email', 'password', 'role', 'agency', 'nid', 'dob', 'phone', 'staff_id')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'groups', 'user_permissions')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'role', 'agency', 'nid', 'dob', 'phone', 'staff_id')}
         ),
    )
    def get_fieldsets(self, request, obj=None):
        """Edit user: show fields based on role"""
        if obj:
            if obj.role == 'gov_admin':
                return (
                    (None, {'fields': ('username', 'email', 'password', 'role', 'agency', 'staff_id')}),
                    ('Permissions', {'fields': ('is_staff', 'is_active', 'groups', 'user_permissions')}),
                )
            elif obj.role == 'citizen':
                return (
                    (None, {'fields': ('username', 'email', 'password', 'role', 'nid', 'dob', 'phone')}),
                    ('Permissions', {'fields': ('is_staff', 'is_active', 'groups', 'user_permissions')}),
                )
        return super().get_fieldsets(request, obj)

    class Media:
        """Add JS to dynamically show/hide fields on Add page"""
        js = ('users/js/user_admin.js',)
