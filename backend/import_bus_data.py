import csv
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from routebus.models import BusRoute

def import_data_from_csv():
    with open('tamilnadu_bus_routes_1040_with_women_special.csv', 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            BusRoute.objects.create(
                bus_name=row['bus_name'],
                bus_no=row['bus_number'],  # Corrected
                origin=row['from_city'],   # Corrected
                destination=row['to_city'], # Corrected
                departure_time=row['departure_time'],
                arrival_time=row['arrival_time'],
                duration=row['duration'],
                fare=row['price'],          # Corrected
                bus_type=row['type'],       # Corrected
                women_only=row['women_special'].strip().lower() == 'true', # Corrected
                amenities=row['features'],  # Corrected
                available_seats=row['available_seats'],
                rating=row['rating'],
            )
    print("Bus data imported successfully!")

if __name__ == "__main__":
    import_data_from_csv()
