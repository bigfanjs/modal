import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
  useMemo
} from "react";
import { motion, useAnimation } from "framer-motion";
import useActionInsideOut, { types } from "./useActionInsideOut";
import { Context } from "./Provider";
import * as effects from "./effects"

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
  backgroundColor: "rgba(0, 0, 0, 0.79)",
  willChange: "opacity",
};
const springConfigs = { type: "spring", stiffness: 90, damping: 13 };

export default function Scene({ modals }) {
  const {
    closeModal,
    sys: {
      modal,
      previousModal,
      setPreviousModal,
      modalControls,
      hasNoOverlay,
      modalScroll,
      modalTimeout,
      clearModalTimeout,
      ref,
      duration,
      isSpring,
      modalProps,
      modalEffect
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
    // overlay:
    if (!hasNoOverlay) controls.start("enter", { duration: duration.enter });

    // modal:
    modalControls.start("enter", {
      ...(isSpring ? springConfigs : { duration: duration.enter })
    });
  }, [hasNoOverlay, modalControls, controls, isSpring, duration.enter]);

  const handleModalExit = useCallback(async () => {
    if (!hasNoOverlay) controls.start("exit", { duration: duration.exit });
    await modalControls.start("exit", { duration: duration.exit });
    setPreviousModal(null);
    if (modalTimeout) handleCleanUps();
  }, [
    modalControls,
    hasNoOverlay,
    controls,
    modalTimeout,
    handleCleanUps,
    setPreviousModal,
    duration.exit
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

  useEffect(() => {
    const bodyStyle = document.body.style;

    if (!modalScroll) bodyStyle.overflowY = "hidden";
    if (!modal && !previousModal) bodyStyle.overflowY = "scroll";
  }, [modal, modalScroll, previousModal]);

  const Modal = modals[previousModal];
  const overlayVariants = effects.FADE

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
        <Modal {...modalProps} />
      </motion.div>
    )
  );
}
