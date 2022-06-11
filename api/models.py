from pydoc import describe
from django.db import models

# Create your models here.


class Board(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        self.name


class Lane(models.Model):
    name = models.CharField(max_length=50)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)

    def __str__(self):
        self.name


class Card(models.Model):
    description = models.CharField(max_length=256)

    lane = models.ForeignKey(Lane, on_delete=models.CASCADE)

    def __str__(self):
        self.description
