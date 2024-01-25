import { Shape } from "konva/lib/Shape";
import { IToolParams } from "./interfaces";
import { Stage } from "konva/lib/Stage";

abstract class Tool {
  /**
   * Add Konva Shape
   */
  public abstract shape: Shape;

  public abstract key: string;
  /**
   * Provide default configurations for shapes.
   * @note Please extend [ToolConfig](./interfaces.ts) interface
   */
  protected abstract defaultConfig: IToolParams;

  /**
   * Fires when ponter is moved on drag
   * @property: `stage` [Stage](konva/lib/Stage)
   */
  public abstract handlePointerMove(stage: Stage): void;
}

export default Tool;
