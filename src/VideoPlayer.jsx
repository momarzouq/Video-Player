import React from "react";
import video from "./assets/video.mp4";
import poster from './assets/1720475380433.jpg';

export default function VideoPlayer() {
  console.log("Poster Path:", poster); 

  return (
    <video width="720" height="420"  controls autoPlay poster={poster} style={{ backgroundColor: "black" }}>
      <source src={video} type="video/mp4" />
    </video>
  );
}
