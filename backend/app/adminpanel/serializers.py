from rest_framework import serializers
from .models import VoteTitle , VoteOption

# Serializers
class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoteTitle
        fields = '__all__'

class VoteOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoteOption
        fields = '__all__'