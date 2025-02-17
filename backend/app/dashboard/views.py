from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import DashboardStats
from .serializers import DashboardStatsSerializer

class DashboardStatsView(APIView):
    def get(self, request):
        # Assuming you have a single DashboardStats instance in your database
        stats = DashboardStats.objects.first()

        if stats:
            serializer = DashboardStatsSerializer(stats)
            return Response(serializer.data)
        else:
            return Response({"detail": "Stats not found."}, status=status.HTTP_404_NOT_FOUND)
