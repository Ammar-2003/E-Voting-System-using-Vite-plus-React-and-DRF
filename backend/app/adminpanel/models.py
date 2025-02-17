from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

class Election(models.Model):
    election_number = models.PositiveIntegerField(unique=True)
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    #def clean(self):
    #    """Ensure only admin users can create elections."""
    #    if not self.created_by.is_staff:
    #        raise ValidationError("Only admin users can create elections.")

    def __str__(self):
        return f"Election {self.election_number}: {self.title}"


class VoteOption(models.Model):
    election = models.ForeignKey(Election, related_name="options", on_delete=models.CASCADE)
    option_text = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.option_text} (Election {self.election.election_number})"
