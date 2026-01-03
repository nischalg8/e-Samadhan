from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import User
from agencies.models import Agency

# -------------------------------
# Citizen Login
# -------------------------------
class CitizenLoginView(APIView):
    permission_classes = []  # no auth needed

    def post(self, request):
        nid = request.data.get("nid")
        dob = request.data.get("dob")  # yyyy-mm-dd
        phone = request.data.get("phone")  # optional, OTP

        try:
            user = User.objects.get(nid=nid, dob=dob, role='citizen')
        except User.DoesNotExist:
            return Response({"error": "Invalid NID or DOB"}, status=status.HTTP_401_UNAUTHORIZED)

        # Optional: verify phone OTP here

        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "id": user.id,
            "username": user.username,
            "role": user.role,
            "token": token.key
        })


# -------------------------------
# Agency Login
# -------------------------------
class AgencyLoginView(APIView):
    permission_classes = []

    def post(self, request):
        agency_name = request.data.get("agency_name")  # ADD THIS
        staff_id = request.data.get("staff_id")        # ADD THIS
        username = request.data.get("username")
        password = request.data.get("password")

        # Validate all fields present
        if not all([agency_name, staff_id, username, password]):
            return Response(
                {"error": "All fields are required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Find agency by name
            agency = Agency.objects.get(name=agency_name)
            
            # Find user matching all criteria
            user = User.objects.get(
                username=username,
                staff_id=staff_id,
                agency=agency,
                role='gov_admin'
            )
        except (Agency.DoesNotExist, User.DoesNotExist):
            return Response(
                {"error": "Invalid credentials"}, 
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Authenticate password
        user_auth = authenticate(username=user.username, password=password)
        if user_auth is None:
            return Response(
                {"error": "Invalid password"}, 
                status=status.HTTP_401_UNAUTHORIZED
            )

        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "id": user.id,
            "username": user.username,
            "role": user.role,
            "agency": user.agency.name,
            "staff_id": user.staff_id,
            "token": token.key
        })
    
class AgencyListView(APIView):
    permission_classes = []  # Allow unauthenticated access for login page

    def get(self, request):
        agencies = Agency.objects.all().values('id', 'name')
        return Response(list(agencies))
# -------------------------------
# Agency Ranking
# -------------------------------
class AgencyRankingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        agencies = Agency.objects.all()
        data = []
        for agency in agencies:
            total_points = sum(u.points for u in User.objects.filter(agency=agency))
            data.append({"agency": agency.name, "points": total_points})
        data.sort(key=lambda x: x['points'], reverse=True)
        return Response(data)


# -------------------------------
# Citizen Ranking
# -------------------------------
class CitizenRankingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        citizens = User.objects.filter(role='citizen').order_by('-points')
        data = [{"citizen": u.username, "points": u.points} for u in citizens]
        return Response(data)
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to eSamadhan Backend!")


# -------------------------------
# My Profile (Citizen / Agency)
# -------------------------------
class MyProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        data = {
            "id": user.id,
            "username": user.username,
            "role": user.role,
            "points": user.points,
        }

        if user.role == "citizen":
            data["nid"] = user.nid

        if user.role == "gov_admin":
            data["agency"] = user.agency.name if user.agency else None
            data["staff_id"] = user.staff_id

        return Response(data)