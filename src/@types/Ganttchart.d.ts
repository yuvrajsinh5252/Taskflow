export interface GanttData {
  ProcessName: string;
  Interval: [number, number];
}

export interface GanntChartContextType {
  GanttInfo: GanttData[];
  setGanttInfoData: (data: GanttData) => void;
  clearGanttInfoData: () => void;
}

export interface AnimationState {
  currentIndex: number;
  visibleProcesses: GanttData[];
  animationWidth: string;
}
