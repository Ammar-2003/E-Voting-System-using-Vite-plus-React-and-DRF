from django.db import models
from django.contrib.auth.models import User
from app.userpanel.models import UserVote
# Create your models here.
class DashboardStats(models.Model):
    total_users = models.IntegerField(default=0)
    total_votes = models.IntegerField(default=0)
    total_active_users = models.IntegerField(default=0)
    
    def update_stats(self):
        self.total_users = User.objects.count()
        self.total_votes = UserVote.objects.count()
        self.total_active_users = User.objects.filter(is_active=True).count()
        self.save()

    def __str__(self):
        return "Dashboard Stats"