from rest_framework import serializers
from .models import UserVote
from app.login.models import User  # Import your custom user model


class UserVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserVote
        fields = ["election", "selected_option"]

    def validate(self, data):
        """Ensure the selected option is valid for the election."""
        if data["selected_option"].election != data["election"]:
            raise serializers.ValidationError("Invalid option for this election.")
        return data


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Use your custom user model
        fields = ['id', 'email', 'first_name', 'last_name']  # Adjust fields as needed
