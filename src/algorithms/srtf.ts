import { GanttData } from "../@types/Ganttchart";

export const srtf = (ArrivalTime: number[], BurstTime: number[]) => {
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

  let currentTime = 0;
  let processQueue = [];
  let Index = 0;
  let completed = 0;
  let shortest = 0;

  let totalTime = BurstTime.reduce((a, b) => a + b, 0);
  console.log(totalTime);

  for (let i = 0; i <= totalTime; i++) {
    for (let j = 0; j < n; j++) {
      if (i === ArrivalTime[j]) {
        processQueue.push(j);
      }
    }

    let min = Number.MAX_VALUE;
    shortest = 0;

    if (processQueue.length > 0) {
      for (let j = 0; j < processQueue.length; j++) {
        if (BurstTime[processQueue[j]] < min) {
          min = BurstTime[processQueue[j]];
          shortest = processQueue[j];
        }
      }

      if (Index !== shortest) {
        if (Index !== -1) {
          ganttChartInfo.push({
            ProcessName: ProcessInfo[Index].job,
            Interval: [currentTime, i],
          });
        }

        Index = shortest;
        currentTime = i;
      }

      BurstTime[shortest] -= 1;

      if (BurstTime[shortest] === 0) {
        completed++;
        ProcessInfo[shortest].FinishTime = i + 1;
        ProcessInfo[shortest].TurnAroundTime =
          ProcessInfo[shortest].FinishTime - ProcessInfo[shortest].arrivalTime;
        ProcessInfo[shortest].WaitingTime =
          ProcessInfo[shortest].TurnAroundTime -
          ProcessInfo[shortest].BurstTime;
        currentTime = i + 1;
        processQueue.splice(processQueue.indexOf(shortest), 1);
      }
    } else {
      if (Index !== -1) {
        ganttChartInfo.push({
          ProcessName: ProcessInfo[Index].job,
          Interval: [currentTime, i],
        });
      }

      Index = -1;
    }
  }

  return { ProcessInfo, ganttChartInfo };
};
