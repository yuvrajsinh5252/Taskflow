import React from "react";
import { GanttChartContext } from "../contexts/GanttChartContext";
import { GanntChartContextType, GanttData } from "../@types/Ganttchart";
import { ControllerContext } from "../contexts/ControllerContext";
import { ControllerContextType } from "../@types/Controller";

function GanttChart() {
  const { GanttInfo } = React.useContext(GanttChartContext) as GanntChartContextType;
  const { status, setStatus } = React.useContext(ControllerContext) as ControllerContextType;

  const elementRef = React.useRef<HTMLDivElement>(null);
  const [visibleProcesses, setVisibleProcesses] = React.useState<GanttData[]>([]);
  const [width, setWidth] = React.useState('0px');

  React.useEffect(() => {
    if (elementRef.current) {
      elementRef.current.style.setProperty('--animation-width', width);
    }
  }, [width]);

  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < GanttInfo.length - 1) {
        if (status == "running") {
          setVisibleProcesses(prev => [...prev, GanttInfo[i]]);
          setWidth(`${(GanttInfo[i].Interval[1] - GanttInfo[i].Interval[0]) * 50}px`);
          i++;
        } else if (status == "next") {
          if (visibleProcesses.length == 0) {
            setVisibleProcesses([GanttInfo[0]]);
            i++;
          }
          else {
            setVisibleProcesses(prev => [...prev, GanttInfo[i]]);
            setWidth(`${(GanttInfo[i].Interval[1] - GanttInfo[i].Interval[0]) * 50}px`);
          }
          setStatus("reset");
          i++;
        } else if (status == "prev") {
          setVisibleProcesses(prev => prev.slice(0, -1));
          setWidth(`${(GanttInfo[i].Interval[1] - GanttInfo[i].Interval[0]) * 50}px`);
          setStatus("reset");
          i--;
        }
      } else {
        if (interval) clearInterval(interval);
      }
    }, 1000); // 1000ms delay between each process

    if (GanttInfo.length > 0 && status == "running") {
      setVisibleProcesses([GanttInfo[0]]);
      setWidth(`${(GanttInfo[i].Interval[1] - GanttInfo[i].Interval[0]) * 50}px`);
      i++;
    }

    return () => clearInterval(interval);
  }, [GanttInfo, status]);

  return (
    <div className="gantt-chart-container">
      <h2 className="table-head">Gantt Chart</h2>
      <div className="chart">
        {
          visibleProcesses.length > 0 ? (
            visibleProcesses.map((process, index) => (
              <div key={index}>
                <p className="chart-cell"
                  ref={elementRef}
                  style={{
                    width: `${process.Interval[1] * 10}px`,
                    animation: `fadeIn ${index}s forwards`
                  }}>
                  {process.ProcessName}
                </p>
                <div className="interval">
                  {index == 0 ? (<p>{process.Interval[0]}</p>) : <p></p>}
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