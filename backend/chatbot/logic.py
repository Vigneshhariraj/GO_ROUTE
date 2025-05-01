# backend/chatbot/logic.py

import random

class SimpleChatBot:
    def __init__(self):
        self.responses = {
            "hi": "Hello! How can I help you today?",
            "hello": "Hi there! What can I do for you?",
            "how are you": "I'm doing great, thanks for asking!",
            "help": "You can ask me about bus routes, schedules, or send an SOS if needed.",
            "bye": "Goodbye! Have a safe journey."
        }

    def get_response(self, user_message):
        user_message = user_message.lower()

        for key in self.responses:
            if key in user_message:
                return self.responses[key]

        return random.choice([
            "I'm not sure I understand. Can you rephrase?",
            "Sorry, I don't have information about that yet.",
            "Could you ask me something else?"
        ])
