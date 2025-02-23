# admin.py
from django.contrib import admin
from .models import Election , Option

admin.site.register(Election)
admin.site.register(Option)
