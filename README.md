# 🎵 AI Mood-Based Music Recommender

An AI-powered web application that detects human emotions from facial images and recommends music playlists based on the detected mood.
The system analyzes facial expressions using **Gemini AI** and suggests suitable music to enhance or match the user's emotional state.

---

## 🚀 Features

* 📷 **Real-time Camera Capture** – Capture images directly using the browser camera
* 🖼 **Image Upload Support** – Upload photos for emotion analysis
* 🤖 **AI Emotion Detection** – Uses Gemini AI to classify facial emotions
* 🎧 **Mood-Based Music Recommendation** – Suggests YouTube playlists based on detected mood
* ⚡ **Fast Backend API** – Built with FastAPI for efficient image processing
* 🌐 **Interactive Frontend** – Simple and responsive UI using HTML, CSS, and JavaScript

---

## 🧠 How It Works

1. The user captures a photo using the camera or uploads an image.
2. The image is sent to the backend API.
3. Gemini AI analyzes the facial expression.
4. The detected emotion is classified into one of the following:

   * Angry
   * Disgust
   * Happiness
   * Sadness
   * Fear
   * Surprise
   * Neutral
5. The system recommends a YouTube music playlist based on the detected mood.

---

## 🛠 Tech Stack

**Frontend**

* HTML
* CSS
* JavaScript

**Backend**

* Python
* FastAPI

**AI / APIs**

* Gemini AI API

---

## 📂 Project Structure

```
mood-music-recommender-ai
│
├── app.py
├── index.html
├── script.js
├── design.css
├── requirements.txt
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/yourusername/mood-music-recommender-ai.git
```

### 2️⃣ Navigate to the project folder

```
cd mood-music-recommender-ai
```

### 3️⃣ Install dependencies

```
pip3 install -r requirements.txt
```

### 4️⃣ Add your API key

Create a `.env` file and add:

```
GEMINI_API_KEY=your_api_key_here
```

### 5️⃣ Run the backend server

```
python3 -m uvicorn app:app --reload
```

### 6️⃣ Run the frontend

Open `index.html` in your browser.

---

## 🎯 Future Improvements

* Real-time emotion detection from video stream
* Personalized music recommendations
* Spotify API integration
* Emotion analytics dashboard

---

## 👩‍💻 Author

**Rishitha Yellanki**

---

⭐ If you like this project, consider giving it a star!
