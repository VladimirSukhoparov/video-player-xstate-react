import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  paused: boolean;
}

export const VideoPlayer = ({paused}: VideoPlayerProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const src =
    "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.play();
    }
  }, []);

   useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (paused) {
      video.pause();
    } else {
      video.play().catch(() => {}); 
    }
  }, [paused]);


  return <video ref={ref} autoPlay style={{ width: "100%", height: "100%" }} preload="auto"/>;
};
