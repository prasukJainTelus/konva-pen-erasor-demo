import React, { useEffect } from "react";
import ToolConfig from "@/tools/toolConfigs";
import ToolController from "@/controller/ToolController";

function Wizard({
  toolController,
}: {
  toolController: React.MutableRefObject<ToolController | undefined>;
}) {
  const [activeTool, setActiveTool] = React.useState("pen");

  useEffect(() => {
    setActiveTool(toolController.current?.activeTool || "pen");
  }, [toolController]);
  function onSelectTool(key: string) {
    if (!toolController.current) return;

    toolController.current.setActiveTool(key as keyof typeof ToolConfig);
    if (activeTool === "drag") toolController.current.setDrag(false);
    if (activeTool === "select") toolController.current.setSelectable(false);

    setActiveTool(key);
  }

  function onSelectPointer() {
    setActiveTool("drag");
    if (!toolController.current) return;
    toolController.current.setActiveTool();
    toolController.current.setDrag(true);
    if (activeTool === "select") toolController.current.setSelectable(false);
  }

  function onSelectSelectTool() {
    if (!toolController.current) return;
    toolController.current.setActiveTool();
    if (activeTool === "drag") toolController.current.setDrag(false);
    setActiveTool("select");
    toolController.current.setSelectable(true);
  }

  function download() {
    toolController.current?.download();
  }
  return (
    <div className="wizard-container">
      <div className="wizard">
        {Object.entries(ToolConfig).map(([key, val]) => (
          <button
            key={key}
            className={`wizard-toggle ${activeTool === key && "selected"}`}
            onClick={() => onSelectTool(key as keyof typeof ToolConfig)}>
            {val.label}
          </button>
        ))}
      </div>
      <div className="tool-container">
        <div className="wizard">
          <button
            className={`wizard-toggle ${activeTool === "drag" && "selected"}`}
            onClick={() => onSelectPointer()}>
            ✊
          </button>

          <button
            className={`wizard-toggle ${activeTool === "select" && "selected"}`}
            onClick={() => onSelectSelectTool()}>
            ✥
          </button>

          <button className={`wizard-toggle`} onClick={() => download()}>
            ⤓
          </button>
        </div>
      </div>
    </div>
  );
}

export default Wizard;
