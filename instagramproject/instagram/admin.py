from django.contrib import admin

from .models import (
    InstagramAccount,
    Post,
    Comment,
)
from .models import Message

admin.site.register(InstagramAccount)

admin.site.register(Post)

admin.site.register(Comment)
admin.site.register(Message)