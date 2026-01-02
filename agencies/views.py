from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Agency
from .serializers import AgencySerializer
from users.permissions import IsGovAdmin

# List all agencies (for citizens to select, or admin reference)
class AgencyListView(ListAPIView):
    queryset = Agency.objects.all()
    serializer_class = AgencySerializer
    permission_classes = [IsAuthenticated]  # Optional: everyone logged in

# Retrieve a single agency (optional)
class AgencyDetailView(RetrieveAPIView):
    queryset = Agency.objects.all()
    serializer_class = AgencySerializer
    permission_classes = [IsAuthenticated]  # Optional: everyone logged in

# Admin can create agency (if not using admin panel)
class AgencyCreateView(APIView):
    permission_classes = [IsAuthenticated, IsGovAdmin]

    def post(self, request):
        serializer = AgencySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
