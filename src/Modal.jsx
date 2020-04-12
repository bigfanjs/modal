import React, { useContext } from "react";
import { motion } from "framer-motion";

import { Context } from "./Provider";

const defaultStyles = {
  position: "relative",
  transformOrigin: "center center",
  willChange: "transform",
  pointerEvents: "auto"
};

export default function Modal({ children, className, style }) {
  const {
    sys: { ref, modalControls, modalEffect }
  } = useContext(Context);

  return (
    <motion.div
      ref={ref}
      animate={modalControls}
      variants={modalEffect}
      initial="initial"
      onClick={e => e.stopPropagation()}
      className={className}
      style={{ ...defaultStyles, ...style }}
    >
      {children}
    </motion.div>
  );
}
