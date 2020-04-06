import React, { useState, useContext, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

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
  backgroundColor: "rgba(255, 255, 255, 0.79)",
  opacity: 0
};

export default function Scene({ modals }) {
  const {
    modal,
    modalTimeout,
    clearModalTimeout,
    closeModal,
    props,
    style
  } = useContext(Context);

  const isMounted = useRef(false);

  const [previousModal, setPreviousModal] = useState(null);
  const [isPreviousOut, setIsPreviousOut] = useState(false);
  const [isCurrentOut, setIsCurrentOut] = useState(false);
  const [timer, setTimer] = useState(false);

  const controls = useAnimation();

  const handleAnimationComplete = () => {
    if (!modal) setPreviousModal(null);
  };

  // handle modal entering/exiting
  useEffect(() => {
    // if (modal && previousModal) clearTimeout(timer);

    if (modal) setPreviousModal(modal);
    else controls.start({ opacity: 0, transition: { duration: 1 } });
  }, [modal, controls]);

  useEffect(() => {
    if (isMounted.current) {
      console.log("FUCK!", previousModal);
      if (previousModal) {
        controls.start({ opacity: 1, transition: { duration: 1 } });
      } else {
        controls.start({ opacity: 0, transition: { duration: 1 } });
      }
    } else isMounted.current = true;
  }, [previousModal, controls]);

  return (
    previousModal && (
      <motion.div
        animate={controls}
        onAnimationComplete={handleAnimationComplete}
        style={overlayDefaultStyles}
        onClick={() => {
          console.log("pfff!");
          closeModal();
        }}
        className="overlay"
      >
        <div />
      </motion.div>
    )
  );
}
