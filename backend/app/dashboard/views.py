from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated  # Optional
from django.contrib.auth import get_user_model
from django.db.models import Count
from app.userpanel.models import UserVote
from app.adminpanel.models import Option , Election
from rest_framework import status
from app.adminpanel.serializers import ElectionSerializer


User = get_user_model()  # Uses your AUTH_USER_MODEL = 'login.User'


class DashboardStatsView(APIView):
    #permission_classes = [IsAuthenticated]  # Require authentication (Optional)

    def get(self, request):
        # Get total users and active users
        total_users = User.objects.count()
        total_active_users = User.objects.filter(is_active=True).count()

        # Get total votes
        total_votes = UserVote.objects.count()

        # Get most voted option
        most_voted = (
            UserVote.objects.values('selected_option')
            .annotate(vote_count=Count('selected_option'))
            .order_by('-vote_count')
            .first()
        )

        if most_voted:
            option = Option.objects.get(id=most_voted['selected_option'])
            most_voted_option = option.option_text
            most_voted_count = most_voted['vote_count']
            most_voted_message = f"Option '{option.option_text}' received the most votes with {most_voted['vote_count']} votes."
        else:
            most_voted_option = None
            most_voted_count = 0
            most_voted_message = "No votes yet."

        return Response({
            "total_users": total_users,
            "total_active_users": total_active_users,
            "total_votes": total_votes,
            "most_voted_option": most_voted_option,
            "most_voted_count": most_voted_count,
            "most_voted_message": most_voted_message
        })

class WinnerStatsView(APIView):
    def get(self, request, election_id):
        try:
            election = Election.objects.get(id=election_id)
        except Election.DoesNotExist:
            return Response({"error": "Election not found."}, status=status.HTTP_404_NOT_FOUND)

        total_votes = UserVote.objects.filter(election=election).count()

        if election.winner_declared:
            winner_text = election.declared_winner.option_text
            winner_votes = UserVote.objects.filter(selected_option=election.declared_winner).count()
            winner_message = f"Winner is '{winner_text}' with {winner_votes} votes."
        else:
            winner_text = None
            winner_votes = 0
            winner_message = "Winner not declared yet."

        return Response({
            "total_votes": total_votes,
            "winner_declared": election.winner_declared,
            "winner_text": winner_text,
            "winner_votes": winner_votes,
            "winner_message": winner_message
        })


class DeclareWinnerView(APIView):
    def post(self, request, election_id):
        try:
            election = Election.objects.get(id=election_id)
        except Election.DoesNotExist:
            return Response({"error": "Election not found."}, status=status.HTTP_404_NOT_FOUND)

        if election.winner_declared:
            return Response({
                "message": f"Winner has already been declared: {election.declared_winner.option_text}"
            })

        most_voted = (
            UserVote.objects.filter(election=election)
            .values('selected_option')
            .annotate(vote_count=Count('selected_option'))
            .order_by('-vote_count')
            .first()
        )

        if not most_voted:
            return Response({"error": "No votes have been cast yet."}, status=status.HTTP_400_BAD_REQUEST)

        winning_option = Option.objects.get(id=most_voted['selected_option'])

        election.declared_winner = winning_option
        election.winner_declared = True
        election.save()

        # Serialize and return the updated election data
        return Response({
            "message": f"Winner '{winning_option.option_text}' has been declared.",
            "election": ElectionSerializer(election).data  # Include serialized data
        }, status=status.HTTP_200_OK)
