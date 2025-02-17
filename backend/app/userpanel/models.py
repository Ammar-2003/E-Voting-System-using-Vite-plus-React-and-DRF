from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

class UserVote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    election = models.ForeignKey("adminpanel.Election", on_delete=models.CASCADE, related_name="votes")
    selected_option = models.ForeignKey("adminpanel.VoteOption", on_delete=models.CASCADE)


    voted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "election")  # Prevents multiple votes in the same election

    def clean(self):
        """Ensure users can only vote in valid elections and can't vote twice."""
        if self.selected_option.election != self.election:
            raise ValidationError("You can't vote in an election with an invalid option.")

        if UserVote.objects.filter(user=self.user, election=self.election).exists():
            raise ValidationError("You have already voted in this election.")

    def __str__(self):
        return f"{self.user.username} voted for {self.selected_option.option_text} in Election {self.election.election_number}"
