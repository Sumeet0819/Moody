import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";
import "./FaceExpression.css"; // Import CSS file

export default function FacialExpression({ setSongs }) {
  const [mood, setMood] = useState("");
  const videoRef = useRef();
  const MODEL_URL = "/models";

  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  async function detectMood() {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      setMood("Not able to detect, move a bit closer!");
      return;
    }

    const expressions = detections[0].expressions;
    let detectedMood = "";
    let mostExpressionValue = 0;

    for (const [expression, value] of Object.entries(expressions)) {
      if (value > mostExpressionValue) {
        mostExpressionValue = value;
        detectedMood = expression;
      }
    }

    setMood(detectedMood);

    axios
      .get(`http://localhost:3000/song?mood=${detectedMood}`)
      .then((response) => {
        setSongs(response.data.song);
      })
      .catch((err) => console.error("Error fetching songs: ", err));
  }

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    <div className="facial-container">
      <div className="facial-wrapper">
        <h2 className="facial-title">Live Mood Detection</h2>
        <div className="facial-content">
          <div className="facial-video-container">
            <video ref={videoRef} autoPlay muted className="facial-video" />
          </div>
          <div className="facial-text-container">
            <p className="facial-description">
              Welcome to MoodyPlayer! We’re here to set the perfect vibe based
              on your mood. Get ready as we read your expressions to tailor the
              music just for you. Make sure your face is clearly visible to the
              camera, and relax — face detection is starting now. Sit back,
              enjoy the experience, and let the music match your mood!
            </p>

            <button onClick={detectMood} className="facial-button">
              Detect Mood
            </button>

            <p className="facial-mood">
              Current Mood: <span>{mood}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
