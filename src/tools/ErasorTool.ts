import { Line, LineConfig } from "konva/lib/shapes/Line";
import Tools from "./Tool";
import { ILineToolParams } from "./interfaces";
import { Stage } from "konva/lib/Stage";

class ErasorTool extends Tools {
  public shape: Line<LineConfig>;
  public key: string = "erasor";
  protected defaultConfig: ILineToolParams = {
    color: "#f00",
    x: 0,
    y: 0,
    strokeWidth: 5,
  };

  constructor(partianConfig: Partial<ILineToolParams>) {
    super();
    const config = {
      ...this.defaultConfig,
      ...partianConfig,
    };
    this.shape = new Line({
      stroke: config.color,
      strokeWidth: 5,
      globalCompositeOperation: "destination-out",
      points: [config.x, config.y, config.x, config.y],
    });
  }

  public handlePointerMove(stage: Stage): void {
    const pointerPosition = stage.getPointerPosition();
    if (!pointerPosition) return;

    const newPoints = this.shape
      .points()
      .concat([pointerPosition.x, pointerPosition.y]);

    this.shape.points(newPoints);
  }
}
export default ErasorTool;
