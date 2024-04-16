import { useContext } from "react";
import { InputContextType } from "../@types/input";
import { InputContext } from "../contexts/InputContext";

function ProcessTable() {
  const { process } = useContext(InputContext) as InputContextType;

  const ProcessInfo = process.map((process, index) => {
    const FinishTime = process.completionTime;
    const TurnAroundTime = FinishTime - process.arrivalTime;
    const WaitingTime = TurnAroundTime - process.burstTime;

    return {
      job: `P${index + 1}`,
      arrivalTime: process.arrivalTime,
      BurstTime: process.burstTime,
      FinishTime,
      TurnAroundTime,
      WaitingTime,
    }
  });

  const turnAroundTime = ProcessInfo.map((process) => process.TurnAroundTime);
  const waitingTime = ProcessInfo.map((process) => process.WaitingTime);

  const totalWaitingTime = waitingTime.reduce((acc, curr) => acc + curr, 0);
  const totalTurnAroundTime = turnAroundTime.reduce((acc, curr) => acc + curr, 0);
  const job = ProcessInfo.map((process) => process.job);

  const averageWaitingTime = totalWaitingTime / job.length;
  const averageTurnAroundTime = totalTurnAroundTime / job.length;

  return (
    <div className="table-container">
      <h2 className='table-head'>Process Table</h2>
      <table className="process-table">
        <thead>
          <tr>
            <th>Process Name</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            <th>Finish Time</th>
            <th>Turnaround Time</th>
            <th>Waiting Time</th>
          </tr>
        </thead>
        {
          ProcessInfo && ProcessInfo.length > 0 ? (
            <tbody>
              {
                ProcessInfo.map((process, index) => (
                  <tr key={index}>
                    <td>{process.job}</td>
                    <td>{process.arrivalTime}</td>
                    <td>{process.BurstTime}</td>
                    <td>{process.FinishTime}</td>
                    <td>{process.TurnAroundTime}</td>
                    <td>{process.WaitingTime}</td>
                  </tr>
                ))
              }
              <tr>
                <td colSpan={3}></td>
                <td>Average </td>
                <td> {averageTurnAroundTime.toFixed(2)}</td>
                <td>{averageWaitingTime.toFixed(2)}</td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={6}>
                  No data available
                </td>
              </tr>
            </tbody>
          )
        }
      </table>

    </div>
  );
}

export default ProcessTable;