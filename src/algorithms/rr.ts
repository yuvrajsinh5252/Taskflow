export function rr(
  ArrivalTime: number[],
  BurstTime: number[],
  Quantum: number
) {
  const n = ArrivalTime.length;
  const ProcessInfo = [];
  const waitingTime = [];
  const turnAroundTime = [];

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
    waitingTime[i] = 0;
    turnAroundTime[i] = 0;

    for (let j = i + 1; j < n; j++) {
      if (ProcessInfo[i].arrivalTime > ProcessInfo[j].arrivalTime) {
        const temp = ProcessInfo[i] as any;
        ProcessInfo[i] = ProcessInfo[j];
        ProcessInfo[j] = temp;
      }
    }

    if (ProcessInfo[i].BurstTime > Quantum) {
      currentTime += Quantum;
      ProcessInfo[i].BurstTime -= Quantum;
    } else {
      currentTime += ProcessInfo[i].BurstTime;
      ProcessInfo[i].BurstTime = 0;
      ProcessInfo[i].FinishTime = currentTime;
    }
  }

  return { ProcessInfo };
}
