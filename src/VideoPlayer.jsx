import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import Modal from "react-modal";
import video from "./assets/video.mp4";
import { CircleX, SkipBack, SkipForward } from "lucide-react";

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
    <div className="text-center">
      {/* زر لفتح الفيديو */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-purple-500 text-white py-2 px-4 rounded-lg cursor-pointer"
      >
        Play
      </button>

      {/* النافذة المنبثقة */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        contentLabel="Video Player Modal"
      >
        <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-4xl relative">
          {/* زر الإغلاق */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 bg-yellow-400 rounded-full p-2 cursor-pointer"
          >
            <CircleX />
          </button>

          <h2 className="mb-2">Free course</h2>

          <ReactPlayer
            ref={playerRef}
            url={video}
            width="100%"
            height="400px"
            controls
            pip={true}
            playing
          />

          <div className="mt-4">
            <button
              onClick={handleSkipBackward}
              className="bg-gray-200 text-black py-2 px-4 rounded-lg cursor-pointer mx-2"
            >
              <SkipBack />
            </button>

            <button
              onClick={handleSkipForward}
              className="bg-gray-200 text-black py-2 px-4 rounded-lg cursor-pointer mx-2"
            >
              <SkipForward />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
