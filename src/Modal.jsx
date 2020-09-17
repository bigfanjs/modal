import React, { useContext } from "react";
import { motion } from "framer-motion";

import { Context } from "./Provider";

const defaultStyles = {
  position: "relative",
  transformOrigin: "center center",
  pointerEvents: "auto",
};

export default function Modal({ children, className, style }) {
  const {
    sys: { ref, modalControls, modalEffect },
  } = useContext(Context);

  const modalVariants =
    modalEffect && modalEffect.modal ? modalEffect.modal : modalEffect;

  return (
    <motion.div
      ref={ref}
      initial="initial"
      variants={modalVariants}
      animate={modalControls}
      onClick={(e) => e.stopPropagation()}
      className={`modal${className ? ` ${className}` : ""}`}
      style={{ ...defaultStyles, ...style }}
    >
      {children}
    </motion.div>
  );
}
