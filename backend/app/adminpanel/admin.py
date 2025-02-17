# admin.py

from django.contrib import admin

from .models import Election , VoteOption

admin.site.register(Election)
admin.site.register(VoteOption)
