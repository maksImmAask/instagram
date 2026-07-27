from django.contrib import admin

from .models import (
    InstagramAccount,
    Post,
    Comment,
)

admin.site.register(InstagramAccount)

admin.site.register(Post)

admin.site.register(Comment)
