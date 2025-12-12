import {  assign, setup } from "xstate";

export interface VideoContext {
  width: 'default' | 'mini';
}

export type VideoEvent =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "TOGGLE_PAUSE" }
  | { type: "SET_WIDTH"; width: 'default' | 'mini' };


function isSetWidthEvent(event: unknown): event is Extract<VideoEvent, { type: "SET_WIDTH" }> {
  if (typeof event !== 'object' || event === null) return false;
  
  const e = event as Record<string, unknown>;
  
  if (e.type !== "SET_WIDTH") return false;
  
  return e.width === 'mini' || e.width === 'default';
}
export const videoMachine = setup({
  types: {
    context: {} as VideoContext,
    events: {} as VideoEvent,
  },
  actions: {
    setWidth: assign({
      width: ({ context, event }) => 
        isSetWidthEvent(event) ? event.width : context.width,
    }),
  },
}).createMachine({
  id: "video",
  initial: "closed",
  context: {
    width: 'default',
  },
  states: {
    closed: {
      on: {
        OPEN: "playing",
      },
    },
    playing: {
      on: {
        CLOSE: "closed",
        TOGGLE_PAUSE: "paused",
        SET_WIDTH: { actions: "setWidth" },
      },
    },
    paused: {
      on: {
        CLOSE: "closed",
        TOGGLE_PAUSE: "playing",
        SET_WIDTH: { actions: "setWidth" },
      },
    },
  },
});