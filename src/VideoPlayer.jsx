import React from "react";
import ReactPlayer from "react-player";
import video from './assets/video-test.mp4'
export default function VideoComponent() {
  return (
    <ReactPlayer
      url={video} 
      controls
      width="720px"
      height="420px"
    />
  );
}
