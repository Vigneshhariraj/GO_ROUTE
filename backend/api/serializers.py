from rest_framework import serializers
from .models import CityBus

class CityBusSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityBus
        fields = '__all__'
