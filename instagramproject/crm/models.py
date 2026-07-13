from django.db import models
from django.conf import settings


class LeadStatus(models.Model):
    name = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name


class Lead(models.Model):
    manager = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="leads"
    )

    status = models.ForeignKey(
        LeadStatus,
        on_delete=models.SET_NULL,
        null=True,
        related_name="leads"
    )

    comment = models.OneToOneField(
        "instagram.Comment",
        on_delete=models.CASCADE,
        related_name="lead"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.comment.username