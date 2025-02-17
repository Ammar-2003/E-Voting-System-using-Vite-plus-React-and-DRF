from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Election
from .serializers import ElectionSerializer
from .serializers import VoteOptionSerializer
from rest_framework import serializers
from .models import VoteOption

class ElectionListCreateView(generics.ListCreateAPIView):
    queryset = Election.objects.all()
    serializer_class = ElectionSerializer
   # permission_classes = [IsAuthenticated]

    #def perform_create(self, serializer):
        # Automatically assign the logged-in user (admin) as the creator
       # user = self.request.user
      # # if not user.is_staff:
        #    raise serializers.ValidationError("Only admin users can create elections.")
    #    serializer.save(created_by=user)


class VoteOptionListCreateView(generics.ListCreateAPIView):
    queryset = VoteOption.objects.all()
    serializer_class = VoteOptionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Ensure that the election ID exists and is valid
        election_id = self.request.data.get('election')
        try:
            election = Election.objects.get(id=election_id)
        except Election.DoesNotExist:
            raise serializers.ValidationError("Election with this ID does not exist.")

        # Save the vote option with the election
        serializer.save(election=election)