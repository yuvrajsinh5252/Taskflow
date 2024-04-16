import { BsTwitterX } from "react-icons/bs"
import GanttChart from "./components/GanttChart"
import Input from "./components/Input"
import ProcessTable from "./components/ProcessTable"
import Controller from "./components/controller"
import { AiFillGithub } from "react-icons/ai"

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
      <footer className="footer">
        <a href="https://github.com/yuvrajsinh5252" target="_blank" className="github">
          <AiFillGithub size={25} />
          <span>github</span>
        </a>
        <BsTwitterX size={20} />
      </footer>
    </div >
  )
}

export default App
