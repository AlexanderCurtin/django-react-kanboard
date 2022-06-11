from django.shortcuts import render
from rest_framework import viewsets

from .serializers import BoardSerializer, CardSerializer, LaneSerializer
from .models import Board, Lane, Card

# Create your views here.
class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all().prefetch_related("lane_set").order_by("name")
    serializer_class = BoardSerializer


class LanesViewSet(viewsets.ModelViewSet):
    queryset = Lane.objects.all().order_by("name")
    serializer_class = LaneSerializer


class CardsViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
