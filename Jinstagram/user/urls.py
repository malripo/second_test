from django.urls import path
from .views import Join, Login, LogOut, UploadProfile

app_name ='user'

urlpatterns = [
    path('', Join.as_view()),
    path('join/', Join.as_view(),name="Join"),
    path('login/', Login.as_view(),name="Login"),
    path('logout/', LogOut.as_view(),name="LogOut"),
    path('profile/upload', UploadProfile.as_view())
]

