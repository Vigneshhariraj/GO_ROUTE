from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import CityBus
from .serializers import CityBusSerializer
from rest_framework.views import APIView


@api_view(['GET'])
def get_navigation_info(request):
    data = {
        "message": "Welcome to GoRoute India! Your navigation assistant is ready.",
        "suggestions": [
            "Find the nearest city bus",
            "Check indoor navigation maps",
            "Book tickets for long distance buses"
        ]
    }
    return Response(data)

class CityBusSearchAPIView(APIView):
    def get(self, request):
        from_location = request.query_params.get('from', '').strip().lower()
        to_location = request.query_params.get('to', '').strip().lower()

        if not from_location or not to_location:
            return Response({'error': 'Missing query parameters'}, status=status.HTTP_400_BAD_REQUEST)

        # 🔍 Debug: Show the search input
        print("🔍 User search:", from_location, "→", to_location)

        # 🔍 Debug: List what’s in DB (using correct fields)
        print("🚌 Available buses in DB:")
        for bus in CityBus.objects.all():
            print("-", bus.from_location.lower(), "→", bus.to_location.lower())

        # ✅ Perform case-insensitive search on correct fields
        buses = CityBus.objects.filter(
            from_location__icontains=from_location,
            to_location__icontains=to_location
        )

        serializer = CityBusSerializer(buses, many=True)
        return Response(serializer.data)
