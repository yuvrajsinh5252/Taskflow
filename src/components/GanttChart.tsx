import React from "react";
import { GanttChartContext } from "../contexts/GanttChartContext";
import { GanntChartContextType, GanttData } from "../@types/Ganttchart";
import { ControllerContext } from "../contexts/ControllerContext";
import { ControllerContextType } from "../@types/Controller";

function GanttChart() {
  const { GanttInfo } = React.useContext(GanttChartContext) as GanntChartContextType;
  const { status, setStatus, speed } = React.useContext(ControllerContext) as ControllerContextType;

  const elementRef = React.useRef<HTMLDivElement>(null);
  const [visibleProcesses, setVisibleProcesses] = React.useState<GanttData[]>([]);
  const [width, setWidth] = React.useState('0px');
  let i: any;

  if (localStorage.getItem("i") == null) {
    i = 0;
    localStorage.setItem("i", i);
  } else i = localStorage.getItem("i");

  React.useEffect(() => {
    if (elementRef.current) {
      elementRef.current.style.setProperty('--animation-width', width);
    }
  }, [width]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (status == "clear") {
        setVisibleProcesses([]);
        i = 0;
        localStorage.setItem("i", i);
        setStatus("running");
      }

      if (i < GanttInfo.length - 1) {
        if (status == "running") {
          setVisibleProcesses(prev => [...prev, GanttInfo[i]]);
          setWidth(`${(GanttInfo[i].Interval[1] - GanttInfo[i].Interval[0]) * 20}px`);
          i++;
        }

        if (visibleProcesses.length == 0 && i == 0) {
          setVisibleProcesses([GanttInfo[i]]);
          setWidth(`${(GanttInfo[i].Interval[1] - GanttInfo[i].Interval[0]) * 20}px`);
        }
        else if (visibleProcesses.length > 1 && i == 0) setVisibleProcesses([]);
        else if (status == "next") {
          setVisibleProcesses(prev => [...prev, GanttInfo[i]]);
          setWidth(`${(GanttInfo[i].Interval[1] - GanttInfo[i].Interval[0]) * 20}px`);
          i++;
        } else if (status == "prev") {
          setVisibleProcesses(prev => prev.slice(0, -1));
          setWidth(`${(GanttInfo[i].Interval[1] - GanttInfo[i].Interval[0]) * 20}px`);
          if (i > 0) i--;
        }

        if (status != "running") setStatus("reset");
        localStorage.setItem("i", i);
      } else if (status == "prev") {
        setVisibleProcesses(prev => prev.slice(0, -1));
        setWidth(`${(GanttInfo[i].Interval[1] - GanttInfo[i].Interval[0]) * 20}px`);
        i--;
        setStatus("reset");
        localStorage.setItem("i", i);
      }
    }, speed * 20);

    return () => clearInterval(interval);
  }, [GanttInfo, status, speed]);

  return (
    <div className="gantt-chart-container">
      <h2 className="table-head">Gantt Chart</h2>
      <div className="chart">
        {
          visibleProcesses.length > 0 ? (
            visibleProcesses.map((process, index) => (
              <div key={index}>
                <p className="chart-cell" ref={elementRef}>
                  {process.ProcessName}
                </p>
                <div className="interval">
                  {index == 0 ? (<p>{process.Interval[0]}</p>) : <p></p>}
                  <p className="secInterval">{process.Interval[1]}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="nothing">Nothing to show</p>
          )
        }
      </div>
    </div >
  );
}

export default GanttChart;