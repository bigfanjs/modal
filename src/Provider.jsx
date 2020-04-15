import React, { createContext, useState, useRef, useCallback } from "react";
import { useAnimation } from "framer-motion";

import * as effects from "./effects";

export const Context = createContext({});

export default function Provider({ modals, children }) {
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
  const [duration, setDuration] = useState(false);
  const [isSpring, setIsSpring] = useState(false);

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
        speed = 0.4,
        spring = false,
        data = {}
      } = {}
    ) => {
      setShouldFade(fade);
      setModalTimeout(timeout);
      setModalProps(data);
      setModal(content);
      setModalEffect(effect);
      setHasNoOverlay(noOverlay);
      setModalScroll(scroll);
      setDuration(speed);
      setIsSpring(spring);
    },
    []
  );

  const closeModal = useCallback(({ fade = true } = {}) => {
    setShouldFade(fade);
    setModal(null);
  }, []);

  const disable = () => setDisable(true);
  const updateProps = data => setModalProps(data);
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
          duration,
          isSpring
        }
      }}
    >
      {children}
    </Context.Provider>
  );
}
