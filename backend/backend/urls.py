from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
     path("api/", include("api.urls")), 
    path('api/citybus/', include('api.urls')),        
    path('api/chatbot/', include('chatbot.urls')),
    path('api/routebus/', include('routebus.urls')),
    path('api/', include('multimodal.urls')), 
] +  static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

