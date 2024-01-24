import { Shape } from "konva/lib/Shape";
import { ToolConfig } from "./interfaces";
import { KonvaEventObject } from "konva/lib/Node";
import { Stage } from "konva/lib/Stage";

abstract class Tool<T extends Shape> {
  /**
   * Add Konva Shape
   */
  public abstract shape: T;

  public abstract key: string;
  /**
   * Provide default configurations for shapes.
   * @note Please extend [ToolConfig](./interfaces.ts) interface
   */
  protected abstract defaultConfig: ToolConfig;

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
