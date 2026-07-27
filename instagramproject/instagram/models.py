from django.db import models


class Stage(models.TextChoices):
    NEW = "new", "New"
    CONTACTED = "contacted", "Contacted"
    NEGOTIATION = "negotiation", "Negotiation"
    CONTRACT = "contract", "Contract"
    DONE = "done", "Done"


class InstagramAccount(models.Model):
    username = models.CharField(max_length=255)
    access_token = models.TextField(blank=True)
    refresh_token = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username


class Post(models.Model):
    account = models.ForeignKey(
        InstagramAccount,
        on_delete=models.CASCADE,
        related_name="posts"
    )

    instagram_id = models.CharField(
        max_length=255,
        unique=True
    )

    image = models.URLField(blank=True)

    caption = models.TextField(blank=True)

    likes = models.PositiveIntegerField(default=0)

    comments_count = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField()

    def __str__(self):
        return self.caption[:40]
class Comment(models.Model):
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="comments"
    )

    instagram_comment_id = models.CharField(
        max_length=255,
        unique=True,
        blank=True
    )

    username = models.CharField(max_length=255)

    avatar = models.URLField(blank=True)

    text = models.TextField()

    is_replied = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username}: {self.text[:30]}"


