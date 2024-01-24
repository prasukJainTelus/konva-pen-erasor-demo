export interface ToolConfig {
  color: string;
  x: number;
  y: number;
}

export interface LineToolConfig extends ToolConfig {
  strokeWidth: number;
}
