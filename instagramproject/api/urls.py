from django.urls import include, path
from rest_framework.routers import DefaultRouter

from accounts.views import UserViewSet
from instagram.views import (
    InstagramAccountViewSet,
    PostViewSet,
    CommentViewSet,
    MessageViewSet,

)
from instagram.api import SendInstagramMessageView, SyncPostsView
from crm.views import (
    LeadStatusViewSet,
    LeadViewSet,
)

from tasks.views import TodoViewSet


router = DefaultRouter()

router.register(
    "users",
    UserViewSet,
    basename="user",
)

router.register(
    "accounts",
    InstagramAccountViewSet,
    basename="instagramaccount",
)

router.register(
    "posts",
    PostViewSet,
    basename="post",
)

router.register(
    "comments",
    CommentViewSet,
    basename="comment",
)
router.register(
    "messages",
    MessageViewSet,
    basename="message",
)
router.register(
    "statuses",
    LeadStatusViewSet,
    basename="leadstatus",
)

router.register(
    "leads",
    LeadViewSet,
    basename="lead",
)

router.register(
    "tasks",
    TodoViewSet,
    basename="todo",
)


urlpatterns = [
    path(
        "posts/sync/",
        SyncPostsView.as_view(),
        name="sync-posts",
    ),

    path(
        "send-message/",
        SendInstagramMessageView.as_view(),
        name="send-message",
    ),


    path(
        "",
        include(router.urls),
    ),
]