from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import InstagramAccount, Post, Comment, Message
from .serializers import (
    InstagramAccountSerializer,
    PostSerializer,
    CommentSerializer,
    MessageSerializer,
)


class InstagramAccountViewSet(ModelViewSet):
    queryset = InstagramAccount.objects.all()
    serializer_class = InstagramAccountSerializer

    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["username"]
    ordering_fields = ["username"]

    def get_serializer_context(self):
        return {"request": self.request}


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["caption", "instagram_id"]
    ordering_fields = ["created_at"]

    def get_serializer_context(self):
        return {"request": self.request}


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["username", "text"]
    ordering_fields = ["created_at", "username"]

    def get_serializer_context(self):
        return {"request": self.request}


class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["text"]
    ordering_fields = ["created_at"]

    def get_serializer_context(self):
        return {"request": self.request}