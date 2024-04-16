function GanttChart() {
  const GanntInfo = [
    { ProcessName: "P1", Interval: [0, 6] },
    { ProcessName: "P2", Interval: [6, 9] },
    { ProcessName: "P3", Interval: [9, 13] },
    { ProcessName: "P4", Interval: [13, 15] },
  ];

  const GanttChartInfo = GanntInfo;

  return (
    <div className="gantt-chart-container">
      <h2 className="table-head">Gantt Chart</h2>
      <div className="chart">
        {
          true ? (
            GanttChartInfo.map((process, index) => (
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