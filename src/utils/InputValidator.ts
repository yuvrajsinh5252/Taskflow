interface InputValidator {
  ProcessData: {
    arrivalTime: number;
    burstTime: number;
  }[];
}
export function validateInput(
  ProcessData: InputValidator["ProcessData"],
  Quantum: number | undefined
) {
  const arrivalTime = ProcessData.map((data) => data.arrivalTime);
  const burstTime = ProcessData.map((data) => data.burstTime);

  if (Quantum && Quantum <= 0) return "Time Quantum should be greater than 0";

  if (arrivalTime.some((time) => isNaN(time))) {
    console.log("Invalid Arrival Time");
    return "Invalid Arrival Time";
  }

  if (burstTime.some((time) => isNaN(time))) return "Invalid Burst Time";

  if (arrivalTime.some((time) => time < 0))
    return "Arrival Time should be greater than or equal to 0";

  if (burstTime.some((time) => time <= 0))
    return "Burst Time should be greater than 0";

  if (arrivalTime.length !== burstTime.length)
    return "Arrival Time should have the same length as Burst Time";

  return "Valid Input";
}
