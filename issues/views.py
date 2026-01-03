from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import PermissionDenied
from rest_framework.authtoken.models import Token
from .models import Issue
from .serializers import IssueSerializer
from agencies.models import Agency

from users.models import User


# -------------------- CITIZEN VIEWS --------------------

class CitizenIssueCreateView(generics.CreateAPIView):
    serializer_class = IssueSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        if user.role != 'citizen':
            raise PermissionDenied("Only citizens can report issues")

        # Save the issue with reporter and user-selected category first
        issue = serializer.save(reporter=user)

        # -------------------- Auto-assign agency --------------------
        if issue.category and not issue.assigned_agency:
            if issue.category == 'water':
                issue.assigned_agency = Agency.objects.filter(agency_type='KUKL').first()
            elif issue.category == 'electricity':
                issue.assigned_agency = Agency.objects.filter(agency_type='NEA').first()
            elif issue.category in ['road', 'waste']:
                issue.assigned_agency = Agency.objects.filter(agency_type='MUNICIPALITY').first()

        issue.save()

# Optional: GET endpoint to fetch all issues of current citizen
class CitizenIssueListView(generics.ListAPIView):
    serializer_class = IssueSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role != 'citizen':
            return Issue.objects.none()
        return Issue.objects.filter(reporter=user).order_by('-created_at')

# -------------------- AGENCY VIEWS --------------------

class AgencyIssueListView(generics.ListAPIView):
    serializer_class = IssueSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if getattr(user, "role", None) != "gov_admin":
            return Issue.objects.none()
        return Issue.objects.filter(assigned_agency=user.agency).order_by('-created_at')


class AgencyIssueUpdateView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, issue_id):
        user = request.user
        if getattr(user, "role", None) != "gov_admin":
            return Response({"error": "Unauthorized"}, status=403)

        try:
            issue = Issue.objects.get(id=issue_id, assigned_agency=user.agency)
        except Issue.DoesNotExist:
            return Response({"error": "Issue not found"}, status=404)

        new_status = request.data.get("status")
        if new_status not in [s[0] for s in Issue.STATUS_CHOICES]:
            return Response({"error": "Invalid status"}, status=400)

        issue.status = new_status
        issue.save()

        # Update points only if newly resolved
        if issue.status != "resolved" and new_status == "resolved":
            # Agency points
            if user.agency:
                for u in User.objects.filter(agency=user.agency):
                    u.points += 10
                    u.save()
            # Citizen points
            reporter = issue.reporter
            reporter.points += 1900  # Updated to 1900 as requested
            reporter.save()

        return Response({
            "message": "Status updated",
            "issue_id": issue.id,
            "new_status": issue.status
        })
# At the top, add this import:


# Then update CitizenLoginView (around line 15):
class CitizenLoginView(APIView):
    permission_classes = []

    def post(self, request):
        nid = request.data.get("nid")
        dob = request.data.get("dob")

        try:
            user = User.objects.get(nid=nid, dob=dob, role='citizen')
        except User.DoesNotExist:
            return Response({"error": "Invalid NID or DOB"}, status=status.HTTP_401_UNAUTHORIZED)

        # ADD THESE TWO LINES:
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            "id": user.id,
            "username": user.username,
            "role": user.role,
            "nid": user.nid,
            "dob": str(user.dob),
            "token": token.key  # ADD THIS LINE
        })