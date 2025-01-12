import React from "react";
import { ControllerContextType } from "../@types/Controller";

export const ControllerContext =
  React.createContext<ControllerContextType | null>(null);

const ControllerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = React.useState<
    "running" | "paused" | "finished" | "next" | "prev" | "reset" | "clear"
  >("reset");
  const [speed, setSpeed] = React.useState(50);

  return (
    <ControllerContext.Provider value={{ status, setStatus, speed, setSpeed }}>
      {children}
    </ControllerContext.Provider>
  );
};

export default ControllerProvider;
