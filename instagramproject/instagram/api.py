from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services.posts import sync_posts
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

        try:
            message = send_instagram_message(
                lead,
                text,
            )

            return Response(
                {
                    "success": True,
                    "message_id": message.id, # type: ignore
                }
            )

        except Exception as e:

            return Response(
                {
                    "success": False,
                    "error": str(e),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class SyncPostsView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        data = sync_posts()

        return Response(data)