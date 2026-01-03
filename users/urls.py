from django.urls import path
from .views import LoginView, AgencyLoginView

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("agency-login/", AgencyLoginView.as_view(), name="agency-login"),
]
