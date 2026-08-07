import requests

from instagram.models import Message


def send_instagram_message(
    lead,
    text,
):
    account = lead.comment.post.account

    url = "https://graph.facebook.com/v26.0/me/messages"

    print("=" * 60)
    print("ACCESS TOKEN:")
    print(repr(account.access_token))
    print("=" * 60)

    print("RECIPIENT:")
    print(repr(lead.comment.instagram_user_id))
    print("=" * 60)

    response = requests.post(
        url,
        params={
            "access_token": account.access_token,
        },
        json={
            "recipient": {
                "id": lead.comment.instagram_user_id,
            },
            "message": {
                "text": text,
            },
            "messaging_type": "RESPONSE",
        },
    )

    print("=" * 60)
    print("STATUS:", response.status_code)
    print("BODY:")
    print(response.text)
    print("=" * 60)

    data = response.json()

    if response.status_code == 200:

        message = Message.objects.create(
            lead=lead,
            sender_id="manager",
            text=text,
            is_from_instagram=False,
            instagram_message_id=data.get("message_id", ""),
        )

        return message

    raise Exception(data)