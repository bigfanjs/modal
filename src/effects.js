export const FADE = {
  enter: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
  initial: { opacity: 0 },
};

export const POP_UP = {
  enter: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "backOut" },
  },
  exit: { opacity: 0, scale: 0.7, transition: { duration: 0.3 } },
  initial: { scale: 0.7 },
};

export const SLIDE_IN = {
  enter: { x: 0, transition: { duration: 0.4 } },
  exit: { x: "105%", transition: { duration: 0.4 } },
  initial: { x: "105%" },
};

export const SLIDE_LEFT = {
  enter: { x: 0, transition: { duration: 0.3 } },
  exit: { x: "105%", transition: { duration: 0.15 } },
  initial: { x: "105%" },
};

export const SLIDE_RIGHT = {
  enter: { x: 0, transition: { duration: 0.2 } },
  exit: { x: "-105%", transition: { duration: 0.15 } },
  initial: { x: "-105%" },
};

export const FLIP_X = {
  enter: { rotateX: 0, transition: { duration: 0.4 } },
  exit: { rotateX: 90, transition: { duration: 0.2 } },
  initial: { transformPerspective: 700, rotateX: 90 },
};

export const FLIP_Y = {
  enter: { rotateY: 0, transition: { duration: 0.3 } },
  exit: { rotateY: 90, transition: { duration: 0.2 } },
  initial: { transformPerspective: 1000, rotateY: 90 },
};

export const ROTATE = {
  enter: { rotate: 0, transition: { duration: 0.3 } },
  exit: { rotate: 90, transition: { duration: 0.2 } },
  initial: { rotate: 90 },
};

export const SLIDE_UP = {
  enter: { y: 0, transition: { duration: 0.3 } },
  exit: { y: "105%", transition: { duration: 0.15 } },
  initial: { y: "105%" },
};

export const SLIDE_DOWN = {
  enter: { y: 0, transition: { duration: 0.2 } },
  exit: { y: "-105%", transition: { duration: 0.15 } },
  initial: { y: "-105%" },
};

export const SCALE_X = {
  enter: { scaleX: 1, transition: { duration: 0.4 } },
  exit: { scaleX: 0.5, transition: { duration: 0.2 } },
  initial: { scaleX: 0.5 },
};

export const SCALE_Y = {
  enter: { scaleY: 1, transition: { duration: 0.4 } },
  exit: { scaleY: 0.5, transition: { duration: 0.2 } },
  initial: { scaleY: 0.5 },
};
