import create from "zustand";
import clamp from "lodash-es/clamp";
import pingSound from "/medias/ping.mp3";

const ping = new Audio(pingSound);

export const useStore = create((set) => ({
  api: {
    pong(velocity) {
      ping.currentTime = 0;
      ping.volume = clamp(velocity / 20, 0, 1);
      ping.play();
      if (velocity > 4) set((state) => ({ count: state.count + 1 }));
    },
    reset: (welcome) =>
      set((state) => ({ count: welcome ? state.count : 0, welcome })),
  },
  count: 0,
  welcome: true,
}));
