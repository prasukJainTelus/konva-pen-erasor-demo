import React from "react";
import { TOOLS } from "../data/tool";

const Wizard = React.forwardRef((props, ref) => {
  const [tool, setTool] = React.useState<keyof typeof TOOLS>("pen");
  React.useImperativeHandle(
    ref,
    () => ({
      getActiveTool: () => {
        return tool;
      },
    }),
    [tool],
  );
  return (
    <div className="wizard">
      {Object.entries(TOOLS).map(([key, val]) => (
        <button
          key={key}
          className={`wizard-toggle ${tool === key && "selected"}`}
          onClick={() => setTool(key as keyof typeof TOOLS)}
        >
          {val.label}
        </button>
      ))}
    </div>
  );
});
export default Wizard;
