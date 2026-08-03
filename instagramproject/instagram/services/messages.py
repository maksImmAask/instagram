import requests


def send_instagram_message(
    access_token: str,
    recipient_id: str,
    text: str,
):
    url = "https://graph.facebook.com/v26.0/me/messages"

    response = requests.post(
        url,
        params={
            "access_token": access_token,
        },
        json={
            "recipient": {
                "id": recipient_id,
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

    try:
        return response.json()
    except Exception:
        return {
            "status_code": response.status_code,
            "text": response.text,
        }