import GanttChart from "./components/GanttChart"
import Input from "./components/Input"
import ProcessTable from "./components/ProcessTable"
import Controller from "./components/controller"

function App() {

  return (
    <div className="app">
      <h2 className='head'>
        <span>CPU Scheduling Algorithm</span>
      </h2>
      <div className="container">
        <div className="first-half">
          <Input />
          <Controller />
        </div>
        <div className="output">
          <ProcessTable />
          <GanttChart />
        </div>
      </div>
    </div >
  )
}

export default App
