from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from crm.models import Lead
from instagram.models import InstagramAccount

from .services.messages import send_instagram_message
class SendInstagramMessageView(APIView):

    def post(self, request):

        lead_id = request.data.get("lead")
        text = request.data.get("text")

        if not lead_id or not text:

            return Response(
                {
                    "error": "lead and text required",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:

            lead = Lead.objects.get(pk=lead_id)

        except Lead.DoesNotExist:

            return Response(
                status=status.HTTP_404_NOT_FOUND,
            )

        account = InstagramAccount.objects.first()

        if account is None:

            return Response(
                {
                    "error": "Instagram account not found",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        result = send_instagram_message(
            access_token=account.access_token,
            recipient_id=lead.comment.instagram_user_id,
            text=text,
        )

        return Response(result)