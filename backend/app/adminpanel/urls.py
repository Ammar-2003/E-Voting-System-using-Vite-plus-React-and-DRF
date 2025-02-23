from django.urls import path
from .views import CreateElectionView, CreateOptionView, UpdateElectionView, DeleteElectionView, UpdateOptionView, DeleteOptionView, ElectionDetail, OptionDetailView

urlpatterns = [
    path('', CreateElectionView.as_view(), name="create-election"),
    path('vote-options/', CreateOptionView.as_view(), name="create-options"),
    path('details/<election_id>/', ElectionDetail.as_view(), name='update-election-title'),
    path('update/<int:pk>/', UpdateElectionView.as_view(), name='update-election-title'),
    path('delete/<int:pk>/', DeleteElectionView.as_view(), name="delete-election"),  # Delete election
    path('vote-options/update/<int:pk>/', UpdateOptionView.as_view(), name="update-option"),  # Edit option
    path('vote-options/delete/<int:pk>/', DeleteOptionView.as_view(), name="delete-option"),  # Delete option
    path("vote-options/details/<int:option_id>/", OptionDetailView.as_view(), name="option_detail"),
]
