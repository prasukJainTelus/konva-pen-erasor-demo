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
  function onSelectTool(key: keyof typeof ToolConfig) {
    if (toolController.current) toolController.current.setActiveTool(key);
    setActiveTool(key);
  }

  return (
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
  );
}

export default Wizard;
