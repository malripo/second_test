from django.contrib import admin
from django.urls import path, include
from .views import Sub
from content.views import Main, UploadFeed
from user.views import Join

from .settings import MEDIA_URL, MEDIA_ROOT
from django.conf.urls.static import static

app_name = 'Jinstagram'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('main/', Main.as_view(), name='Main'),
    path('content/', include('content.urls')),
    path('user/', include('user.urls')),
    path('', Join.as_view())
    # path('', Sub.as_view()),
]

urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)
