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
    permission_classes = [IsAuthenticated, IsCitizen]

    def post(self, request):
        data = request.data.copy()
        data['reporter'] = request.user.id
        serializer = IssueSerializer(data=data)
        if serializer.is_valid():
            issue = serializer.save()
            
            # TODO: AI routing function to assign assigned_agency
            issue = serializer.save()
            #AI routing
            #assigned_admin = run_gemini_routing(issue)
            #issue.assigned_to = assigned_admin
            #issue.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
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
