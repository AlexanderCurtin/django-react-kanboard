from django.shortcuts import render
from rest_framework import viewsets

from .serializers import BoardSerializer, CardSerializer, LaneSerializer
from .models import Board, Lane, Card

# Create your views here.
class BoardViewSet(viewsets.ModelViewSet):
    serializer_class = BoardSerializer

    def get_queryset(self):
        return Board.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class LanesViewSet(viewsets.ModelViewSet):
    serializer_class = LaneSerializer

    def get_queryset(self):
        return Lane.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CardsViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer

    def get_queryset(self):
        return Card.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
