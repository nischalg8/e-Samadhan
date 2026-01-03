from django.urls import path
from .views import CitizenIssueCreateView, AgencyIssueListView, AgencyIssueUpdateView,CitizenIssueListView

urlpatterns = [
    path('', CitizenIssueCreateView.as_view(), name='citizen-issue-create'),  # POST /api/issues/
    path('agency/list/', AgencyIssueListView.as_view(), name='agency-issue-list'),
    path('list/', CitizenIssueListView.as_view(), name='citizen-issue-list'),
    path('agency/<int:issue_id>/update/', AgencyIssueUpdateView.as_view(), name='agency-issue-update'),
]
