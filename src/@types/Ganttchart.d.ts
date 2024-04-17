export interface GanntChartContextType {
  GanttInfo: GanttInfoType[];
  setGanttInfoData: (data: GanttData | any) => void;
  clearGanttInfoData: () => void;
}
export interface GanttData {
  ProcessName: string;
  Interval: [number, number];
}
