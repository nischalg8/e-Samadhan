from django.urls import path
from .views import (
    AgencyListView,
    AgencyLoginView,
    AgencyIssueListView,
    AgencyIssueDetailView,
    AgencyIssueUpdateView
)

urlpatterns = [
    path('', AgencyListView.as_view(), name='agency-list'),
    path('login/', AgencyLoginView.as_view(), name='agency-login'),
    path('issues/', AgencyIssueListView.as_view(), name='agency-issues'),
    path('issues/<int:issue_id>/', AgencyIssueDetailView.as_view(), name='agency-issue-detail'),
    path('issues/<int:issue_id>/update/', AgencyIssueUpdateView.as_view(), name='agency-issue-update'),
]
