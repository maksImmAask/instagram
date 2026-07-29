from rest_framework import serializers

from .models import LeadStatus, Lead
from accounts.models import User
from instagram.models import Comment


class LeadStatusListSerializer(serializers.ListSerializer):

    def create(self, validated_data):
        statuses = [
            LeadStatus(**item)
            for item in validated_data
        ]
        return LeadStatus.objects.bulk_create(statuses)


class LeadStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = LeadStatus
        fields = "__all__"
        list_serializer_class = LeadStatusListSerializer


class ManagerSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
        )


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = (
            "id",
            "username",
            "text",
            "created_at",
            "is_replied",
        )


class LeadListSerializer(serializers.ListSerializer):

    def create(self, validated_data):
        leads = [
            Lead(**item)
            for item in validated_data
        ]
        return Lead.objects.bulk_create(leads)


class LeadSerializer(serializers.ModelSerializer):

    manager = ManagerSerializer(read_only=True)
    comment = CommentSerializer(read_only=True)
    status = LeadStatusSerializer(read_only=True)

    manager_id = serializers.PrimaryKeyRelatedField(
        source="manager",
        queryset=User.objects.all(),
        write_only=True,
        required=False,
    )

    comment_id = serializers.PrimaryKeyRelatedField(
        source="comment",
        queryset=Comment.objects.all(),
        write_only=True,
    )

    status_id = serializers.PrimaryKeyRelatedField(
        source="status",
        queryset=LeadStatus.objects.all(),
        write_only=True,
    )

    class Meta:
        model = Lead
        fields = (
            "id",
            "created_at",
            "updated_at",
            "manager",
            "manager_id",
            "comment",
            "comment_id",
            "status",
            "status_id",
        )
        list_serializer_class = LeadListSerializer