import { createMachine } from "xstate";

createMachine({
  id: "player",
  initial: "normal",
  states: {
    normal: {
        entry:"playVideo",
      meta: { title: "Normal State" },
      on: {
        TOGGLE_MINI: "mini",
        TOGGLE_FULL: "full",
      },
    },
    mini: {
        entry:"playVideo",
      meta: { title: "Mini State" },
        on: {TOGGLE_NORMAL: "normal"}
    },
    full: {
        entry:"playVideo",
      meta: { title: "FullScreen State" },
      on: {TOGGLE_NORMAL: "normal"}
    },
  },
});
