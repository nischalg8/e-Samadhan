from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import User

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = '__all__'

    def clean(self):
        cleaned_data = super().clean()
        role = cleaned_data.get('role')

        if role == 'citizen':
            required_fields = ['nid', 'dob']
            for field in required_fields:
                if not cleaned_data.get(field):
                    self.add_error(field, f"{field} is required for citizens")
            cleaned_data['staff_id'] = None
        elif role == 'gov_admin':
            if not cleaned_data.get('agency'):
                self.add_error('agency', "Agency is required for government admins")
            if not cleaned_data.get('staff_id'):
                self.add_error('staff_id', "Staff ID is required for government admins")
            for field in ['nid', 'dob', 'phone']:
                cleaned_data[field] = None
        return cleaned_data

    def save(self, commit=True):
        user = super().save(commit=False)
        password = self.cleaned_data.get("password1")
        if password:
            user.set_password(password)
        if commit:
            user.save()
        return user


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = '__all__'

    def save(self, commit=True):
        user = super().save(commit=False)
        # Hash password if manually changed
        password = self.cleaned_data.get("password")
        if password and not password.startswith('pbkdf2_'):
            user.set_password(password)
        if commit:
            user.save()
        return user
