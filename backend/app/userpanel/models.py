from django.db import models
from django.contrib.auth.models import User
from app.adminpanel.models import VoteTitle, VoteOption

class UserVote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vote = models.ForeignKey(VoteTitle, on_delete=models.CASCADE)
    selected_option = models.ForeignKey(VoteOption, on_delete=models.CASCADE)
    voted_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'vote')  # Ensures a user votes only once per poll