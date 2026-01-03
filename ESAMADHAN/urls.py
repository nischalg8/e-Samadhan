from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),  # Django admin
    path('api/users/', include('users.urls')),  # Citizen + Agency login, ranking
    path('api/issues/', include('issues.urls')),  # Issue APIs
    path('api/agencies/', include('agencies.urls')),  # Agency list, create, detail
    
    
]

# Serve media files (photos) in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
