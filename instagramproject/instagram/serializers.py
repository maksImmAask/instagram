from rest_framework import serializers
from .models import InstagramAccount, Post, Comment, Message


class InstagramAccountListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        accounts = [InstagramAccount(**item) for item in validated_data]
        return InstagramAccount.objects.bulk_create(accounts)


class InstagramAccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = InstagramAccount
        fields = "__all__"
        list_serializer_class = InstagramAccountListSerializer
        extra_kwargs = {
            "url": {"view_name": "instagramaccount-detail"}
        }


class PostListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        posts = [Post(**item) for item in validated_data]
        return Post.objects.bulk_create(posts)


class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
        list_serializer_class = PostListSerializer
        extra_kwargs = {
            "url": {"view_name": "post-detail"}
        }


class CommentListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        comments = [Comment(**item) for item in validated_data]
        return Comment.objects.bulk_create(comments)


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
        list_serializer_class = CommentListSerializer
        extra_kwargs = {
            "url": {"view_name": "comment-detail"}
        }


class MessageListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        messages = [Message(**item) for item in validated_data]
        return Message.objects.bulk_create(messages)


class MessageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"
        list_serializer_class = MessageListSerializer
        extra_kwargs = {
            "url": {"view_name": "message-detail"}
        }