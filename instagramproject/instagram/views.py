import json

from django.http import HttpResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from .models import Message
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.viewsets import ModelViewSet

from crm.models import Lead, LeadStatus

from .models import (
    InstagramAccount,
    Post,
    Comment,
)

from .serializers import (
    InstagramAccountSerializer,
    MessageSerializer,
    PostSerializer,
    CommentSerializer,
)

class InstagramAccountViewSet(ModelViewSet):

    queryset = InstagramAccount.objects.all()

    serializer_class = InstagramAccountSerializer

    filter_backends = [
        SearchFilter,
        OrderingFilter,
    ]

    search_fields = [
        "username",
    ]

    ordering_fields = [
        "username",
    ]

    def get_serializer_context(self):
        return {
            "request": self.request
        }


class PostViewSet(ModelViewSet):

    queryset = Post.objects.all()

    serializer_class = PostSerializer

    filter_backends = [
        SearchFilter,
        OrderingFilter,
    ]

    search_fields = [
        "caption",
        "instagram_id",
    ]

    ordering_fields = [
        "created_at",
    ]

    def get_serializer_context(self):
        return {
            "request": self.request
        }


class CommentViewSet(ModelViewSet):

    queryset = Comment.objects.all()

    serializer_class = CommentSerializer

    filter_backends = [
        SearchFilter,
        OrderingFilter,
    ]

    search_fields = [
        "username",
        "text",
    ]

    ordering_fields = [
        "created_at",
        "username",
    ]

    def get_serializer_context(self):
        return {
            "request": self.request
        }
    from django.http import HttpResponse

class MessageViewSet(ModelViewSet):

    queryset = Message.objects.all()

    serializer_class = MessageSerializer

    filter_backends = [
        SearchFilter,
        OrderingFilter,
    ]

    search_fields = [
        "text",
    ]

    ordering_fields = [
        "created_at",
    ]

    def get_serializer_context(self):
        return {
            "request": self.request,
        }
@csrf_exempt
def instagram_webhook(request):

    VERIFY_TOKEN = "my_verify_token"

    if request.method == "GET":

        mode = request.GET.get("hub.mode")
        token = request.GET.get("hub.verify_token")
        challenge = request.GET.get("hub.challenge")

        if mode == "subscribe" and token == VERIFY_TOKEN:
            return HttpResponse(challenge)

        return HttpResponse(status=403)
    if request.method == "POST":

        payload = json.loads(request.body)

        print(payload)

        for entry in payload.get("entry", []):

            for change in entry.get("changes", []):

                field = change.get("field")
                value = change.get("value", {})

                if field == "comments":

                    post_id = value["media"]["id"]
                    comment_id = value["id"]
                    text = value["text"]
                    username = value["from"]["username"]
                    instagram_user_id = value["from"]["id"]

                    post, _ = Post.objects.get_or_create(
                        instagram_id=post_id,
                        defaults={
                            "account": InstagramAccount.objects.first(),
                            "caption": "",
                            "image": "",
                            "likes": 0,
                            "comments_count": 0,
                            "created_at": timezone.now(),
                        },
                    )

                    comment, created = Comment.objects.get_or_create(
                        instagram_comment_id=comment_id,
                        defaults={
                            "post": post,
                            "username": username,
                            "instagram_user_id": instagram_user_id,
                            "text": text,
                        },
                    )

                    if created:

                        status = LeadStatus.objects.order_by("order").first()

                        Lead.objects.create(
                            comment=comment,
                            status=status,
                        )

                elif field == "messages":

                    sender_id = value["sender"]["id"]

                    message = value.get("message", {})

                    text = message.get("text", "")

                    message_id = message.get("mid", "")

                    try:
                        comment = Comment.objects.get(
                            instagram_user_id=sender_id,
                        )

                        lead = comment.lead

                    except Comment.DoesNotExist:
                        continue

                    Message.objects.create(
                        lead=lead,
                        instagram_message_id=message_id,
                        sender_id=sender_id,
                        text=text,
                        is_from_instagram=True,
                    )


        return HttpResponse("EVENT_RECEIVED")

    return HttpResponse(status=405)