export function fcfs(ArrivalTime: number[], BurstTime: number[]) {
  const n = ArrivalTime.length;
  const ProcessInfo = [];
  const waitingTime = [];
  const turnAroundTime = [];

  let totalWaitingTime = 0;
  let totalTurnAroundTime = 0;

  let currentTime = 0;

  for (let i = 0; i < n; i++) {
    const process = {
      job: `P${i + 1}`,
      arrivalTime: ArrivalTime[i],
      BurstTime: BurstTime[i],
      FinishTime: 0,
      TurnAroundTime: 0,
      WaitingTime: 0,
    };

    ProcessInfo.push(process);
  }

  for (let i = 0; i < n; i++) {
    if (currentTime < ProcessInfo[i].arrivalTime) {
      currentTime = ProcessInfo[i].arrivalTime;
    }

    ProcessInfo[i].FinishTime = currentTime + ProcessInfo[i].BurstTime;
    ProcessInfo[i].TurnAroundTime =
      ProcessInfo[i].FinishTime - ProcessInfo[i].arrivalTime;
    ProcessInfo[i].WaitingTime =
      ProcessInfo[i].TurnAroundTime - ProcessInfo[i].BurstTime;

    currentTime = ProcessInfo[i].FinishTime;
    waitingTime.push(ProcessInfo[i].WaitingTime);
    turnAroundTime.push(ProcessInfo[i].TurnAroundTime);
  }

  totalWaitingTime = waitingTime.reduce((acc, curr) => acc + curr, 0);
  totalTurnAroundTime = turnAroundTime.reduce((acc, curr) => acc + curr, 0);

  const job = ProcessInfo.map((process) => process.job);

  const averageWaitingTime = totalWaitingTime / job.length;
  const averageTurnAroundTime = totalTurnAroundTime / job.length;

  return {
    ProcessInfo,
    averageWaitingTime,
    averageTurnAroundTime,
  };
}
