from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .models import User

class LoginView(APIView):
    authentication_classes = []  # allow unauthenticated access
    permission_classes = []

    def post(self, request):
        nid = request.data.get('nid')
        dob = request.data.get('dateOfBirth')

        if not nid or not dob:
            return Response(
                {"error": "NID and dateOfBirth are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Strict authentication: only existing users
        try:
            user = User.objects.get(citizen_id=nid, date_of_birth=dob)
        except User.DoesNotExist:
            return Response(
                {"error": "Invalid NID or Date of Birth"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Successful login
        return Response({
            'id': user.id,
            'username': user.username,
            'role': user.role,
            'citizen_id': user.citizen_id,
            'date_of_birth': str(user.date_of_birth),
            'message': 'Login successful',
        })


class AgencyLoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        agency_id = request.data.get('agencyId')
        password = request.data.get('password')

        if not agency_id or not password:
            return Response({"error": "agencyId and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate using Django's authentication backend (username + password)
        user = authenticate(request, username=agency_id, password=password)
        if user is None or getattr(user, 'role', '') != 'gov_admin':
            return Response({"error": "Invalid agency credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({
            'id': user.id,
            'username': user.username,
            'role': user.role,
            'message': 'Agency login successful',
        })
