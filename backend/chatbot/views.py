# backend/chatbot/views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .logic import SimpleChatBot

bot = SimpleChatBot()

@api_view(['POST'])
def chat_response(request):
    user_message = request.data.get('message', '')
    print("User message received:", user_message)   # <-- ADD THIS LINE

    reply = bot.get_response(user_message)
    return Response({"reply": reply})

