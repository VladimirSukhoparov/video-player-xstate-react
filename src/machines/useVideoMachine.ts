import { useMachine } from "@xstate/react";
import { videoMachine } from "./videoMachine";

export const useVideoMachine = () => {
  const [state, send, actorRef] = useMachine(videoMachine);
  
  return {
    state,
    send,
    actorRef,
    isClosed: state.matches("closed"),
    isPlaying: state.matches("playing"),
    isPaused: state.matches("paused"),
    width: state.context.width,
  };
};