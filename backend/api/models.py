from django.db import models

class CityBus(models.Model):
    route_number = models.CharField(max_length=20)
    route_name = models.CharField(max_length=100)
    from_location = models.CharField(max_length=100)
    to_location = models.CharField(max_length=100)
    cost = models.DecimalField(max_digits=6, decimal_places=2)
    distance_km = models.FloatField()
    time_minutes = models.IntegerField()
    next_bus_in_min = models.IntegerField()
    crowd_level = models.CharField(max_length=20)  # e.g., Low, Medium

    def __str__(self):
        return f"{self.route_number} - {self.route_name}"
