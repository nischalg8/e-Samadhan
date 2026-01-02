from django.urls import path
from .views import AgencyListView, AgencyDetailView, AgencyCreateView

urlpatterns = [
    path('', AgencyListView.as_view(), name='agency_list'),
    path('<int:pk>/', AgencyDetailView.as_view(), name='agency_detail'),
    path('create/', AgencyCreateView.as_view(), name='agency_create'),
]
