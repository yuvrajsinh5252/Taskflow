import React from 'react';
import { InputContextType, ProcessInfo, ProcessType } from '../@types/input';

export const InputContext = React.createContext<InputContextType | null>(null);

const InputProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [process, setProcess] = React.useState<ProcessType[]>([]);
  const [timeQuantum, setTimeQuantum] = React.useState(0);
  const [algorithm, setAlgorithm] = React.useState('');

  const setProcessData = ({ arrivalTime, burstTime, completionTime, turnaroundTime, waitingTime }: ProcessInfo) => {
    setProcess(previousData => [
      ...previousData,
      {
        id: previousData.length + 1,
        arrivalTime,
        burstTime,
        completionTime,
        turnaroundTime,
        waitingTime,
      }
    ]);
  };

  const clearProcessData = () => setProcess([]);

  return (
    <InputContext.Provider value={{ process, timeQuantum, algorithm, setAlgorithm, setProcessData, setTimeQuantum, clearProcessData }}>
      {children}
    </InputContext.Provider>
  );
};

export default InputProvider;

