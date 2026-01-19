"use client";

import { useEffect } from "react";
import { DL8VideoFormatEnum } from "../_utils/enums";

type VideoPlayerProps = {
  source: string;
  thumbnail: string;
  title: string;
  videoFormat: DL8VideoFormatEnum;
};

export default function DL8VideoPlayer({
  source,
  thumbnail,
  title,
  videoFormat,
}: VideoPlayerProps) {
  const initDelightPlayer = async function () {
    //@ts-ignore
    const supported = await navigator.xr?.isSessionSupported("immersive-vr");

    if (isPlayerInitedAlready()) return;

    const player = document.createElement("dl8-video") as HTMLVideoElement;
    player.setAttribute(
      "format",
      videoFormat ?? DL8VideoFormatEnum.STEREO_180_LR,
    );
    player.setAttribute("fps", "60");
    player.setAttribute("poster", thumbnail || "");
    player.setAttribute("title", title);
    player.setAttribute("author", "MyVR");
    player.setAttribute("author-href", "/");
    player.setAttribute("preload", "auto");

    // if (supported) {
    //     const sourceElement = document.createElement('source');
    //     sourceElement.setAttribute('src', originalSource);
    //     sourceElement.setAttribute('type', 'video/mp4');
    //     sourceElement.setAttribute('quality', '3840');
    //     player.appendChild(sourceElement);
    // }

    const sourceElement = document.createElement("source");
    sourceElement.setAttribute("src", source);
    sourceElement.setAttribute("type", "video/mp4");
    sourceElement.setAttribute("quality", "3840");

    player.appendChild(sourceElement);

    document.getElementById("player")?.appendChild(player);
  };

  const isPlayerInitedAlready = () => {
    const dl8Element = document.querySelector("dl8-video");
    return dl8Element !== null;
  };

  function changeVideoSourceListener() {
    // listen for video source change
    //@ts-ignore
    const player = document.querySelector("dl8-video");
    player?.addEventListener("sourcechange", (event) => {
      console.log("sourcechange", event);
    });
  }

  useEffect(() => {
    document.addEventListener("x-dl8-evt-ready", function () {
      // when DOM is also loaded you are good to call Delight XR element APIs
      const element = document.querySelector("dl8-video");
      const poster = element?.querySelectorAll("dl8-embed-container")[0];
      console.log("Load done");
    });
  }, []);

  useEffect(() => {
    initDelightPlayer();
  }, []);

  return <div id="player" />;
}
