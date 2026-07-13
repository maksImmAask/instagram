from rest_framework import serializers
from .models import User


class UserListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        users = [User(**item) for item in validated_data]
        return User.objects.bulk_create(users)


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        exclude = ["password", "groups", "user_permissions"]
        list_serializer_class = UserListSerializer
        extra_kwargs = {
            "url": {"view_name": "user-detail"},
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        password = validated_data.pop("password")

        user = User(**validated_data)
        user.set_password(password)
        user.save()

        return user
from rest_framework import serializers
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "phone",
            "role",
        ]

    def create(self, validated_data):
        password = validated_data.pop("password")

        user = User(**validated_data)
        user.set_password(password)
        user.save()

        return user


class MeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = [
            "password",
            "groups",
            "user_permissions",
        ]