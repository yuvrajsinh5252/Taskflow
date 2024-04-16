function Input() {
  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(e.currentTarget['arrival'].value);
    console.log(e.currentTarget['burst'].value);
    console.log(e.currentTarget['algo-name'].value);
  }

  return (
    <div className="input">
      <h1 className='table-head'>Input</h1>
      <form onSubmit={handlesubmit} className="input-container">
        <div className="input-group">
          <label htmlFor="algo-name">
            Choose an Algorithm
          </label>
          <select name="algo-name" id="algo-name">
            <option value="fcfs" defaultChecked={true}>First Come First Serve</option>
            <option value="sjf">Shortest Job First</option>
            <option value="srtf">Shortest Remaining Time First</option>
            <option value="rr">Round Robin</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="arrival">Arrival Time</label>
          <input type="text" name="arrival" id="arrival" />
        </div>
        <div className="input-group">
          <label htmlFor="execute">Burst Time</label>
          <input type="text" name="burst" id="execute" />
        </div>
        <button type="submit" >Start Simulation</button>
      </form>
    </div>
  )
}

export default Input