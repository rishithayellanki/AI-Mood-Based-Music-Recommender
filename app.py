import os
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from PIL import Image
import io

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


MODEL_NAME = "gemini-2.5-flash"


VALID_EMOTIONS = ["angry", "disgust", "happiness", "sadness", "fear", "surprise", "neutral"]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    try:
        # Read image bytes
        img_bytes = await file.read()
        image = Image.open(io.BytesIO(img_bytes))

        # Ask Gemini to FIRST confirm if a face is present
        prompt = (
            "Look at the image and answer ONLY one word:\n"
            "1. If a human face is present → reply 'face'\n"
            "2. If NO human face is present → reply 'no-face'"
        )

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=[image, prompt]
        )

        face_status = response.text.strip().lower()

        # ------------------------
        # CASE 1: NO FACE DETECTED
        # ------------------------
        if "no-face" in face_status:
            return {"emotion": "no_face_detected"}

        # ------------------------
        # CASE 2: FACE FOUND → classify emotion
        # ------------------------
        emotion_prompt = (
            "A human face is detected. Now classify the emotion into EXACTLY one: "
            "angry, disgust, happiness, sadness, fear, surprise, neutral. "
            "Respond with ONLY the emotion word."
        )

        emotion_res = client.models.generate_content(
            model=MODEL_NAME,
            contents=[image, emotion_prompt]
        )

        emotion = emotion_res.text.strip().lower()

        if emotion not in VALID_EMOTIONS:
            emotion = "neutral"

        return {"emotion": emotion}

    except Exception as e:
        return {"error": str(e)}
