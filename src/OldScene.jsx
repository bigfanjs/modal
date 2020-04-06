import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback
} from "react";
import { Motion, spring } from "react-motion";
import { Context as ModalContext } from "./Provider";
import useActionInsideOut, { types } from "./useActionInsideOut";

function getStyles({ style, overlay, config, isDefault, noOverlay }) {
  const object = { ...style, ...(noOverlay ? {} : overlay) };

  return Object.keys(object).reduce(
    (sum, key) => ({
      ...sum,
      [key]: isDefault ? object[key] : spring(object[key], config)
    }),
    {}
  );
}

const config = { stiffness: 85, damping: 14, precision: 0.3 };
const STATES = {
  ENTERING: "entering",
  ENTERED: "entered",
  EXITING: "exiting",
  EXITED: "exited"
};

const { ENTERING, ENTERED, EXITING, EXITED } = STATES;

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

const Modal = ({
  onTransitionEnd,
  onMove,
  modal,
  state,
  data,
  motion,
  modals,
  className
}) => {
  const modalRef = useRef();
  const { closeModal, disabled, shouldFade, ModalTimeout, props } = useContext(
    ModalContext
  );

  const ModalContent = modals[modal];
  const { start, end } = motion || {};
  const { scroll, noOverlay } = props;

  const modalStart = start || { scale: 0.7 };
  const modalEnd = end || { scale: 1 };

  const defaultStyle = {};
  const overlayStart = { overlayOpacity: 0 };
  const overlayEnd = { overlayOpacity: 1 };

  defaultStyle[ENTERING] = defaultStyle[EXITED] = getStyles({
    style: modalStart,
    overlay: overlayStart,
    isDefault: true,
    config,
    noOverlay
  });

  defaultStyle[ENTERED] = defaultStyle[EXITING] = getStyles({
    style: modalEnd,
    overlay: overlayEnd,
    isDefault: true,
    config,
    noOverlay
  });

  const style = {
    [ENTERING]: getStyles({
      style: modalEnd,
      overlay: overlayEnd,
      config,
      noOverlay
    }),
    [EXITING]: getStyles({
      style: modalStart,
      overlay: overlayStart,
      config,
      noOverlay
    })
  };

  useActionInsideOut({
    element: modalRef,
    handler: onMove,
    event: types.MOVE,
    disable: !modal || disabled || !ModalTimeout,
    runOnload: true
  });

  useActionInsideOut({
    element: modalRef,
    handler: isOut => isOut && closeModal(),
    event: types.CLICK,
    disable: !modal || disabled || !ModalTimeout
  });

  useEffect(() => {
    const bodyStyle = document.body.style;

    if (!scroll) bodyStyle.overflowY = "hidden";

    return () => {
      if (!scroll) bodyStyle.overflowY = "scroll";
    };
  });

  return (
    <>
      <Motion
        defaultStyle={defaultStyle[state]}
        style={style[state] || {}}
        key={modal}
        onRest={onTransitionEnd}
      >
        {({ overlayOpacity, scale, ...rest }) => (
          <div
            className="overlay"
            onClick={closeModal}
            noOverlay={noOverlay}
            shouldFade={shouldFade}
            style={{ ...overlayDefaultStyles, opacity: overlayOpacity }}
          >
            <ModalContent motion={{ transform: `scale(${scale})`, ...rest }} />
          </div>
        )}
      </Motion>
    </>
  );
};

export default ({ className, modals }) => {
  const {
    modal: OriginalModal,
    shouldFade,
    modalTimeout,
    clearModalTimeout,
    closeModal,
    props,
    style
  } = useContext(ModalContext);

  const [modal, setModal] = useState(null);
  const [data, setData] = useState(null);
  const [motion, setMotion] = useState(null);
  const [state, setState] = useState(EXITED);
  const [isPrevOut, setIsPrevOut] = useState(false);
  const [isCurrOut, setisCurrOut] = useState(false);
  const [timer, setTimer] = useState(false);

  const handleTransitionEnd = () => {
    if (state === EXITING) {
      setModal(null);
      setData(null);
      setMotion(null);
      setState(EXITED);
    } else if (state === ENTERING) setState(ENTERED);
  };
  const handleTimeout = useCallback(
    () => setTimeout(() => setState(EXITING), modalTimeout),
    [modalTimeout]
  );
  const handleMove = useCallback(isOut => setisCurrOut(isOut), []);

  // handle modal entering/exiting
  useEffect(() => {
    if (!shouldFade) return;

    if (OriginalModal && modal) clearTimeout(timer);

    if (OriginalModal) {
      setModal(OriginalModal);
      setData(props && props.data);
      setMotion(style);
      setState(ENTERING);
    } else if (modal) {
      setState(EXITING);
    }
  }, [OriginalModal]); // eslint-disable-line

  // handle modal timeout
  useEffect(() => {
    if (!shouldFade || !modalTimeout) return;

    if (isPrevOut) setTimer(handleTimeout());
    else clearTimeout(timer);
  }, [modalTimeout, isPrevOut]); // eslint-disable-line

  // handle mouse in/out
  useEffect(() => {
    if (isCurrOut && !isPrevOut) setIsPrevOut(true);
    else if (!isCurrOut && isPrevOut) setIsPrevOut(false);
  }, [isCurrOut, isPrevOut]);

  if (!shouldFade) return OriginalModal && <Modal modal={OriginalModal} />;

  // clean ups
  useEffect(() => {
    if (!modal && state === EXITING) {
      clearModalTimeout();
      closeModal();
      clearTimeout(timer);
    }
  }, [modal]); // eslint-disable-line

  return (
    modal && (
      <Modal
        state={state}
        onTransitionEnd={handleTransitionEnd}
        onMove={handleMove}
        modal={modal}
        data={data}
        motion={motion}
        className={className}
        modals={modals}
      />
    )
  );
};
