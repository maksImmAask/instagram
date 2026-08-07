import requests

from instagram.models import InstagramAccount, Post


def sync_posts():
    account = InstagramAccount.objects.first()

    if not account:
        raise Exception("Instagram account not found")

    url = "https://graph.instagram.com/me/media"

    params = {
        "fields": "id,caption,media_url,like_count,comments_count,timestamp",
        "access_token": account.access_token,
    }

    response = requests.get(
        url,
        params=params,
    )

    data = response.json()

    print(data)

    if "data" not in data:
        return data

    for item in data["data"]:

        Post.objects.update_or_create(
            instagram_id=item["id"],
            defaults={
                "account": account,
                "caption": item.get("caption", ""),
                "image": item.get("media_url", ""),
                "likes": item.get("like_count", 0),
                "comments_count": item.get("comments_count", 0),
                "created_at": item["timestamp"],
            },
        )

    return data