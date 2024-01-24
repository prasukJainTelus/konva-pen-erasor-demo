import React from "react";
import PenTool from "@/tools/PenTool";
import Tool from "@/tools/Tool";
import ToolMapper from "@/tools/ToolMapper";

const Wizard = React.forwardRef((props, ref) => {
  const [tool, setTool] = React.useState<InstanceType<typeof Tool>>(
    new PenTool({ color: "#f00" }),
  );
  React.useImperativeHandle(
    ref,
    () => ({
      getActiveTool: () => {
        return tool;
      },
    }),
    [tool],
  );

  function updateTool(tool: (typeof ToolMapper)[keyof typeof ToolMapper]) {
    setTool(tool.tool({ color: "#f00" }));
  }
  return (
    <div className="wizard">
      {Object.entries(ToolMapper).map(([key, val]) => (
        <button
          key={key}
          className={`wizard-toggle ${tool.key === key && "selected"}`}
          onClick={() => updateTool(val)}
        >
          {val.label}
        </button>
      ))}
    </div>
  );
});
export default Wizard;
