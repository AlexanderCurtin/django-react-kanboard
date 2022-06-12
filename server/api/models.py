from pydoc import describe
from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Board(models.Model):
    owner = models.ForeignKey(
        User, verbose_name="User", related_name="boards", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Lane(models.Model):
    owner = models.ForeignKey(
        User, verbose_name="User", related_name="lanes", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=50)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Card(models.Model):
    owner = models.ForeignKey(
        User, verbose_name="User", related_name="cards", on_delete=models.CASCADE
    )
    description = models.CharField(max_length=256)

    lane = models.ForeignKey(Lane, on_delete=models.CASCADE)

    def __str__(self):
        return self.description
