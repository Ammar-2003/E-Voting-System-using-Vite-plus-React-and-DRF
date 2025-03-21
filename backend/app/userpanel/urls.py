from django.urls import path
from .views import VoteCreateView , ProfileView

urlpatterns = [
    path("", VoteCreateView.as_view(), name="vote"),
    path("profile/", ProfileView.as_view(), name="profile"),
]
