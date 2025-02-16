from django.urls import path
from .views import vote_list_create, vote_detail, vote_option_list_create, vote_option_detail
urlpatterns = [
    # Admin Panel Routes
    path('', vote_list_create, name='vote-list-create'),
    path('vote-options/', vote_option_list_create, name='vote-option-list-create'),
    path('<int:pk>/', vote_detail, name='vote-detail'),
     path('vote-options/<int:pk>/', vote_option_detail, name='vote-option-detail'),

]