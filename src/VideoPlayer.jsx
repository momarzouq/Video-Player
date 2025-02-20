import { useRef, useState, useEffect } from "react";
import video from "./assets/video.mp4";
import thumbnile from "./assets/thumbnile.jpg";
import { FaPlay, FaPause, FaCog, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        setDuration(videoRef.current.duration);
      };

      videoRef.current.ontimeupdate = () => {
        setCurrentTime(videoRef.current.currentTime);
      };
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
        setShowControls(false);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowControls(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changePlaybackRate = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
      setShowSettings(false);
    }
  };

  const handleSeek = (event) => {
    if (videoRef.current) {
      const newTime = event.target.value;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="relative mx-auto w-[720px] h-[480px] bg-black">
      {/* مشغل الفيديو */}
      <video
        ref={videoRef}
        className="video-js rounded-lg w-full h-full"
        controls={false}
        preload="auto"
        poster={thumbnile}
        onClick={togglePlay}
        onMouseMove={() => setShowControls(true)}
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* زر التشغيل/الإيقاف */}
      {showControls && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        >
          {isPlaying ? (
            <FaPause className="absolute left-4 bottom-6 text-white text-xl cursor-pointer" />
          ) : (
            <span className="bg-violet-500 py-2 px-2 text-center">
              <FaPlay className="text-white text-2xl cursor-pointer" />
            </span>
          )}
        </button>
      )}

      {/* شريط التقدم (Progress Bar) */}
      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleSeek}
        className="absolute bottom-16 left-4 w-[95%] h-1 bg-gray-700 rounded-lg cursor-pointer appearance-none"
      />

      {/* مدة الفيديو والوقت الحالي */}
      <div className="absolute bottom-6 left-12 text-white text-sm">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>

      {/* زر الإعدادات */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"
        >
          <FaCog className="text-white text-xl" />
        </button>

        {/* قائمة الإعدادات */}
        {showSettings && (
          <div className="absolute bottom-12 left-0 bg-gray-900 text-white p-3 rounded-lg shadow-lg w-40">
            <h4 className="text-sm font-semibold mb-2">Playback Speed</h4>
            {[0.5, 1, 1.5, 2].map((rate) => (
              <button
                key={rate}
                onClick={() => changePlaybackRate(rate)}
                className={`block w-full text-left px-3 py-1 rounded hover:bg-gray-700 ${
                  playbackRate === rate ? "bg-gray-700" : ""
                }`}
              >
                {rate}x
              </button>
            ))}

            <h4 className="text-sm font-semibold mt-3 mb-2">Audio</h4>
            <button
              onClick={toggleMute}
              className="flex items-center gap-2 px-3 py-1 rounded w-full hover:bg-gray-700"
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              {isMuted ? "Unmute" : "Mute"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
