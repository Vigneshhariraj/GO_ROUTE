

import requests

class PhiChatBot:
    def __init__(self):
        self.api_token = "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"
        self.api_url = "https://api-inference.huggingface.co/models/microsoft/Phi-3.5-mini-instruct"
        self.headers = {
            "Authorization": f"Bearer {self.api_token}",
            "Content-Type": "application/json"
        }
        
        self.conversation = "<|system|>\nYou are a helpful assistant for a bus routing application. You can provide information about routes, schedules, and safety tips.<|end|>\n"

    def query_huggingface(self, prompt):
        payload = {
            "inputs": prompt,
            "parameters": {"max_new_tokens": 200}
        }

        try:
            response = requests.post(self.api_url, headers=self.headers, json=payload)
            response.raise_for_status()
            output = response.json()
            
            return output[0]["generated_text"].split("<|assistant|>")[-1].strip()
        except Exception as e:
            print(f"Error querying Hugging Face API: {e}")
            return "Sorry, I'm having trouble connecting to my brain right now. Please try again later."

    def get_response(self, user_message):
       
        self.conversation += f"<|user|>\n{user_message}<|end|>\n<|assistant|>"
        
       
        assistant_reply = self.query_huggingface(self.conversation)
        
        self.conversation += f"{assistant_reply}<|end|>\n"
        
        return assistant_reply