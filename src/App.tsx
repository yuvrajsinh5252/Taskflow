import { BsTwitterX } from "react-icons/bs";
import GanttChart from "./components/GanttChart";
import Input from "./components/Input";
import ProcessTable from "./components/ProcessTable";
import Controller from "./components/controller";
import { AiFillGithub } from "react-icons/ai";
import InputProvider from "./contexts/InputContext";
import GanttChartProvider from "./contexts/GanttChartContext";
import ControllerProvider from "./contexts/ControllerContext";
import { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const handleTheme = () => {
      if (theme === "system") {
        document.body.removeAttribute("data-theme");
      } else {
        document.body.setAttribute("data-theme", theme);
      }
    };

    handleTheme();
  }, [theme]);

  return (
    <div className="app">
      <header className="head">
        <h1 style={{ fontSize: "1.75rem", fontWeight: "600" }}>
          CPU Scheduling Visualizer
        </h1>
        <select
          id="color-scheme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{ minWidth: "120px" }}
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </header>
      <InputProvider>
        <div className="container">
          <GanttChartProvider>
            <ControllerProvider>
              <div className="first-half">
                <Input />
                <Controller />
              </div>
              <div className="output">
                <ProcessTable />
                <GanttChart />
              </div>
            </ControllerProvider>
          </GanttChartProvider>
        </div>
      </InputProvider>
      <footer className="footer" style={{ padding: "20px 0" }}>
        <a
          href="https://github.com/yuvrajsinh5252"
          target="_blank"
          className="github"
        >
          <AiFillGithub size={25} />
          <span>github</span>
        </a>
        <a
          href="https://twitter.com/Yuvrajsinh_099"
          target="_blank"
          className="x"
        >
          <BsTwitterX size={20} />
        </a>
      </footer>
    </div>
  );
}

export default App;
