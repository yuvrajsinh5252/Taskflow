import React from "react";
import { GanntChartContextType, GanttData } from "../@types/Ganttchart";

export const GanttChartContext = React.createContext<GanntChartContextType | null>(null);

const GanttChartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [GanttInfo, setGanttInfo] = React.useState<GanttData[]>([]);

  const setGanttInfoData = ({ ProcessName, Interval }: GanttData) => {
    setGanttInfo(previousInfo => [...previousInfo, { ProcessName, Interval }]);
  }

  const clearGanttInfoData = () => setGanttInfo([])

  return (
    <GanttChartContext.Provider value={{ GanttInfo, setGanttInfoData, clearGanttInfoData }}>
      {children}
    </GanttChartContext.Provider>
  );
};

export default GanttChartProvider;