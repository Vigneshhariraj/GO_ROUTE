from django.urls import path
from .views import get_journey_result

urlpatterns = [
    path("journey/", get_journey_result),
]
