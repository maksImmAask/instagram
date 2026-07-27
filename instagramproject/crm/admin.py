from django.contrib import admin

from .models import Lead, LeadStatus

admin.site.register(Lead)

admin.site.register(LeadStatus)