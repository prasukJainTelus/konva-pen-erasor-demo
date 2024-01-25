import ToolsMap from "./ToolsMap";

const ToolConfig: Record<keyof typeof ToolsMap, { label: string }> = {
  pen: {
    label: "✎",
  },
  erasor: {
    label: "■",
  },
  recatange: {
    label: "□",
  },
  elipsis: {
    label: "●",
  },
};
export default ToolConfig;
