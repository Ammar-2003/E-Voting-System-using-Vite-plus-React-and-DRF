from rest_framework import serializers
from .models import DashboardStats
from app.adminpanel.models import Election, VoteOption
from app.userpanel.models import UserVote
from django.db import models  


class DashboardStatsSerializer(serializers.ModelSerializer):
    most_voted_option = serializers.CharField(allow_null=True)
    most_voted_count = serializers.IntegerField(allow_null=True)
    most_voted_message = serializers.CharField(allow_null=True)

    class Meta:
        model = DashboardStats
        fields = ['total_users', 'total_active_users', 'total_votes', 'most_voted_option', 'most_voted_count', 'most_voted_message']

    def to_representation(self, instance):
        # Calling the default serializer representation
        data = super().to_representation(instance)
        
        # Adding custom logic for most_voted_option and most_voted_count
        most_voted = self.get_most_voted_option()
        data['most_voted_option'] = most_voted['option']
        data['most_voted_count'] = most_voted['count']
        data['most_voted_message'] = most_voted['message']

        return data

    def get_most_voted_option(self):
        # Logic to find the most voted option
        most_voted = UserVote.objects.values('selected_option').annotate(vote_count=models.Count('selected_option')).order_by('-vote_count').first()
        
        if most_voted:
            option = VoteOption.objects.get(id=most_voted['selected_option'])
            return {
                'option': option.option_text,
                'count': most_voted['vote_count'],
                'message': f"Option '{option.option_text}' received the most votes with {most_voted['vote_count']} votes."
            }
        else:
            return {
                'option': None,
                'count': 0,
                'message': "No votes yet."
            }
