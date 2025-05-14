import json
import pandas as pd
import traceback
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

data = {
    'from_stop': [
        'No.1 Tolgate', 'Chatram Bus Stand', 'Chatram Bus Stand', 'Central Bus Stand', 'Teppakulam',
        'Thillai Nagar', 'Central Bus Stand', 'No.1 Tolgate', 'Woraiyur', 'Srirangam',
        'Samayapuram', 'Chatram Bus Stand', 'Thiruvanaikovil', 'Chatram Bus Stand', 'Palpanai',
        'Palakarai', 'Sinagarathopu'
    ],
    'to_stop': [
        'Chatram Bus Stand', 'Central Bus Stand', 'Srirangam', 'Teppakulam', 'Thillai Nagar',
        'Chatram Bus Stand', 'Rockfort', 'Woraiyur', 'Central Bus Stand', 'Central Bus Stand',
        'Chatram Bus Stand', 'Central Bus Stand', 'Chatram Bus Stand', 'Central Bus Stand', 'Central Bus Stand',
        'Central Bus Stand', 'Central Bus Stand'
    ],
    'mode': ['bus'] * 17,
    'route_name': [
        '1A', '24B', '1B', '7C', '5A', '6B', '7D', '2A', '2B', '8A', '8A', '24B',
        '9A', '24C', '7E', '6C', '2C'
    ],
    'start_time': [
        '10:00 AM', '10:30 AM', '11:00 AM', '11:10 AM', '11:35 AM',
        '12:00 PM', '12:15 PM', '10:05 AM', '10:30 AM', '10:00 AM', '10:10 AM', '10:30 AM',
        '10:40 AM', '10:45 AM', '10:50 AM', '10:15 AM', '10:20 AM'
    ],
    'end_time': [
        '10:20 AM', '10:50 AM', '11:20 AM', '11:30 AM', '11:50 AM',
        '12:15 PM', '12:35 PM', '10:25 AM', '10:50 AM', '10:30 AM', '10:30 AM', '10:50 AM',
        '11:00 AM', '11:10 AM', '11:20 AM', '10:35 AM', '10:40 AM'
    ],
    'duration_mins': [20, 20, 20, 20, 15, 15, 20, 20, 20, 30, 20, 20, 20, 20, 20, 20, 20],
    'fare': [10, 10, 12, 10, 8, 8, 10, 10, 10, 12, 10, 10, 12, 10, 10, 8, 8]
}

df = pd.DataFrame(data)

@csrf_exempt
def get_journey_result(request):
    if request.method == 'POST':
        try:
            print("🟡 Incoming request:", request.body)

            payload = json.loads(request.body)
            from_stop = payload.get("from", "").strip()
            to_stop = payload.get("to", "").strip()

            print("🔹 Received FROM:", from_stop)
            print("🔹 Received TO:", to_stop)
            print("🔹 Available FROM options:", df['from_stop'].unique())
            print("🔹 Available TO options:", df['to_stop'].unique())

            if not from_stop or not to_stop:
                return JsonResponse({"error": "Missing 'from' or 'to'"}, status=400)

            def format_leg(row):
                return {
                    "from": str(row['from_stop']),
                    "to": str(row['to_stop']),
                    "mode": str(row['mode']),
                    "route": str(row['route_name']),
                    "start_time": str(row['start_time']),
                    "end_time": str(row['end_time']),
                    "duration_mins": int(row['duration_mins']),
                    "fare": int(row['fare'])
                }

            journeys = []

        
            first_legs = df[df['from_stop'].str.lower() == from_stop.lower()]
            for _, first_leg in first_legs.iterrows():
                mid = first_leg['to_stop']
                second_legs = df[
                    (df['from_stop'].str.lower() == mid.lower()) &
                    (df['to_stop'].str.lower() == to_stop.lower())
                ]
                for _, second_leg in second_legs.iterrows():
                    total_duration = int(first_leg['duration_mins'] + second_leg['duration_mins'])
                    total_fare = int(first_leg['fare'] + second_leg['fare'])

                    journeys.append({
                        "label": "Best Route" if not journeys else "Suggested",
                        "legs": [format_leg(first_leg), format_leg(second_leg)],
                        "total_duration": total_duration,
                        "total_fare": total_fare
                    })

            if not journeys:
                direct = df[
                    (df['from_stop'].str.lower() == from_stop.lower()) &
                    (df['to_stop'].str.lower() == to_stop.lower())
                ]
                for _, leg in direct.iterrows():
                    journeys.append({
                        "label": "Direct",
                        "legs": [format_leg(leg)],
                        "total_duration": int(leg['duration_mins']),
                        "total_fare": int(leg['fare'])
                    })

            return JsonResponse({"journeys": journeys})

        except Exception as e:
            traceback.print_exc()
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST allowed"}, status=405)
