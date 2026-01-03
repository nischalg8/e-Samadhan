from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from users.models import User
from agencies.models import Agency
from issues.models import Issue

# -------------------------------
# Agency Login
# -------------------------------
class AgencyLoginView(APIView):
    permission_classes = []

    def post(self, request):
        agency_name = request.data.get("agency_name")
        staff_id = request.data.get("staff_id")
        username = request.data.get("username")
        password = request.data.get("password")

        if not all([agency_name, staff_id, username, password]):
            return Response({"error": "All fields are required"}, status=400)

        try:
            agency = Agency.objects.get(name=agency_name)
            user = User.objects.get(username=username, staff_id=staff_id, agency=agency, role='gov_admin')
        except (Agency.DoesNotExist, User.DoesNotExist):
            return Response({"error": "Invalid credentials"}, status=401)

        user_auth = authenticate(username=user.username, password=password)
        if not user_auth:
            return Response({"error": "Invalid password"}, status=401)

        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "id": user.id,
            "username": user.username,
            "role": user.role,
            "agency": user.agency.name,
            "staff_id": user.staff_id,
            "token": token.key
        })


# -------------------------------
# List of Agencies (for dropdown)
# -------------------------------
class AgencyListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        agencies = Agency.objects.all()
        return Response([
            {"id": a.id, "name": a.name, "type": a.agency_type} for a in agencies
        ])


# -------------------------------
# List Issues assigned to agency
# -------------------------------
class AgencyIssueListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role != 'gov_admin':
            return Response({"error": "Unauthorized"}, status=403)

        if not user.agency:
            return Response({"error": "User has no agency assigned"}, status=400)

        issues = Issue.objects.filter(assigned_agency=user.agency).order_by('-created_at')
        serialized = [
            {
                "id": i.id,
                "description": i.description,
                "priority": i.priority,
                "category": i.category,
                "latitude": i.latitude,
                "longitude": i.longitude,
                "photo": request.build_absolute_uri(i.photo.url) if i.photo else None, #views.py line:82,115 
                "status": i.status,
                "reporter": i.reporter.username,
                "created_at": i.created_at,
                "updated_at": i.updated_at
            } for i in issues
        ]
        return Response(serialized)


# -------------------------------
# View single issue details
# -------------------------------
class AgencyIssueDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, issue_id):
        user = request.user
        if user.role != 'gov_admin':
            return Response({"error": "Unauthorized"}, status=403)

        try:
            issue = Issue.objects.get(id=issue_id, assigned_agency=user.agency)
        except Issue.DoesNotExist:
            return Response({"error": "Issue not found"}, status=404)

        data = {
            "id": issue.id,
            "description": issue.description,
            "priority": issue.priority,
            "category": issue.category,
            "latitude": issue.latitude,
            "longitude": issue.longitude,
            "photo": issue.photo.url if issue.photo else None,
            "status": issue.status,
            "reporter": issue.reporter.username,
            "created_at": issue.created_at,
            "updated_at": issue.updated_at
        }
        return Response(data)


# -------------------------------
# Update Issue Status
# -------------------------------
class AgencyIssueUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, issue_id):
        user = request.user
        if user.role != 'gov_admin':
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

        # Update points
        if new_status == 'resolved':
            # Agency points
            for u in User.objects.filter(agency=user.agency):
                u.points += 10
                u.save()
            # Citizen points
            issue.reporter.points += 5
            issue.reporter.save()

        return Response({
            "message": "Status updated",
            "issue_id": issue.id,
            "new_status": issue.status
        })
