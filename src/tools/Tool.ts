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

  /**
   * Update the configuration with the given key and value.
   *
   * @param {string} key - The key to update in the configuration
   * @param {any} value - The value to set for the key
   * @return {void}
   */
  public abstract updateConfig(key: string, value: any): void;
}

export default Tool;
