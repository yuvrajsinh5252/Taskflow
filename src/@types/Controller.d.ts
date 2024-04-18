export type ControllerContextType = {
  status: string;
  setStatus: React.Dispatch<
    React.SetStateAction<
      "running" | "paused" | "finished" | "next" | "prev" | "reset" | "clear"
    >
  >;
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
};
