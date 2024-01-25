import { Ellipse, EllipseConfig } from "konva/lib/shapes/Ellipse";
import Tools from "./Tool";
import { IEllipseToolParams } from "./interfaces";
import { Stage } from "konva/lib/Stage";

type IUpdatableKeys = "strokeWidth" | "stroke";

class EllipseTool extends Tools {
  public shape: Ellipse;
  public key: string = "pen";
  protected defaultConfig: IEllipseToolParams = {
    color: "#f00",
    x: 0,
    y: 0,
    radiusX: 1,
    radiusY: 1,
  };

  constructor(partianConfig: Partial<IEllipseToolParams>) {
    super();
    const config = {
      ...this.defaultConfig,
      ...partianConfig,
    };
    this.shape = new Ellipse({
      fill: config.color,
      strokeWidth: 5,
      globalCompositeOperation: "source-over",
      x: config.x,
      y: config.y,
      radiusX: config.radiusX,
      radiusY: config.radiusY,
    });
  }

  public handlePointerMove(stage: Stage): void {
    const pointerPosition = stage.getPointerPosition();
    if (!pointerPosition) return;

    const radiusX = Math.abs(pointerPosition.x - this.shape.x());
    const radiusY = Math.abs(pointerPosition.y - this.shape.y());
    this.shape.radiusX(radiusX);
    this.shape.radiusY(radiusY);
  }

  public updateConfig<T extends IUpdatableKeys>(
    key: T,
    value: EllipseConfig[T],
  ): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.shape[key](value as any);
  }
}
export default EllipseTool;
