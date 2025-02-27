import React from "react";
import { InputContext } from "../contexts/InputContext";
import { InputContextType } from "../@types/input";
import { fcfs } from "../algorithms/fcfs";
import { GanttChartContext } from "../contexts/GanttChartContext";
import { GanntChartContextType, GanttData } from "../@types/Ganttchart";
import { rr } from "../algorithms/rr";
import { sjf } from "../algorithms/sjf";
import { srtf } from "../algorithms/srtf";
import { validateInput } from "../utils/InputValidator";
import { ControllerContext } from "../contexts/ControllerContext";
import { ControllerContextType } from "../@types/Controller";

function Input() {
  const [Qauntum, setQauntum] = React.useState(false);
  const { setProcessData, setAlgorithm, setTimeQuantum, clearProcessData } =
    React.useContext(InputContext) as InputContextType;
  const { setGanttInfoData, clearGanttInfoData } = React.useContext(
    GanttChartContext
  ) as GanntChartContextType;
  const { setStatus } = React.useContext(
    ControllerContext
  ) as ControllerContextType;
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const arrival = e.currentTarget["arrival"].value;
    const burst = e.currentTarget["burst"].value;
    let quantum = 0;

    if (Qauntum) quantum = parseInt(e.currentTarget["quantum"].value);

    const ProcessData = Array.from(
      { length: arrival.split(" ").length },
      (_, i) => ({
        arrivalTime: parseInt(arrival.split(" ")[i]),
        burstTime: parseInt(burst.split(" ")[i]),
      })
    );

    if (arrival.split(" ").length < burst.split(" ").length) {
      alert("Arrival Time should have the same length as Burst Time");
      formRef.current?.reset();
      return;
    }
    const validation = validateInput(ProcessData, quantum);

    if (validation !== "Valid Input") {
      alert(validation);
      formRef.current?.reset();
      return;
    }

    let algoApplied: {
      ProcessInfo: {
        job: string;
        arrivalTime: number;
        BurstTime: number;
        FinishTime: number;
        TurnAroundTime: number;
        WaitingTime: number;
      }[];
      ganttChartInfo: GanttData[];
    } = { ProcessInfo: [], ganttChartInfo: [] };

    if (e.currentTarget["algo-name"].value === "fcfs")
      algoApplied = fcfs(
        ProcessData.map((data) => data.arrivalTime),
        ProcessData.map((data) => data.burstTime)
      );
    else if (e.currentTarget["algo-name"].value === "sjf")
      algoApplied = sjf(
        ProcessData.map((data) => data.arrivalTime),
        ProcessData.map((data) => data.burstTime)
      );
    else if (e.currentTarget["algo-name"].value === "srtf")
      algoApplied = srtf(
        ProcessData.map((data) => data.arrivalTime),
        ProcessData.map((data) => data.burstTime)
      );
    else if (e.currentTarget["algo-name"].value === "rr")
      algoApplied = rr(
        ProcessData.map((data) => data.arrivalTime),
        ProcessData.map((data) => data.burstTime),
        quantum
      );

    //  Clearing the previous data
    clearProcessData();
    clearGanttInfoData();
    setStatus("clear");

    algoApplied.ProcessInfo.forEach((process) => {
      setProcessData({
        arrivalTime: process.arrivalTime,
        burstTime: process.BurstTime,
        completionTime: process.FinishTime,
        turnaroundTime: process.TurnAroundTime,
        waitingTime: process.WaitingTime,
      });
    });

    algoApplied.ganttChartInfo.forEach((process) => {
      const ganttdatas = {
        ProcessName: process.ProcessName,
        Interval: process.Interval,
      };

      console.log(process);
      setGanttInfoData(ganttdatas);
    });

    setAlgorithm(e.currentTarget["algo-name"].value);

    if (Qauntum) setTimeQuantum(parseInt(e.currentTarget["quantum"].value));
  };

  return (
    <div className="input">
      <h1 className="table-head">Algorithm Configuration</h1>
      <form ref={formRef} onSubmit={handlesubmit} className="input-container">
        <div className="input-group">
          <label htmlFor="algo-name">Algorithm Type</label>
          <select
            name="algo-name"
            id="algo-name"
            onChange={() => {
              const selected = document.getElementById(
                "algo-name"
              ) as HTMLSelectElement;
              if (selected.value === "rr") setQauntum(true);
              else setQauntum(false);
            }}
          >
            <option value="fcfs" defaultChecked={true}>
              First Come First Serve
            </option>
            <option value="sjf">Shortest Job First</option>
            <option value="srtf">Shortest Remaining Time First</option>
            <option value="rr">Round Robin</option>
          </select>
        </div>
        <div className="input-field-group">
          <div className="input-group">
            <label htmlFor="arrival">Arrival Time (space-separated)</label>
            <input
              type="text"
              name="arrival"
              id="arrival"
              placeholder="e.g. 0 2 4 6"
            />
          </div>
          <div className="input-group">
            <label htmlFor="execute">Burst Time (space-separated)</label>
            <input
              type="text"
              name="burst"
              id="execute"
              placeholder="e.g. 3 6 4 5"
            />
          </div>
        </div>
        {Qauntum && (
          <div className="quantum-group" style={{ margin: "20px 0" }}>
            <label htmlFor="quantum">Time Quantum :</label>
            <input type="number" name="quantum" id="quantum" />
          </div>
        )}
        <button type="submit">Run Simulation</button>
      </form>
    </div>
  );
}

export default Input;
