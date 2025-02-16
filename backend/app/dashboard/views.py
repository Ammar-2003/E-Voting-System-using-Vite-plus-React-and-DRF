from django.contrib.auth.models import User
from django.db.models import Count
from rest_framework.response import Response
from rest_framework.views import APIView
from app.adminpanel.models import VoteOption
from app.userpanel.models import UserVote

class DashboardStatsView(APIView):
    def get(self, request):
        # Count total users
        total_users = User.objects.count()
        
        # Count total votes
        total_votes = UserVote.objects.count()

        # Get the most voted option dynamically
        most_voted_name = None
        most_voted = (
            UserVote.objects.values('selected_option__option_text')
            .annotate(vote_count=Count('selected_option'))
            .order_by('-vote_count')
            .first()
        )

        # Extract the most voted option's name
        if most_voted:
            most_voted_name = most_voted['selected_option__option_text']

        # Prepare response data
        data = {
            'total_users': total_users,
            'most_voted_option': most_voted_name,  # Now stores only the option name
            'total_votes': total_votes,
            'most_voted_count': most_voted['vote_count'] if most_voted else None,  # Keeps the vote count
        }

        return Response(data)
