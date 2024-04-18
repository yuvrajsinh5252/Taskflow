import { GanttData } from "../@types/Ganttchart";

export function rr(
  ArrivalTime: number[],
  BurstTime: number[],
  Quantum: number
) {
  let ProcessInfo = [];
  let ganttChartInfo: GanttData[] = [];
  let n = ArrivalTime.length;

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

  ProcessInfo.sort((a, b) => a.arrivalTime - b.arrivalTime);
  console.log(ProcessInfo);

  let Burstmin = Math.min(...BurstTime);

  let totalTime = BurstTime.reduce((a, b) => a + b, 0) + Burstmin;

  let processQueue = [];
  let completed = 0;

  let currentProcess = -1;
  let currentProcessTime = 0;

  for (let i = 0; i <= totalTime; ++i) {
    if (i == totalTime) {
      if (currentProcess !== -1) {
        ProcessInfo[currentProcess].FinishTime = i;
        ProcessInfo[currentProcess].TurnAroundTime =
          ProcessInfo[currentProcess].FinishTime -
          ProcessInfo[currentProcess].arrivalTime;
        ProcessInfo[currentProcess].WaitingTime =
          ProcessInfo[currentProcess].TurnAroundTime -
          ProcessInfo[currentProcess].BurstTime;
        completed++;

        ganttChartInfo.push({
          ProcessName: ProcessInfo[currentProcess].job,
          Interval: [i - currentProcessTime, i],
        });
      }
    }

    for (let j = 0; j < n; j++) {
      if (i === ArrivalTime[j]) {
        processQueue.push(j);
      }
    }

    if (processQueue.length > 0) {
      if (currentProcess === -1) {
        currentProcess = processQueue.shift()!;
        currentProcessTime = 1;
        BurstTime[currentProcess]--;
      }

      if (currentProcessTime === Quantum) {
        if (BurstTime[currentProcess] > 0) {
          processQueue.push(currentProcess);
        } else if (BurstTime[currentProcess] === 0) {
          ProcessInfo[currentProcess].FinishTime = i + 1;
          ProcessInfo[currentProcess].TurnAroundTime =
            i + 1 - ProcessInfo[currentProcess].arrivalTime;
          ProcessInfo[currentProcess].WaitingTime =
            ProcessInfo[currentProcess].TurnAroundTime -
            ProcessInfo[currentProcess].BurstTime;
          completed++;
        }
        ganttChartInfo.push({
          ProcessName: ProcessInfo[currentProcess].job,
          Interval: [i - currentProcessTime + 1, i + 1],
        });

        currentProcess = -1;
      } else {
        currentProcessTime++;

        if (BurstTime[currentProcess] === 0) {
          ProcessInfo[currentProcess].FinishTime = i + 1;
          ProcessInfo[currentProcess].TurnAroundTime =
            ProcessInfo[currentProcess].FinishTime -
            ProcessInfo[currentProcess].arrivalTime;
          ProcessInfo[currentProcess].WaitingTime =
            ProcessInfo[currentProcess].TurnAroundTime -
            ProcessInfo[currentProcess].BurstTime;
          completed++;

          ganttChartInfo.push({
            ProcessName: ProcessInfo[currentProcess].job,
            Interval: [i - currentProcessTime + 1, i + 1],
          });
          currentProcess = -1;
          currentProcessTime = 0;
        } else {
          BurstTime[currentProcess]--;
        }
      }
    }
  }

  return { ProcessInfo, ganttChartInfo };
}
