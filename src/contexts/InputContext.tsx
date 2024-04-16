import React from 'react';
import { InputContextType, ProcessType } from '../@types/input';

export const InputContext = React.createContext<InputContextType | null>(null);

const InputProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [process, setProcess] = React.useState<ProcessType[]>([]);
  const [timeQuantum, setTimeQuantum] = React.useState(0);
  const [algorithm, setAlgorithm] = React.useState('');

  const setProcessData = ({
    arrivalTime,
    burstTime,
  }: {
    arrivalTime: number;
    burstTime: number;
  }) => {
    const data = process;
    data.push({
      id: process.length + 1,
      arrivalTime,
      burstTime,
      completionTime: 0,
      turnaroundTime: 0,
      waitingTime: 0,
    });

    setProcess(data);
  }


  return (
    <InputContext.Provider value={{ process, timeQuantum, algorithm, setAlgorithm, setProcessData, setTimeQuantum }}>
      {children}
    </InputContext.Provider>
  );
};

export default InputProvider;

