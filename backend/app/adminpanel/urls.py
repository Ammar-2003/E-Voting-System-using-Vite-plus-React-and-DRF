from django.urls import path
from .views import ElectionListCreateView, VoteOptionListCreateView

urlpatterns = [
    # URL for handling the creation and listing of elections
    path('', ElectionListCreateView.as_view(), name='election-list-create'),
    
    # URL for handling the creation and listing of vote options for an election
    path('voteoptions/', VoteOptionListCreateView.as_view(), name='voteoption-list-create'),
]
