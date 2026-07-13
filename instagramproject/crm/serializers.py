from rest_framework import serializers
from .models import Lead, LeadStatus


class LeadStatusListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        statuses = [LeadStatus(**item) for item in validated_data]
        return LeadStatus.objects.bulk_create(statuses)


class LeadStatusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LeadStatus
        fields = "__all__"
        list_serializer_class = LeadStatusListSerializer
        extra_kwargs = {
            "url": {"view_name": "leadstatus-detail"}
        }


class LeadListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        leads = [Lead(**item) for item in validated_data]
        return Lead.objects.bulk_create(leads)


class LeadSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Lead
        fields = "__all__"
        list_serializer_class = LeadListSerializer
        extra_kwargs = {
            "url": {"view_name": "lead-detail"}
        }