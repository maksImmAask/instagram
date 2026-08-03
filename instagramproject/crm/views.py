from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.viewsets import ModelViewSet

from .models import (
    LeadStatus,
    Lead,
)
from rest_framework.decorators import action
from rest_framework.response import Response

from instagram.models import Message
from instagram.serializers import MessageSerializer

from .serializers import (
    LeadStatusSerializer,
    LeadSerializer,
)


class LeadStatusViewSet(ModelViewSet):

    queryset = LeadStatus.objects.all()

    serializer_class = LeadStatusSerializer

    filter_backends = [
        SearchFilter,
        OrderingFilter,
    ]

    search_fields = [
        "name",
    ]

    ordering_fields = [
        "order",
    ]

    def get_serializer_context(self):
        return {
            "request": self.request
        }

class LeadViewSet(ModelViewSet):

    queryset = Lead.objects.select_related(
        "manager",
        "status",
        "comment",
    )

    serializer_class = LeadSerializer

    filter_backends = [
        SearchFilter,
        OrderingFilter,
    ]

    search_fields = [
        "comment__username",
        "comment__text",
        "manager__username",
        "status__name",
    ]

    ordering_fields = [
        "created_at",
        "updated_at",
    ]

    def get_serializer_context(self):
        return {
            "request": self.request,
        }

    @action(
        detail=True,
        methods=["get"],
    )
    def messages(self, request, pk=None):

        lead = self.get_object()

        queryset = lead.messages.order_by(
            "created_at",
        )

        serializer = MessageSerializer(
            queryset,
            many=True,
            context={
                "request": request,
            },
        )

        return Response(serializer.data)