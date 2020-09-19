import { useContext } from "react";

import { Context } from "./Provider";

export default function useModalik() {
  const context = useContext(Context);

  return context;
}
