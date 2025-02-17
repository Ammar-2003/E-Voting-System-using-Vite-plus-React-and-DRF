from rest_framework import serializers
from .models import Election, VoteOption

class VoteOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoteOption
        fields = ["option_text"]

class ElectionSerializer(serializers.ModelSerializer):
    options = VoteOptionSerializer(many=True)  # Nested serializer for related VoteOptions

    class Meta:
        model = Election
        fields = ["election_number", "title", "options"]

    def create(self, validated_data):
        options_data = validated_data.pop("options")
        # Create the Election instance
        election = Election.objects.create(**validated_data)

        # Create related VoteOptions
        for option_data in options_data:
            VoteOption.objects.create(election=election, **option_data)

        return election
