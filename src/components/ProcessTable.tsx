function ProcessTable() {
  return (
    <div className="table-container">
      <h2 className='table-head'>Process Table</h2>
      <table className="process-table">
        <thead>
          <tr>
            <th>Process Name</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            <th>Finish Time</th>
            <th>Turnaround Time</th>
            <th>Waiting Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>P1</td>
            <td>0</td>
            <td>5</td>
            <td>5</td>
            <td>5</td>
            <td>0</td>
          </tr>
          <tr>
            <td>P2</td>
            <td>1</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>0</td>
          </tr>
          <tr>
            <td>P3</td>
            <td>2</td>
            <td>4</td>
            <td>8</td>
            <td>4</td>
            <td>2</td>
          </tr>
          <tr>
            <td>P4</td>
            <td>3</td>
            <td>2</td>
            <td>6</td>
            <td>2</td>
            <td>1</td>
          </tr>
          <tr>
            <td>P5</td>
            <td>4</td>
            <td>10</td>
            <td>4</td>
            <td>6</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}

export default ProcessTable;