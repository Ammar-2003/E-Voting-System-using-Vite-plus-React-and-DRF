from rest_framework import serializers
from .models import Election, Option
from rest_framework import serializers



class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ["id", "option_text" , 'election']

class ElectionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, required=False)
    declared_winner = serializers.SerializerMethodField(required=False)  # Optional

    class Meta:
        model = Election
        fields = ["id", "title", "options", "winner_declared", "declared_winner"]
        extra_kwargs = {
            "winner_declared": {"required": False},  # Make it optional
        }

    def get_declared_winner(self, obj):
        """Ensure the declared winner is returned as a serializable object."""
        return str(obj.declared_winner) if obj.declared_winner else None

    def create(self, validated_data):
        """Handle nested creation of `options` when creating an election."""
        options_data = validated_data.pop("options", [])  # Prevent KeyError
        election = Election.objects.create(**validated_data)  # Create election first

        # Create each option related to this election
        for option_data in options_data:
            Option.objects.create(election=election, **option_data)

        return election