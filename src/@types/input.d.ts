export interface InputContextType {
  process: ProcessType[];
  timeQuantum: number;
  algorithm: string;
  setAlgorithm: React.Dispatch<React.SetStateAction<string>>;
  setProcessData: (data: ProcessInfo) => void;
  setTimeQuantum: React.Dispatch<React.SetStateAction<number>>;
}
export interface ProcessInfo {
  arrivalTime: number;
  burstTime: number;
  completionTime: number;
  turnaroundTime: number;
  waitingTime: number;
}

export type ProcessType = {
  id: number;
  arrivalTime: number;
  burstTime: number;
  completionTime: number;
  turnaroundTime: number;
  waitingTime: number;
};
