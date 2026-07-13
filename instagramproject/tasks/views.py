from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Todo
from .serializers import TodoSerializer


class TodoViewSet(ModelViewSet):
    queryset = Todo.objects.select_related(
        "lead",
        "assigned_to"
    )

    serializer_class = TodoSerializer

    filter_backends = [SearchFilter, OrderingFilter]

    search_fields = [
        "title",
        "description",
        "assigned_to__username",
    ]

    ordering_fields = [
        "deadline",
        "created_at",
    ]

    def get_serializer_context(self):
        return {"request": self.request}