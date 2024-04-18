import { GanttData } from "../@types/Ganttchart";

export function sjf(ArrivalTime: number[], BurstTime: number[]) {
  const n = ArrivalTime.length;
  const ProcessInfo = [];

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

  ProcessInfo.sort((a, b) => a.BurstTime - b.BurstTime);

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
  }

  const ganttChartInfo: GanttData[] = [];

  for (let i = 0; i < ProcessInfo.length; i++) {
    if (i === 0) {
      ganttChartInfo.push({
        ProcessName: ProcessInfo[i].job,
        Interval: [0, ProcessInfo[i].FinishTime],
      });
    } else {
      ganttChartInfo.push({
        ProcessName: ProcessInfo[i].job,
        Interval: [ProcessInfo[i - 1].FinishTime, ProcessInfo[i].FinishTime],
      });
    }
  }

  return { ProcessInfo, ganttChartInfo };
}
