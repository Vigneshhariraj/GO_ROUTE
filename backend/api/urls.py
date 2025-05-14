from django.urls import path
from .views import get_navigation_info
from django.urls import path, include
from .views import CityBusSearchAPIView


urlpatterns = [
    path('navigation/', get_navigation_info),
    path('chatbot/', include('chatbot.urls')),
    path('search/', CityBusSearchAPIView.as_view(), name='citybus-search'),

]
