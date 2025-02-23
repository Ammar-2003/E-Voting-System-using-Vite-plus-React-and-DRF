import uuid
from django.db import models

class Election(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

class Option(models.Model):
    election = models.ForeignKey(Election, related_name="options", on_delete=models.CASCADE)
    option_text = models.CharField(max_length=255)

    def __str__(self):
        return self.option_text
