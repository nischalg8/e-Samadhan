from django.urls import path
from .views import (
    CreateIssueView,
    MyIssuesView,
    MyIssueDetailView,
    AssignedIssuesView,
    UpdateIssueStatusView,
)

urlpatterns = [
    # ------------------------
    # Citizen APIs
    # ------------------------
    path('create/', CreateIssueView.as_view(), name='create_issue'),
    path('my/', MyIssuesView.as_view(), name='my_issues'),
    path('<int:pk>/', MyIssueDetailView.as_view(), name='my_issue_detail'),

    # ------------------------
    # Government APIs
    # ------------------------
    path('assigned/', AssignedIssuesView.as_view(), name='assigned_issues'),
    path('<int:pk>/status/', UpdateIssueStatusView.as_view(), name='update_issue_status'),
]
