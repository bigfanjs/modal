import React, { createContext, useState, useRef, useCallback } from "react";
import { useAnimation } from "framer-motion";

export const Context = createContext({});

export const effects = {
  POP_UP: {
    entering: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exiting: { opacity: 0, scale: 0.7, transition: { duration: 0.4 } },
    initial: { scale: 0.7 }
  },
  SLIDE_IN: {
    entering: { x: 0, transition: { duration: 0.4 } },
    exiting: { x: "105%", transition: { duration: 0.4 } },
    initial: { x: "105%" }
  }
};

export default function Provider({ modals, children }) {
  const ref = useRef();

  const [modal, setModal] = useState(null);
  const [previousModal, setPreviousModal] = useState(null);
  const [modalEffect, setModalEffect] = useState(null);
  const [props, setProps] = useState({});
  const [disabled, setDisable] = useState();
  const [shouldFade, setShouldFade] = useState(true);
  const [modalTimeout, setModalTimeout] = useState(0);
  const [hasNoOverlay, setHasNoOverlay] = useState(false);
  const [modalScroll, setModalScroll] = useState(false);

  const modalControls = useAnimation();
  const openModal = useCallback(
    (
      content,
      {
        fade = true,
        timeout = 0,
        effect = effects.POP_UP,
        noOverlay = false,
        scroll = false,
        ...data
      } = {}
    ) => {
      setShouldFade(fade);
      setModalTimeout(timeout);
      setProps(data);
      setModal(content);
      setModalEffect(effect);
      setHasNoOverlay(noOverlay);
      setModalScroll(scroll);
    },
    []
  );

  const closeModal = useCallback(({ fade = true } = {}) => {
    setShouldFade(fade);
    setModal(null);
  }, []);

  const disable = () => setDisable(true);
  const updateProps = data => setProps(data);
  const clearModalTimeout = () => setModalTimeout(0);

  return (
    <Context.Provider
      value={{
        modals,
        openModal,
        closeModal,
        effects,
        sys: {
          modal,
          previousModal,
          setPreviousModal,
          ref,
          disabled,
          props,
          disable,
          updateProps,
          shouldFade,
          modalTimeout,
          clearModalTimeout,
          hasNoOverlay,
          modalControls,
          modalEffect,
          modalScroll
        }
      }}
    >
      {children}
    </Context.Provider>
  );
}
