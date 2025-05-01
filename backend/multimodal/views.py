import json
import pandas as pd
import traceback
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# ✅ Real hardcoded dataset
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
        '12:00 PM', '12:00 PM', '10:05 AM', '10:30 AM', '10:00 AM', '10:10 AM', '10:30 AM',
        '10:40 AM', '10:45 AM', '10:50 AM', '10:15 AM', '10:20 AM'
    ],
    'end_time': [
        '10:20 AM', '10:50 AM', '11:20 AM', '11:30 AM', '11:50 AM',
        '12:15 PM', '12:20 PM', '10:25 AM', '10:50 AM', '10:30 AM', '10:30 AM', '10:50 AM',
        '11:00 AM', '11:10 AM', '11:20 AM', '10:35 AM', '10:40 AM'
    ],
    'duration_mins': [
        20, 20, 20, 20, 15, 15, 20, 20, 20, 30, 20, 20, 20, 20, 20, 20, 20
    ],
    'fare': [
        10, 10, 12, 10, 8, 8, 10, 10, 10, 12, 10, 10, 12, 10, 10, 8, 8
    ]
}
df = pd.DataFrame(data)

@csrf_exempt
def get_journey_result(request):
    if request.method == 'POST':
        try:
            # 📥 Debug input
            print("📥 Raw request body:", request.body)
            payload = json.loads(request.body)
            print("📥 Parsed payload:", payload)

            from_stop = payload.get("from", "").strip()
            to_stop = payload.get("to", "").strip()

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
        "fare": int(row['fare']),
    }

                

            # 🔁 Try two-leg journey
            first_legs = df[df['from_stop'].str.lower() == from_stop.lower()]
            for _, first_leg in first_legs.iterrows():
                mid = first_leg['to_stop']
                second_leg_df = df[
                    (df['from_stop'].str.lower() == mid.lower()) &
                    (df['to_stop'].str.lower() == to_stop.lower())
                ]
                if not second_leg_df.empty:
                    second_leg = second_leg_df.iloc[0]
                    return JsonResponse({
                        "journeys": [
                            {
                                "label": "Best Route",
                                "legs": [format_leg(first_leg), format_leg(second_leg)]
                            }
                        ]
                    })

            # 🔁 Try direct
            direct = df[
                (df['from_stop'].str.lower() == from_stop.lower()) &
                (df['to_stop'].str.lower() == to_stop.lower())
            ]
            if not direct.empty:
                direct_leg = direct.iloc[0]
                return JsonResponse({
                    "journeys": [
                        {
                            "label": "Best Route",
                            "legs": [format_leg(direct_leg)]
                        }
                    ]
                })

            return JsonResponse({"journeys": []})

        except Exception as e:
            print("❌ Exception:", e)
            traceback.print_exc()
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST allowed"}, status=405)
