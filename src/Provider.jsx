import React, { createContext, useState, useRef, useCallback } from "react";
import { useAnimation } from "framer-motion";

import * as effects from "./effects";

export const Context = createContext({});

export default function Provider({ types, children }) {
  const ref = useRef();

  const [modal, setModal] = useState(null);
  const [previousModal, setPreviousModal] = useState(null);
  const [modalEffect, setModalEffect] = useState(null);
  const [modalProps, setModalProps] = useState({});
  const [disabled, setDisable] = useState();
  const [shouldFade, setShouldFade] = useState(true);
  const [modalTimeout, setModalTimeout] = useState(0);
  const [hasNoOverlay, setHasNoOverlay] = useState(false);
  const [modalScroll, setModalScroll] = useState(false);
  const [isSpring, setIsSpring] = useState(false);
  const [transition, setTransition] = useState({ enter: null, exit: null });

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
        speed = 0,
        openSpeed = 0,
        closeSpeed = 0,
        spring = false,
        data = {},
      } = {}
    ) => {
      const enterDuration = openSpeed || speed;
      const exitDuration = closeSpeed || speed;

      setShouldFade(fade);
      setModalTimeout(timeout);
      setModalProps(data);
      setModal(content);
      setModalEffect(effect);
      setHasNoOverlay(noOverlay);
      setModalScroll(scroll);
      setTransition({
        enter: {
          ...effect.enter.transition,
          ...(enterDuration ? { duration: enterDuration } : {}),
        },
        exit: {
          ...effect.exit.transition,
          ...(exitDuration ? { duration: exitDuration } : {}),
        },
      });
      setIsSpring(spring);
    },
    []
  );

  const closeModal = useCallback(({ fade = true } = {}) => {
    setShouldFade(fade);
    setModal(null);
  }, []);

  const disable = () => setDisable(true);
  const updateProps = (data) => setModalProps(data);
  const clearModalTimeout = () => setModalTimeout(0);

  return (
    <Context.Provider
      value={{
        types,
        openModal,
        closeModal,
        effects,
        sys: {
          modal,
          previousModal,
          setPreviousModal,
          ref,
          disabled,
          modalProps,
          disable,
          updateProps,
          shouldFade,
          modalTimeout,
          clearModalTimeout,
          hasNoOverlay,
          modalControls,
          modalEffect,
          modalScroll,
          transition,
          isSpring,
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}
