import React from "react";
import { GanttChartContext } from "../contexts/GanttChartContext";
import { GanntChartContextType } from "../@types/Ganttchart";

function GanttChart() {
  const { GanttInfo } = React.useContext(GanttChartContext) as GanntChartContextType;

  console.log(GanttInfo);

  return (
    <div className="gantt-chart-container">
      <h2 className="table-head">Gantt Chart</h2>
      <div className="chart">
        {
          true ? (
            GanttInfo.map((process, index) => (
              <div key={index} className="chart-cell" style={{ width: `${process.Interval[1] * 10}px` }}>
                <p>{process.ProcessName}</p>
              </div>
            ))
          ) : (
            <p>Nothing to show</p>
          )
        }
      </div>
    </div>
  );
}

export default GanttChart;