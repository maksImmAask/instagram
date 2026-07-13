from rest_framework import serializers
from .models import Todo


class TodoListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        todos = [Todo(**item) for item in validated_data]
        return Todo.objects.bulk_create(todos)


class TodoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"
        list_serializer_class = TodoListSerializer
        extra_kwargs = {
            "url": {"view_name": "todo-detail"}
        }