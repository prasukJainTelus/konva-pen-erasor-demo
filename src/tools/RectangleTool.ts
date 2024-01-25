import { Rect, RectConfig } from "konva/lib/shapes/Rect";
import Tools from "./Tool";
import { IRectToolParams } from "./interfaces";
import { Stage } from "konva/lib/Stage";

type IUpdatableKeys = "strokeWidth" | "stroke";

class RectangleTool extends Tools {
  public shape: Rect;
  public key: string = "pen";
  protected defaultConfig: IRectToolParams = {
    color: "#f00",
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  };

  constructor(partianConfig: Partial<IRectToolParams>) {
    super();
    const config = {
      ...this.defaultConfig,
      ...partianConfig,
    };
    this.shape = new Rect({
      fill: config.color,
      strokeWidth: 5,
      globalCompositeOperation: "source-over",
      x: config.x,
      y: config.y,
      width: config.width,
      height: config.height,
    });
  }

  public handlePointerMove(stage: Stage): void {
    const pointerPosition = stage.getPointerPosition();
    if (!pointerPosition) return;

    const width = pointerPosition.x - this.shape.x();
    const height = pointerPosition.y - this.shape.y();
    this.shape.width(width);
    this.shape.height(height);
  }

  public updateConfig<T extends IUpdatableKeys>(
    key: T,
    value: RectConfig[T],
  ): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.shape[key](value as any);
  }
}
export default RectangleTool;
