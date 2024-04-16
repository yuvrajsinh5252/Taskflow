export function fcfs({
  arrivalTime,
  BurstTime,
}: {
  arrivalTime: number[];
  BurstTime: number[];
}) {
  let n = arrivalTime.length;
  let waitingTime = new Array(n).fill(0);
  let turnAroundTime = new Array(n).fill(0);
  let completionTime = new Array(n).fill(0);
  let process = new Array(n).fill(0).map((_, i) => i + 1);
  let totalWaitingTime = 0;
  let totalTurnAroundTime = 0;

  for (let i = 1; i < n; i++) {
    completionTime[i] = completionTime[i - 1] + BurstTime[i - 1];
    waitingTime[i] = completionTime[i] - arrivalTime[i];
    if (waitingTime[i] < 0) waitingTime[i] = 0;
  }

  for (let i = 0; i < n; i++) {
    turnAroundTime[i] = waitingTime[i] + BurstTime[i];
    totalWaitingTime += waitingTime[i];
    totalTurnAroundTime += turnAroundTime[i];
  }

  return {
    ...process,
    waitingTime,
    turnAroundTime,
    totalWaitingTime,
    totalTurnAroundTime,
  };
}
