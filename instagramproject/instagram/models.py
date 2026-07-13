from django.db import models


class InstagramAccount(models.Model):
    username = models.CharField(max_length=255)
    access_token = models.TextField()
    refresh_token = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username


class Post(models.Model):
    account = models.ForeignKey(
        InstagramAccount,
        on_delete=models.CASCADE,
        related_name="posts"
    )

    instagram_id = models.CharField(max_length=255, unique=True)
    caption = models.TextField(blank=True)
    created_at = models.DateTimeField()

    def __str__(self):
        return self.caption[:40]


class Comment(models.Model):
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="comments"
    )

    instagram_comment_id = models.CharField(max_length=255, unique=True)

    username = models.CharField(max_length=255)

    text = models.TextField()

    is_replied = models.BooleanField(default=False)

    created_at = models.DateTimeField()

    def __str__(self):
        return f"{self.username}: {self.text[:30]}"


class Message(models.Model):
    lead = models.ForeignKey(
        "crm.Lead",
        on_delete=models.CASCADE,
        related_name="messages"
    )

    from_me = models.BooleanField(default=False)

    text = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        sender = "Me" if self.from_me else "Client"
        return f"{sender}: {self.text[:30]}"