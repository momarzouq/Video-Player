import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import Modal from "react-modal";
import video from "./assets/video.mp4";
import FilePlayer from "react-player/file";

Modal.setAppElement("#root");

export default function VideoPlayerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const playerRef = useRef(null);

  const handleSkipForward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + 5, "seconds");
    }
  };

  const handleSkipBackward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime - 5, "seconds");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* زر لفتح الفيديو */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          background: "purple",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Play
      </button>

      {/* النافذة المنبثقة */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" }, // خلفية شفافة
          content: {
            width: "80%",
            maxWidth: "800px",
            height: "auto",
            margin: "auto",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            background: "white",
            boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
          },
        }}
      >
        {/* زر الإغلاق */}
        <button
          onClick={() => setIsOpen(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "yellow",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
            padding: "5px 10px",
            borderRadius: "50%",
          }}
        >
          ✖
        </button>

        {/* عنوان الفيديو */}
        <h2 style={{ marginBottom: "10px" }}>Free course</h2>

        {/* مشغل الفيديو */}
        <ReactPlayer
          ref={playerRef}
          url={video}
          width="100%"
          height="400px"
          controls
          pip={true}
          playing
        />

        <button
          onClick={handleSkipBackward}
          style={{
            background: "red",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            margin: "10px",
          }}
        >
          الرجوع 5 ثواني
        </button>

        <button
          onClick={handleSkipForward}
          style={{
            background: "green",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            margin: "10px",
          }}
        >
          تخطي 5 ثواني
        </button>
      </Modal>
    </div>
  );
}
