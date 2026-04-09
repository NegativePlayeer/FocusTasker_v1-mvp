import anthropic
import sys
import os
import json
import re

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import settings
from schemas.user import UserResponse


def decompose_task(title: str, user: UserResponse):
    client = anthropic.Anthropic(api_key=settings.ANTHROPIC_KEY)
    response = client.messages.create(
        model='claude-haiku-4-5-20251001',
        max_tokens=1024,
        system=f"""You are an expert/coach in adhd, your goal is to decompose my task into smaller parts to start easier.
         User preferences: {user.preferences}.
         User struggles: {user.struggles}
         Tasks should last no longer than 10 minutes and contain only 5-7 steps and also title should not have more than 10 words.
        Return ONLY the raw JSON, no markdown, no code blocks, no explanation in this format:
        {{
          "steps": [
           {{"step": 1, "title": "...", "duration_minutes": 5}}
          ]
        }}
        """,
        messages=[{'role': 'user', 'content': f'decompose task: {title}'}]
    )
    text = response.content[0].text
    clean = re.sub(r'```json\n?|\n?```', '', text).strip()
    data = json.loads(clean)
    return data
