from django.urls import path
from .views import DashboardStatsView , WinnerStatsView , DeclareWinnerView

urlpatterns = [
    path('', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('declare-winner/<int:election_id>/', DeclareWinnerView.as_view(), name='declare-winner'),
    path('stats/<int:election_id>/', WinnerStatsView.as_view(), name='election-stats'),
]
