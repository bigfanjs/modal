import React, { Children, forwardRef } from "react";

const defaultStyles = {
  width: "90%",
  height: "70%",
  backgroundColor: "#fff",
  position: "relative",
  borderRadius: "10px",
  boxShadow: "0px 2px 30px #c5c5c5cc",
  overflow: "hidden",
  transformOrigin: "center center",
  willChange: "transform",
  pointerEvents: "auto"
};

export default function Modal({ children, className, style }) {
  return (
    <div
      onClick={e => e.stopPropagation()}
      className={className}
      style={{ ...defaultStyles, ...style }}
    >
      {children}
    </div>
  );
}
