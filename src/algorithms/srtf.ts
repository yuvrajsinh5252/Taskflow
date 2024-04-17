export function srtf(ArrivalTime: number[], BurstTime: number[]) {
  let ProcessInfo: {
    job: string;
    arrivalTime: number;
    BurstTime: number;
    FinishTime: number;
    TurnAroundTime: number;
    WaitingTime: number;
  }[] = [];

  let n = ArrivalTime.length;
  let remainingTime = BurstTime.slice();
  let complete = 0;
  let t = 0;
  let shortest = 0;
  let finishTime = 0;
  let min = Number.MAX_VALUE;
  let check = false;

  while (complete !== n) {
    for (let i = 0; i < n; i++) {
      if (
        ArrivalTime[i] <= t &&
        remainingTime[i] < min &&
        remainingTime[i] > 0
      ) {
        min = remainingTime[i];
        shortest = i;
        check = true;
      }
    }

    if (!check) {
      t++;
      continue;
    }

    remainingTime[shortest]--;
    min = remainingTime[shortest];
    if (min === 0) min = Number.MAX_VALUE;

    if (remainingTime[shortest] === 0) {
      complete++;
      check = false;
      finishTime = t + 1;
      ProcessInfo.push({
        job: `P${shortest + 1}`,
        arrivalTime: ArrivalTime[shortest],
        BurstTime: BurstTime[shortest],
        FinishTime: finishTime,
        TurnAroundTime: finishTime - ArrivalTime[shortest],
        WaitingTime: finishTime - ArrivalTime[shortest] - BurstTime[shortest],
      });
    }
    t++;
  }

  return { ProcessInfo };
}
