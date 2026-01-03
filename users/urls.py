
from django.urls import path
from .views import CitizenLoginView, AgencyLoginView, AgencyListView, MyProfileView  # ADD AgencyListView

urlpatterns = [
    path('login/', CitizenLoginView.as_view(), name='citizen-login'),
    path('agency-login/', AgencyLoginView.as_view(), name='agency-login'),
    path('agencies/', AgencyListView.as_view(), name='agency-list'),  # ADD THIS
    path('me/', MyProfileView.as_view(), name='my-profile'),

]