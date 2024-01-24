import ErasorTool from "./ErasorTool";
import PenTool from "./PenTool";
import Tool from "./Tool";
import { LineToolConfig } from "./interfaces";

const ToolMapper = {
  pen: {
    label: "✎",
    tool: (params: Partial<LineToolConfig>) => new PenTool(params),
  },
  erasor: {
    label: "■",
    tool: (params: Partial<LineToolConfig>) => new ErasorTool(params),
  },
};
export default ToolMapper;
