from rest_framework import serializers
from .models import Election, Option
from django.contrib.auth import get_user_model
from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticated



class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ["id", "option_text" , 'election']

class ElectionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, required=False)

    class Meta:
        model = Election
        fields = ["id", "title", "options"]

    def create(self, validated_data):
        options_data = validated_data.get("options", [])  # Prevent KeyError
        election = Election.objects.create(**validated_data)
        for option in options_data:
            Option.objects.create(election=election, **option)
        return election
