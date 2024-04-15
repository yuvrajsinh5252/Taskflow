function Input() {
  return (
    <div className="input">
      <h1 className='table-head'>Input</h1>
      <div className="input-container">
        <div className="input-group">
          <label htmlFor="algo-name">
            Choose an Algorithm
          </label>
          <select name="algo-name" id="algo-name">
            <option value="fcfs" selected>First Come First Serve</option>
            <option value="sjf">Shortest Job First</option>
            <option value="srtf">Shortest Remaining Time First</option>
            <option value="rr">Round Robin</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="arrival">Arrival Time</label>
          <input type="number" id="arrival" />
        </div>
        <div className="input-group">
          <label htmlFor="execute">Burst Time</label>
          <input type="number" id="execute" />
        </div>
        <button>Add Process</button>
      </div>
    </div>
  )
}

export default Input