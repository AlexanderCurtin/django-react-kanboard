from dataclasses import field
from rest_framework import serializers
from .models import Board, Lane, Card


class LaneSerializer(serializers.HyperlinkedModelSerializer):
    board = serializers.HyperlinkedRelatedField(
        view_name="board-detail", queryset=Board.objects.all()
    )

    class Meta:
        model = Lane
        fields = ("name", "id", "board", "card_set")


class BoardSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Board
        fields = ("name", "id", "lane_set")


class CardSerializer(serializers.HyperlinkedModelSerializer):
    lane = serializers.HyperlinkedRelatedField(
        view_name="lane-detail", queryset=Lane.objects.all()
    )

    class Meta:
        model = Card
        fields = ("description", "id", "lane")
