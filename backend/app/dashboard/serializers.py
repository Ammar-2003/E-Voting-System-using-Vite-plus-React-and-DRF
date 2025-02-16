from rest_framework import serializers
from .models import DashboardStats

class DashboardStatsSerializer(serializers.Serializer):
    total_users = serializers.IntegerField()
    total_active_users = serializers.IntegerField()
    total_votes = serializers.IntegerField()
    most_voted_option = serializers.CharField(allow_null=True)
    most_voted_count = serializers.IntegerField(allow_null=True)
    most_voted_message = serializers.CharField(allow_null=True)