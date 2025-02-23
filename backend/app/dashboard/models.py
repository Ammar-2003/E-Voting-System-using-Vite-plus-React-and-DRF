from django.db import models
from django.conf import settings  # Import settings to access AUTH_USER_MODEL
from app.userpanel.models import UserVote

class DashboardStats(models.Model):
    total_users = models.IntegerField(default=0)
    total_votes = models.IntegerField(default=0)
    total_active_users = models.IntegerField(default=0)

    def update_stats(self):
        UserModel = settings.AUTH_USER_MODEL  # Get custom user model
        self.total_users = UserModel.objects.count()
        self.total_votes = UserVote.objects.count()
        self.total_active_users = UserModel.objects.filter(is_active=True).count()
        self.save()

    def __str__(self):
        return "Dashboard Stats"
