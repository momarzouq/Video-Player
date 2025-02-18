import React from "react";
import ReactPlayer from "react-player";
import video from "./assets/video.mp4";
function VideoPlayer() {
  return (
    <>
      <ReactPlayer url={video} width={720} height={480} controls />
    </>
  );
}

export default VideoPlayer;
