import React from "react";
import { InputContext } from "../contexts/InputContext";
import { InputContextType } from "../@types/input";

function Input() {
  const [Qauntum, setQauntum] = React.useState(false);
  const { setProcessData, setAlgorithm, setTimeQuantum } = React.useContext(InputContext) as InputContextType;

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const arrival = e.currentTarget['arrival'].value;
    const burst = e.currentTarget['burst'].value;

    const ProcessData = Array.from({ length: arrival.split(' ').length }, (_, i) => ({
      arrivalTime: parseInt(arrival.split(' ')[i]),
      burstTime: parseInt(burst.split(' ')[i]),
    }));

    ProcessData.forEach((data) => setProcessData(data));
    setAlgorithm(e.currentTarget['algo-name'].value);

    if (Qauntum) setTimeQuantum(parseInt(e.currentTarget['quantum'].value));
  }

  return (
    <div className="input">
      <h1 className='table-head'>Input</h1>
      <form onSubmit={handlesubmit} className="input-container">
        <div className="input-group">
          <label htmlFor="algo-name">
            Choose an Algorithm
          </label>
          <select name="algo-name" id="algo-name" onChange={() => {
            const selected = document.getElementById('algo-name') as HTMLSelectElement;
            if (selected.value === 'rr') setQauntum(true)
            else setQauntum(false);
          }}>
            <option value="fcfs" defaultChecked={true}>First Come First Serve</option>
            <option value="sjf">Shortest Job First</option>
            <option value="srtf">Shortest Remaining Time First</option>
            <option value="rr">Round Robin</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="arrival">Arrival Time</label>
          <input type="text" name="arrival" id="arrival" />
        </div>
        <div className="input-group">
          <label htmlFor="execute">Burst Time</label>
          <input type="text" name="burst" id="execute" />
        </div>
        {
          Qauntum && (
            <div className="quantum-group">
              <label htmlFor="quantum">Time Quantum :</label>
              <input type="number" name="quantum" id="quantum" />
            </div>
          )
        }
        <button type="submit" >Start Simulation</button>
      </form >
    </div >
  )
}

export default Input