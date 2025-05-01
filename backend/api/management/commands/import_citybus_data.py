import csv
from django.core.management.base import BaseCommand
from api.models import CityBus

class Command(BaseCommand):
    help = "Import city bus data from CSV"

    def handle(self, *args, **kwargs):
        with open("trichy_LOCAL_bus_routes_100.csv", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            CityBus.objects.all().delete()  # Optional: Reset existing data

            for row in reader:
                CityBus.objects.create(
                    route_number=row.get("bus_number", "NA").strip(),
                    route_name=row.get("bus_name", "Unnamed Route").strip(),
                    from_location=row.get("from_location", "Unknown").strip(),
                    to_location=row.get("to_location", "Unknown").strip(),
                    cost=float(row.get("cost", 10)),
                    distance_km=float(row.get("distance_km", 5.0)),
                    time_minutes=int(row.get("duration_mins", 15)),
                    next_bus_in_min=int(row.get("next_bus_in_mins", 10)),
                    crowd_level=row.get("crowd_level", "Medium").strip(),
                )

        self.stdout.write(self.style.SUCCESS("✅ City bus data imported successfully."))
