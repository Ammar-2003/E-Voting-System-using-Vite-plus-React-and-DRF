from django.db import models
from django.contrib.auth.models import User

# AdminPanel Models
class VoteTitle(models.Model):
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class VoteOption(models.Model):
    vote_title = models.ForeignKey(VoteTitle, related_name="options", on_delete=models.CASCADE)
    option_text = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.vote_title.title} - {self.option_text}"