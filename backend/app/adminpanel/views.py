from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import VoteSerializer, VoteOptionSerializer
from .models import VoteTitle, VoteOption
from rest_framework import status

# Vote API (List, Create)
@api_view(['GET', 'POST'])
def vote_list_create(request):
    if request.method == 'GET':
        votes = VoteTitle.objects.all()
        serializer = VoteSerializer(votes, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = VoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vote API (Retrieve, Update, Delete)
@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def vote_detail(request, pk):
    vote = get_object_or_404(VoteTitle, pk=pk)

    if request.method == 'GET':
        serializer = VoteSerializer(vote)
        return Response(serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        serializer = VoteSerializer(vote, data=request.data, partial=(request.method == 'PATCH'))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        vote.delete()
        return Response({"message": "Vote deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


# Vote Option API (List, Create)
@api_view(['GET', 'POST'])
def vote_option_list_create(request):
    if request.method == 'GET':
        options = VoteOption.objects.all()
        serializer = VoteOptionSerializer(options, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = VoteOptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vote Option API (Retrieve, Update, Delete)
@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def vote_option_detail(request, pk):
    option = get_object_or_404(VoteOption, pk=pk)

    if request.method == 'GET':
        serializer = VoteOptionSerializer(option)
        return Response(serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        serializer = VoteOptionSerializer(option, data=request.data, partial=(request.method == 'PATCH'))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        option.delete()
        return Response({"message": "Vote option deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
