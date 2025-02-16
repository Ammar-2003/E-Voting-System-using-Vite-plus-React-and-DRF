from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserVote
from .serializers import UserVoteSerializer
from rest_framework import status

# Create your views here.

# User Vote API
@api_view(['GET', 'POST'])
def user_vote_list_create(request):
    if request.method == 'GET':
        user_votes = UserVote.objects.all()
        serializer = UserVoteSerializer(user_votes, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = UserVoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)