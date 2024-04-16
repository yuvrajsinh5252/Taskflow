export interface GanntChartContextType {
  GanttInfo: {
    ProcessName: string;
    Interval: number[];
  }[];
  setGanttInfoData: (info: GanttData) => void;
}

export interface GanttData {
  ProcessName: string;
  Interval: [number, number];
}
