from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST
from django.views.decorators.csrf import csrf_exempt
from .models import BusRoute
import json

# 🔍 Search Buses
@require_GET
def search_buses(request):
    from_city = request.GET.get('from')
    to_city = request.GET.get('to')
    women_only = request.GET.get('women_only')
    bus_type = request.GET.get('bus_type')

    buses = BusRoute.objects.all()

    if from_city:
        buses = buses.filter(origin__iexact=from_city)
    if to_city:
        buses = buses.filter(destination__iexact=to_city)
    if women_only == 'true':
        buses = buses.filter(women_only=True)
    if bus_type:
        buses = buses.filter(bus_type__icontains=bus_type)

    print("Buses After Full Filter:", buses.count())

    return JsonResponse(list(buses.values()), safe=False)

# 🚌 Get Bus Seats
@require_GET
def get_bus_seats(request, bus_id):
    seats = [
        {"seat_number": "1A", "status": "available", "price": 500},
        {"seat_number": "1B", "status": "occupied", "price": 500},
        {"seat_number": "2A", "status": "available", "price": 500},
        {"seat_number": "2B", "status": "reserved", "price": 500},
        {"seat_number": "3A", "status": "ladies", "price": 500},
        {"seat_number": "3B", "status": "available", "price": 500},
    ]
    return JsonResponse(seats, safe=False)

# 🔔 Set Wake Me Up Alert
@csrf_exempt
@require_POST
def wake_me_up(request):
    try:
        data = json.loads(request.body)

        bus_number = data.get('bus_number')
        destination = data.get('destination')
        arrival_time = data.get('arrival_time')
        minutes_before = data.get('minutes_before')
        notify_near_destination = data.get('notify_near_destination')
        notify_on_arrival = data.get('notify_on_arrival')

        print(f"Wake Me Up request: {bus_number} to {destination}")

        return JsonResponse({"message": "Wake Me Up alert set successfully!"})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
