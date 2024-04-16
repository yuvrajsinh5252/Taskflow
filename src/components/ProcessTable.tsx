interface TableProps {
  ProcessInfo: {
    job: string,
    arrivalTime: number,
    BurstTime: number,
    FinishTime: number,
    TurnAroundTime: number;
    WaitingTime: number;
  }[]
}

function ProcessTable({ ProcessInfo }: TableProps) {
  const tableData = [
    { job: "P1", arrivalTime: 0, BurstTime: 6, FinishTime: 0, TurnAroundTime: 0, WaitingTime: 0 },
    { job: "P2", arrivalTime: 2, BurstTime: 3, FinishTime: 0, TurnAroundTime: 0, WaitingTime: 0 },
    { job: "P3", arrivalTime: 4, BurstTime: 4, FinishTime: 0, TurnAroundTime: 0, WaitingTime: 0 },
    { job: "P4", arrivalTime: 5, BurstTime: 2, FinishTime: 0, TurnAroundTime: 0, WaitingTime: 0 },
  ];

  ProcessInfo = tableData;

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
          true ? (
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