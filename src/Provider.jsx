import React, { createContext, useState } from "react";

export const Context = createContext({});

export default function Provider({ modals, children }) {
  const [modal, setModal] = useState(null);
  const [props, setProps] = useState({});
  const [disabled, setDisable] = useState();
  const [shouldFade, setShouldFade] = useState(true);
  const [modalTimeout, setModalTimeout] = useState(0);
  const [modalStyle, setmodalStyle] = useState(null);

  const openModal = (
    content,
    { fade = true, timeout = 0, style, ...data } = {}
  ) => {
    setShouldFade(fade);
    setModalTimeout(timeout);
    setProps(data);
    setmodalStyle(style);
    setModal(content);
  };

  const closeModal = ({ fade = true } = {}) => {
    setShouldFade(fade);
    setModal(null);
  };

  const disable = () => setDisable(true);
  const updateProps = data => setProps(data);
  const clearModalTimeout = () => setModalTimeout(0);

  return (
    <Context.Provider
      value={{
        modals,
        modal,
        disabled,
        props,
        openModal,
        closeModal,
        disable,
        updateProps,
        shouldFade,
        modalTimeout,
        clearModalTimeout,
        modalStyle
      }}
    >
      {children}
    </Context.Provider>
  );
}
