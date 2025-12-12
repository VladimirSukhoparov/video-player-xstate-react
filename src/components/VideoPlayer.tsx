import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  state: "playing" | "paused" | "closed";
}

export const VideoPlayer = ({ state }: VideoPlayerProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const src =
    "https://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8";

  console.log(state);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (state === "playing") video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      if (state === "playing") video.play();
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.stopLoad();
        hlsRef.current.detachMedia();
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (state === "playing") {
      video.play().catch(() => {});
    }

    if (state === "paused" || state === "closed") {
      video.pause();
      if (hlsRef.current) {
        hlsRef.current.stopLoad();
      }
    }

  }, [state]);

  return (
    <video
      ref={ref}
      autoPlay
      style={{ width: "100%", height: "100%" }}
      preload="auto"
    />
  );
};
