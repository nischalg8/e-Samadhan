# imports
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from .models import Issue
from .serializers import IssueSerializer
from users.permissions import IsCitizen, IsGovAdmin
from rest_framework.decorators import api_view
# ------------------------
# Citizen APIs
# ------------------------

class CreateIssueView(APIView):
    # CHANGED: allow unauthenticated submissions for now by accepting a
    # `reporter_citizen_id` in the payload. If the request is authenticated
    # we still enforce the citizen role. This makes it easy for the React
    # frontend to submit issues without a full auth/token flow while the
    # user model and auth are being finalized.
    permission_classes = []

    def post(self, request):
        data = request.data.copy()

        # Determine reporter: prefer authenticated user if present
        reporter = None
        if request.user and request.user.is_authenticated:
            # enforce role
            if getattr(request.user, 'role', None) != 'citizen':
                return Response({'error': 'Only citizens can create issues'}, status=status.HTTP_403_FORBIDDEN)
            reporter = request.user
        else:
            # allow reporter_citizen_id to identify/create a reporter user
            citizen_id = data.get('reporter_citizen_id') or data.get('citizen_id')
            if not citizen_id:
                return Response({'error': 'reporter_citizen_id is required for anonymous submissions'}, status=status.HTTP_400_BAD_REQUEST)

            # Create or get a lightweight citizen user record
            from users.models import User as AppUser
            user, created = AppUser.objects.get_or_create(
                citizen_id=citizen_id,
                defaults={
                    'username': f'citizen_{citizen_id}',
                    'role': 'citizen',
                }
            )
            reporter = user

        # Remove helper field so serializer doesn't choke
        if 'reporter_citizen_id' in data:
            data.pop('reporter_citizen_id')

        serializer = IssueSerializer(data=data)
        if serializer.is_valid():
            # Pass the reporter explicitly to serializer.save() so the
            # ModelSerializer does not rely on client-supplied reporter id.
            issue = serializer.save(reporter=reporter)

            # TODO: AI routing function to assign assigned_agency
            # assigned_admin = run_gemini_routing(issue)
            # issue.assigned_to = assigned_admin
            # issue.save()

            return Response(IssueSerializer(issue).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MyIssuesView(ListAPIView):
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated, IsCitizen]

    def get_queryset(self):
        return Issue.objects.filter(reporter=self.request.user)

class MyIssueDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated, IsCitizen]

    def get_queryset(self):
        return Issue.objects.filter(reporter=self.request.user)

    def perform_update(self, serializer):
        instance = serializer.instance
        if instance.status != 'submitted':
            raise serializers.ValidationError("Cannot modify issue after assignment or progress")
        serializer.save()

# ------------------------
# Government APIs
# ------------------------

class AssignedIssuesView(ListAPIView):
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated, IsGovAdmin]

    def get_queryset(self):
        return Issue.objects.filter(assigned_agency__users=self.request.user)  # or related logic

class UpdateIssueStatusView(APIView):
    permission_classes = [IsAuthenticated, IsGovAdmin]

    def patch(self, request, pk):
        try:
            issue = Issue.objects.get(pk=pk, assigned_agency__users=request.user)
        except Issue.DoesNotExist:
            return Response({"error": "Issue not found or not assigned to you"}, status=status.HTTP_404_NOT_FOUND)

        status_val = request.data.get('status')
        if status_val not in ['in_progress', 'resolved']:
            return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)

        issue.status = status_val
        issue.save()
        return Response({"message": f"Issue status updated to {status_val}"})
