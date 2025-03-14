from rest_framework import serializers
from django.db import models
from app.adminpanel.models import Option
from .models import UserVote
from app.login.models import User  # Import your custom User model

class DashboardStatsSerializer(serializers.Serializer):
    total_users = serializers.IntegerField()
    total_active_users = serializers.IntegerField()
    total_votes = serializers.IntegerField()
    most_voted_option = serializers.CharField(allow_null=True)
    most_voted_count = serializers.IntegerField(allow_null=True)
    most_voted_message = serializers.CharField(allow_null=True)

    def to_representation(self, instance):
        # Dynamic counts
        total_users = User.objects.count()
        total_active_users = User.objects.filter(is_active=True).count()
        total_votes = UserVote.objects.count()

        # Find the most voted option
        most_voted = self.get_most_voted_option()

        return {
            "total_users": total_users,
            "total_active_users": total_active_users,
            "total_votes": total_votes,
            "most_voted_option": most_voted['option'],
            "most_voted_count": most_voted['count'],
            "most_voted_message": most_voted['message']
        }

    def get_most_voted_option(self):
        most_voted = (
            UserVote.objects.values("selected_option")
            .annotate(vote_count=models.Count("selected_option"))
            .order_by("-vote_count")
            .first()
        )

        if most_voted:
            option = Option.objects.get(id=most_voted["selected_option"])
            return {
                "option": option.option_text,
                "count": most_voted["vote_count"],
                "message": f"Option '{option.option_text}' received the most votes with {most_voted['vote_count']} votes."
            }
        else:
            return {
                "option": None,
                "count": 0,
                "message": "No votes yet."
            }
