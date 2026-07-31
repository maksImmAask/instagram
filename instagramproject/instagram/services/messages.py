import requests


def send_instagram_message(
    access_token: str,
    recipient_id: str,
    text: str,
):

    url = "https://graph.instagram.com/v26.0/me/messages"

    payload = {
        "recipient": {
            "id": recipient_id,
        },
        "message": {
            "text": text,
        },
        "messaging_type": "RESPONSE",
        "access_token": access_token,
    }

    response = requests.post(
        url,
        json=payload,
    )

    return response.json()