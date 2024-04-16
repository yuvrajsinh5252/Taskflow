export interface InputContextType {
  process: ProcessType[];
  timeQuantum: number;
  algorithm: string;
  setAlgorithm: React.Dispatch<React.SetStateAction<string>>;
  setProcessData: (data: { arrivalTime: number; burstTime: number }) => void;
  setTimeQuantum: React.Dispatch<React.SetStateAction<number>>;
}

export type ProcessType = {
  id: number;
  arrivalTime: number;
  burstTime: number;
  completionTime: number;
  turnaroundTime: number;
  waitingTime: number;
};
