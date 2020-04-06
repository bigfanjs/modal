# Usage

_index.js (root file):_

```js
import React from "react";
import { Modal, Provider } from "Modalik";
import App from "./App";

const modals = {
  LOGIN: "LOGIN",
  SIGNUP: "SIGNUP",
  WARNING: "WARNING"
};

export default function Component() {
  return (
    <Provider modals={modals}>
      <App />
    </Provider>
  );
}
```

_Layout.js (app layout):_

```js
import React from "react";
import { Modal, Context } from "Modalik";

import Login from "common/application/Login";
import Signup from "common/application/Signup";
import Warning from "common/application/Warning";

export default function Layout({ children }) {
  const {
    modals: { LOGIN, SIGNUP, WARNING }
  } = useContext(Context);

  const modals = {
    [LOGIN]: Login,
    [SIGNUP]: Signup,
    [WARNING]: Warning
  };

  return (
    <styles.Wrapper>
      <GlobalStyles />
      <Nav />
      <div className="content">{children}</div>
      <Footer />
      <Modal modals={modals} />
    </styles.Wrapper>
  );
}
```

_Login Modal (common/application/Login.js)_

```js
import styled from "styled-components";

const StyledLogin = styled.div`
  background-color: blue;
`;

export default function Login({ innerRef }) {
  return (
    <StyledLogin ref={innerRef}>
      <div>login modal</div>
    </StyledLogin>
  );
}
```

_SomeComponent.js:_

```js
import React from "react";

export default function SomeComponent() {
  const {
    openModal,
    modals: { LOGIN },
    effects: { SMASH }
  } = useContext(Context);

  const modalOptions = {
    effect: SMASH, // modal animation effect
    noOverlay: true, // no background overlay
    scroll: true, // window scroll disabled after modal is modal
    timeout: 5000, // modal auto closes after 5 seconds
    data: {} // pass data to the modal
  };

  return <div onClick={() => openModal(LOGIN, modalOptions)} />;
}
```
