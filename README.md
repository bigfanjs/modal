use [bigfan modal](bigfanjs.github.io/modal-docs/) and put all your modals in one place and prevent polluting the DOM with excessive nodes.

## Installation

**using npm:**
`npm i @bigfan/modal`

**using yarn:**
`yarn add @bigfan/modal`

## The Setup

### Providing the modal context

In your application entry point, wrap your app with the `<Provider>` component and pass it your modal types.

_index.js (entry point):_

```jsx
import React from "react";
import { Provider } from "@bigfan/modal";
import App from "./App";

const types = {
  LOGIN: "LOGIN",
  SIGNUP: "SIGNUP",
  WARNING: "WARNING",
};

export default () => {
  return (
    <Provider types={types}>
      <App />
    </Provider>
  );
};
```

### Define and display your modals

Inject the `<Scene>` component somewhere in your code where you want to display your modals and then map your modal types to the actual modals. The best place to put this component is your application layout component as shown in the following example.

_Layout.js:_

```jsx
import React from "react";
import { Scene, useModal } from "@bigfan/modal";

import Login from "common/app/Login";
import Signup from "common/app/Signup";
import Warning from "common/app/Warning";

export default function Layout({ children }) {
  const {
    types: { LOGIN, SIGNUP, WARNING },
  } = useModal();

  const modals = {
    [LOGIN]: Login,
    [SIGNUP]: Signup,
    [WARNING]: Warning,
  };

  return (
    <styles.Wrapper>
      <GlobalStyles />
      <Nav />
      <div className="content">{children}</div>
      <Footer />
      <Scene modals={modals} />
    </styles.Wrapper>
  );
}
```

### Create your modal

You have to wrap each of your modals with a `<Modal>` component.

_common/app/Login.js:_

```jsx
import { Modal } from "@bigfan/modal";

export default function Login() {
  return (
    <Modal>
      <div>My login modal</div>
    </Modal>
  );
}
```

### Open modals

At any component down the tree you can open any modal. In the following example, we want to open the Login modal from Navbar component:

_NavBar.js:_

```jsx
import React from "react";
import { useModal } from "@bigfan/modal";

export default function NavBar() {
  const {
    openModal,
    modals: { LOGIN },
  } = useModal();

  return <div onClick={() => openModal(LOGIN)} />;
}
```
