import { useEffect, useState, useCallback } from "react";

export const types = {
  CLICK: "mousedown",
  MOVE: "mousemove",
};

export default function useActionInsideOut({
  element,
  handler,
  event = types.CLICK,
  runOnload = false,
  disable,
}) {
  const [isOut, setPosition] = useState(true);
  const handleActionInsideOut = useCallback(
    (event, isTarget) => {
      if (disable) return;

      if (
        element &&
        !element.current.contains(isTarget ? event : event.target)
      ) {
        setPosition(true);
        handler && handler(true);
      } else {
        setPosition(false);
        handler && handler(false);
      }
    },
    [handler, disable, element]
  );

  useEffect(() => {
    if (disable) return;

    if (runOnload) handleActionInsideOut(document, true);

    document.addEventListener(event, handleActionInsideOut, false);

    return () => {
      document.removeEventListener(event, handleActionInsideOut, false);
    };
  }, [disable, event, handleActionInsideOut, runOnload]);

  return isOut;
}
