import React, { useContext, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
// import useActionInsideOut from "./useActionInsideOut";

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

export default function Scene({ modals }) {
  const {
    closeModal,
    sys: { modal, previousModal, setPreviousModal, modalControls, overlay }
  } = useContext(Context);

  const isMounted = useRef(false);

  const controls = useAnimation();

  // handle modal entering/exiting
  useEffect(() => {
    if (modal) setPreviousModal(modal);
    else {
      controls.start("exiting");
      modalControls.start("exiting");
    }
  }, [modal, controls, modalControls, setPreviousModal]);

  useEffect(() => {
    if (isMounted.current) {
      if (previousModal) {
        controls.start("entering");
        modalControls.start("entering");
      }
    } else isMounted.current = true;
  }, [previousModal, controls, modalControls]);

  // useActionInsideOut({
  //   element: ref,
  //   handler: onMove,
  //   event: types.MOVE,
  //   disable: !previousModal || disabled || !modalTimeout,
  //   runOnload: true
  // });

  const Modal = modals[previousModal];

  const overlayVariants = {
    entering: { opacity: 1, transition: { duration: 0.4 } },
    exiting: { opacity: 0, transition: { duration: 0.4 } },
    initial: { opacity: 0 }
  };

  return (
    previousModal && (
      <motion.div
        animate={!overlay && controls}
        initial={!overlay && "initial"}
        variants={overlayVariants}
        style={{
          ...overlayDefaultStyles,
          ...(overlay ? { backgroundColor: "transparent" } : {})
        }}
        onClick={closeModal}
        className="overlay"
      >
        <Modal />
      </motion.div>
    )
  );
}
