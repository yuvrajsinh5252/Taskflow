import React from "react";
import { ControllerContextType } from "../@types/Controller";

export const ControllerContext = React.createContext<ControllerContextType | null>(null);

const ControllerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = React.useState<"running" | "paused" | "finished" | "next" | "prev" | "reset">("reset");

  return (
    <ControllerContext.Provider value={{ status, setStatus }}>
      {children}
    </ControllerContext.Provider>
  );
}

export default ControllerProvider;