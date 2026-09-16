from typing import TypeVar

from dotenv import load_dotenv
from google import genai
from pydantic import BaseModel

# Load environment variables, including the Gemini API key
load_dotenv()

# Create the Gemini API client
client = genai.Client()

# Generic type for any Pydantic model used as the response structure
T = TypeVar("T", bound=BaseModel)


# Analyze text and return the response as the requested Pydantic model
def analyze_text(text: str, model_class: type[T]) -> T:
    interaction = client.interactions.create(
        model="gemini-3.5-flash-lite",
        input=text,
        response_format={
            "type": "text",
            "mime_type": "application/json",
            "schema": model_class.model_json_schema(),
        },
    )
    # Validate Gemini's JSON response and convert it into a Pydantic object
    return model_class.model_validate_json(interaction.output_text)


# Analyze content from a URL using Gemini's URL Context tool
def analyze_url(url: str, model_class: type[T]) -> T:
    interaction = client.interactions.create(
        model="gemini-3.5-flash-lite",
        input=url,
        tools=[{"type": "url_context"}],
        response_format={
            "type": "text",
            "mime_type": "application/json",
            "schema": model_class.model_json_schema(),
        },
    )

    return model_class.model_validate_json(interaction.output_text)
