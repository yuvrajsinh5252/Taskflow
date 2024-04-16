import { BsTwitterX } from "react-icons/bs"
import GanttChart from "./components/GanttChart"
import Input from "./components/Input"
import ProcessTable from "./components/ProcessTable"
import Controller from "./components/controller"
import { AiFillGithub } from "react-icons/ai"
import InputProvider from "./contexts/InputContext"

function App() {

  return (
    <div className="app">
      <h2 className='head'>
        <span>CPU Scheduling Algorithm</span>
      </h2>
      <InputProvider>
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
      </InputProvider>
      <footer className="footer">
        <a href="https://github.com/yuvrajsinh5252" target="_blank" className="github">
          <AiFillGithub size={25} />
          <span>github</span>
        </a>
        <a href="https://twitter.com/Yuvrajsinh_099" target="_blank" className="x"><BsTwitterX size={20} /></a>
      </footer>
    </div >
  )
}

export default App
