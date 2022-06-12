from dataclasses import field
from rest_framework import serializers
from .models import Board, Lane, Card


class LaneSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username", read_only=True)
    board = serializers.HyperlinkedRelatedField(
        view_name="board-detail", queryset=Board.objects.all()
    )

    class Meta:
        model = Lane
        fields = ("name", "id", "board", "card_set", "owner")


class BoardSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username", read_only=True)

    class Meta:
        model = Board
        fields = ("name", "id", "lane_set", "owner")


class CardSerializer(serializers.HyperlinkedModelSerializer):
    lane = serializers.HyperlinkedRelatedField(
        view_name="lane-detail", queryset=Lane.objects.all()
    )

    owner = serializers.ReadOnlyField(source="owner.username", read_only=True)

    class Meta:
        model = Card
        fields = ("description", "id", "lane", "owner")
