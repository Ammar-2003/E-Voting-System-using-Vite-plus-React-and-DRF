from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Election, Option
from .serializers import ElectionSerializer, OptionSerializer
from django.shortcuts import get_object_or_404
from rest_framework import viewsets




class CreateElectionView(APIView):
    def get(self, request, *args, **kwargs):
        elections = Election.objects.all()  # Retrieve all elections
        serializer = ElectionSerializer(elections, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = ElectionSerializer(data=request.data)
        if serializer.is_valid():
            election = serializer.save()  # Save election
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateOptionView(APIView):
    def get(self, request, *args, **kwargs):
        options = Option.objects.all()  # Retrieve all options
        serializer = OptionSerializer(options, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = OptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save option
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateElectionView(APIView):
    def get(self, request, *args, **kwargs):
        election_id = kwargs.get('pk')
        if not election_id:
            return Response({'detail': 'Invalid election ID'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            election = Election.objects.get(id=election_id)
        except Election.DoesNotExist:
            return Response({'detail': 'Election not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ElectionSerializer(election)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        election_id = kwargs.get('pk')
        try:
            election = Election.objects.get(id=election_id)
        except Election.DoesNotExist:
            return Response({'detail': 'Election not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ElectionSerializer(election, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ElectionDetail(APIView):
    def get(self, request, election_id):
        try:
            election = Election.objects.get(id=election_id)
        except Election.DoesNotExist:
            return Response({"error": "Election not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ElectionSerializer(election)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeleteElectionView(APIView):
    def delete(self, request, *args, **kwargs):
        election_id = kwargs.get('pk')
        try:
            election = Election.objects.get(id=election_id)
        except Election.DoesNotExist:
            return Response({'detail': 'Election not found'}, status=status.HTTP_404_NOT_FOUND)

        election.delete()
        return Response({'detail': 'Election deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


class UpdateOptionView(APIView):
    # GET method to fetch the option details
    def get(self, request, *args, **kwargs):
        option_id = kwargs.get('pk')
        try:
            option = Option.objects.get(id=option_id)
        except Option.DoesNotExist:
            return Response({'detail': 'Option not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = OptionSerializer(option)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # POST method to update the option
    def post(self, request, *args, **kwargs):
        option_id = kwargs.get('pk')
        try:
            option = Option.objects.get(id=option_id)
        except Option.DoesNotExist:
            return Response({'detail': 'Option not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = OptionSerializer(option, data=request.data, partial=True)  # partial=True allows partial update
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteOptionView(APIView):
    def delete(self, request, *args, **kwargs):
        option_id = kwargs.get('pk')
        try:
            option = Option.objects.get(id=option_id)
        except Option.DoesNotExist:
            return Response({'detail': 'Option not found'}, status=status.HTTP_404_NOT_FOUND)

        option.delete()
        return Response({'detail': 'Option deleted successfully'}, status=status.HTTP_204_NO_CONTENT)



class OptionDetailView(APIView):
    """
    Handles retrieving, updating, and deleting an option by ID.
    """

    def get(self, request, option_id):
        """Retrieve an option by ID."""
        option = get_object_or_404(Option, id=option_id)
        serializer = OptionSerializer(option)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, option_id):
        """Update an option by ID."""
        option = get_object_or_404(Option, id=option_id)
        serializer = OptionSerializer(option, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, option_id):
        """Delete an option by ID."""
        option = get_object_or_404(Option, id=option_id)
        option.delete()
        return Response({"message": "Option deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
