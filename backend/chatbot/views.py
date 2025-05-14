from rest_framework.decorators import api_view
from rest_framework.response import Response
from .logic import PhiChatBot


bot = PhiChatBot()

@api_view(['POST'])
def chat_response(request):
    user_message = request.data.get('message', '')
    print("User message received:", user_message)

    reply = bot.get_response(user_message)
    return Response({"reply": reply})