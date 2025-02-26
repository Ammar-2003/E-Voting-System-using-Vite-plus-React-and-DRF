
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import DashboardStats
from .serializers import DashboardStatsSerializer

class DashboardStatsView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            # Assuming there's only one row in DashboardStats
            dashboard_stats = DashboardStats.objects.first()
            
            if not dashboard_stats:
                return Response({"error": "No dashboard statistics available."}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = DashboardStatsSerializer(dashboard_stats)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)