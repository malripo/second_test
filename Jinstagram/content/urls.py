from django.urls import path
from .views import UploadFeed, Profile, Main, UploadReply, ToggleLike, ToggleBookmark

app_name ='content'

urlpatterns = [
    path('upload/', UploadFeed.as_view()),
    path('reply/', UploadReply.as_view()),
    path('like/', ToggleLike.as_view(),name="ToggleLike"),
    path('bookmark/', ToggleBookmark.as_view(),name="ToggleBookmark"),
    path('profile/', Profile.as_view(),name="Profile"),
    path('main', Main.as_view())
]

