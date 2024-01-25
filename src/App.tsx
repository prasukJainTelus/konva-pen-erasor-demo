import { useEffect, ReactElement, useRef } from "react";
import "./App.css";
import Wizard from "./features/Wizard";
import ToolController from "./controller/ToolController";

function App(): ReactElement {
  const toolController = useRef<ToolController>();

  useEffect(() => {
    toolController.current = new ToolController();
  }, []);
  return (
    <div className="app">
      <div className="head">Pen and erasors</div>
      <Wizard toolController={toolController} />
      <div id="canvas"></div>
    </div>
  );
}

export default App;
