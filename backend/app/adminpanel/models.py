import uuid
from django.db import models

class Election(models.Model):
    title = models.CharField(max_length=255)
    winner_declared = models.BooleanField(default=False)  # Track if winner is declared
    declared_winner = models.ForeignKey(
        "adminpanel.Option",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="election_winner"
    )
    def get_declared_winner(self, obj):
        """Returns winner option text instead of ID"""
        return obj.declared_winner.option_text if obj.declared_winner else None

    def __str__(self):
        return self.title


class Option(models.Model):
    election = models.ForeignKey(Election, related_name="options", on_delete=models.CASCADE)
    option_text = models.CharField(max_length=255)

    def __str__(self):
        return self.option_text
