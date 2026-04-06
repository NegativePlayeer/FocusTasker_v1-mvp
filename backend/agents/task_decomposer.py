import anthropic
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import settings
import json
import re

def decompose_task(title: str):
    client = anthropic.Anthropic(api_key=settings.ANTHROPIC_KEY)
    response = client.messages.create(
        model='claude-haiku-4-5-20251001',
        max_tokens=1024,
        system="""You are an expert/coach in adhd, your goal is to decompose my task into smaller parts to start easier. I am a student who has adhd and needs this decomposition to get ready with the task as fast as possible. Tasks should last no longer than 10 minutes and contain only 5-7 steps and also title should not have more than 10 words.

        Return ONLY the raw JSON, no markdown, no code blocks, no explanation in this format:
        {
          "steps": [
            {"step": 1, "title": "...", "duration_minutes": 5}
          ]
        }
        """,
        messages=[
            {'role': 'user', 'content': f'decompose task: {title}'}
        ]
    )

    text = response.content[0].text

    clean = re.sub(r'```json\n?|\n?```', '', text).strip()
    data = json.loads(clean)

    return data

