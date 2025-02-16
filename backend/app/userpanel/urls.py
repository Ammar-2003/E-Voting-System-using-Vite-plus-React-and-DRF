from django.urls import path
from .views import user_vote_list_create

urlpatterns = [
    path('', user_vote_list_create, name='user-vote-list-create'),

]
