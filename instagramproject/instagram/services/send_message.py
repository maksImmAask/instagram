from instagram.models import Message


def send_instagram_message(
    lead,
    text,
):
    message = Message.objects.create(
        lead=lead,
        sender_id="manager",
        text=text,
        is_from_instagram=False,
    )

    return message