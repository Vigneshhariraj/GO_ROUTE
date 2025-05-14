from django.urls import path
from . import views 
from .views import search_buses, get_bus_seats, wake_me_up


urlpatterns = [
    path('search/', views.search_buses, name='search_buses'),
    path('<int:bus_id>/seats/', views.get_bus_seats, name='get_bus_seats'),
    path('wake-me-up/', views.wake_me_up, name='wake_me_up'), 
]
