import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback
} from "react";
import { motion, useAnimation } from "framer-motion";
import useActionInsideOut, { types } from "./useActionInsideOut";

import { Context } from "./Provider";

const overlayDefaultStyles = {
  position: "fixed",
  width: "100%",
  height: "100%",
  left: 0,
  top: 0,
  zIndex: 1000,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.79)"
};
const overlayVariants = {
  entering: { opacity: 1, transition: { duration: 0.4 } },
  exiting: { opacity: 0, transition: { duration: 0.4 } },
  initial: { opacity: 0 }
};

export default function Scene({ modals }) {
  const {
    closeModal,
    sys: {
      modal,
      previousModal,
      setPreviousModal,
      modalControls,
      hasNoOverlay,
      modalTimeout,
      clearModalTimeout,
      ref
    }
  } = useContext(Context);

  const isMounted = useRef(false);
  const [timer, setTimer] = useState(false);
  const controls = useAnimation();
  const handleCleanUps = useCallback(() => {
    clearModalTimeout();
    closeModal();
    setTimer(false);
    if (timer) clearTimeout(timer);
  }, [closeModal, clearModalTimeout, timer]);

  const handleModalEnter = useCallback(() => {
    if (!hasNoOverlay) controls.start("entering");
    modalControls.start("entering");
  }, [hasNoOverlay, modalControls, controls]);

  const handleModalExit = useCallback(async () => {
    if (!hasNoOverlay) controls.start("exiting");
    await modalControls.start("exiting");
    setPreviousModal(null);
    if (modalTimeout) handleCleanUps();
  }, [
    modalControls,
    hasNoOverlay,
    controls,
    modalTimeout,
    handleCleanUps,
    setPreviousModal
  ]);

  const handleTimeout = useCallback(
    () => setTimeout(() => handleModalExit(), modalTimeout),
    [modalTimeout, handleModalExit]
  );
  const isMouseOut = useActionInsideOut({
    element: ref,
    event: types.MOVE,
    disable: !previousModal || !modalTimeout
  });

  useEffect(() => {
    if (modal) setPreviousModal(modal);
    else handleModalExit();
  }, [modal, setPreviousModal, handleModalExit]);

  useEffect(() => {
    if (isMounted.current && previousModal) handleModalEnter();
    else isMounted.current = true;
  }, [previousModal, handleModalEnter]);

  useEffect(() => {
    if (!modalTimeout) return;

    if (isMouseOut && !timer) setTimer(handleTimeout());
    else if (!isMouseOut && timer) {
      clearTimeout(timer);
      setTimer(false);
    }
  }, [modalTimeout, handleTimeout, isMouseOut, timer]);

  const Modal = modals[previousModal];

  return (
    previousModal && (
      <motion.div
        animate={!hasNoOverlay && controls}
        initial={!hasNoOverlay && "initial"}
        variants={overlayVariants}
        style={{
          ...overlayDefaultStyles,
          ...(hasNoOverlay ? { backgroundColor: "transparent" } : {})
        }}
        onClick={closeModal}
        className="overlay"
      >
        <Modal />
      </motion.div>
    )
  );
}
