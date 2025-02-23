from django.db import models
from django.core.exceptions import ValidationError
from django.conf import settings


class UserVote(models.Model):
    election = models.ForeignKey("adminpanel.Election", on_delete=models.CASCADE, related_name="votes")
    selected_option = models.ForeignKey("adminpanel.Option", on_delete=models.CASCADE)
    voted_at = models.DateTimeField(auto_now_add=True)

    #class Meta:
    #    constraints = [
    #    models.UniqueConstraint(fields=["election", "selected_option"], name="unique_vote_per_election")
    #    ]

    def clean(self):
        """Ensure the selected option belongs to the given election."""
        if self.selected_option.election != self.election:
            raise ValidationError("You can't vote in an election with an invalid option.")

    def __str__(self):
        return f"You Voted for {self.selected_option.option_text} in {self.election.title}"
