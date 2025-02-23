from app.adminpanel.models import Election
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import UserVote
from .serializers import UserVoteSerializer

class VoteCreateView(generics.CreateAPIView):
    serializer_class = UserVoteSerializer
    #permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user  # Get the logged-in user
        election = serializer.validated_data["election"]

        # Check if the user has already voted in this election
       # if UserVote.objects.filter(election=election, selected_option__election=election).exists():
       #     raise ValidationError("You have already voted in this election.")

        serializer.save()

