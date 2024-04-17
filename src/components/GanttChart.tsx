import React from "react";
import { GanttChartContext } from "../contexts/GanttChartContext";
import { GanntChartContextType } from "../@types/Ganttchart";

function GanttChart() {
  const { GanttInfo } = React.useContext(GanttChartContext) as GanntChartContextType;

  return (
    <div className="gantt-chart-container">
      <h2 className="table-head">Gantt Chart</h2>
      <div className="chart">
        {
          GanttInfo.length > 0 ? (
            GanttInfo.map((process, index) => (
              <div>
                <p key={index} className="chart-cell" style={{ width: `${process.Interval[1] * 10}px` }}>
                  {process.ProcessName}
                </p>
                <div className="interval">
                  {
                    index == 0 ? (
                      <p>{process.Interval[0]}</p>
                    ) : <p></p>
                  }
                  <p className="secInterval">{process.Interval[1]}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Nothing to show</p>
          )
        }
      </div>
    </div >
  );
}

export default GanttChart;