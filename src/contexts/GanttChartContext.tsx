import React from "react";
import { GanntChartContextType } from "../@types/Ganttchart";

export const GanttChartContext = React.createContext<GanntChartContextType | null>(null);

const GanttChartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [GanttInfo, setGanttInfo] = React.useState<GanntChartContextType["GanttInfo"]>([]);

  const setGanttInfoData = (
    {
      ProcessName,
      Interval,
    }: {
      ProcessName: string;
      Interval: [number, number];
    }
  ) => {
    const newGanttInfo = [...GanttInfo];
    newGanttInfo.push({ ProcessName, Interval });
    setGanttInfo(newGanttInfo);
  }

  return (
    <GanttChartContext.Provider value={{ GanttInfo, setGanttInfoData }}>
      {children}
    </GanttChartContext.Provider>
  );
};

export default GanttChartProvider;