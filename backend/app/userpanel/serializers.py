from rest_framework import serializers
from .models import UserVote

class UserVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserVote
        fields = '__all__'