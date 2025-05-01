from django.db import models

class BusRoute(models.Model):
    bus_name = models.CharField(max_length=200)
    bus_no = models.CharField(max_length=50)
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    departure_time = models.CharField(max_length=20)
    arrival_time = models.CharField(max_length=20)
    duration = models.CharField(max_length=20)
    fare = models.DecimalField(max_digits=10, decimal_places=2)
    bus_type = models.CharField(max_length=50)  # Example: AC, Sleeper, etc.
    women_only = models.BooleanField(default=False)
    amenities = models.TextField()
    available_seats = models.IntegerField()
    rating = models.FloatField()

    def __str__(self):
        return f"{self.bus_name} ({self.bus_no})"
