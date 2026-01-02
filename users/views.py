from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class LoginView(APIView):
    authentication_classes = []  # allow unauthenticated access
    permission_classes = []

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"error": "Username and password required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(username=username, password=password)

        if user is None:
            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        return Response({
            "id": user.id,
            "username": user.username,
            "role": user.role,
            "citizen_id": user.citizen_id,
            "message": "Login successful (simulated auth)"
        })
# Note: In a real application, you would return a token or session info here.