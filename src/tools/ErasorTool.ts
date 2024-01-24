import { Line, LineConfig } from "konva/lib/shapes/Line";
import Tools from "./Tool";
import { LineToolConfig } from "./interfaces";
import { Stage } from "konva/lib/Stage";

type IUpdatableKeys = "strokeWidth" | "stroke";

class ErasorTool extends Tools<Line<LineConfig>> {
  public shape: Line<LineConfig>;
  public key: string = "erasor";
  protected defaultConfig: LineToolConfig = {
    color: "#f00",
    x: 0,
    y: 0,
    strokeWidth: 5,
  };

  constructor(partianConfig: Partial<LineToolConfig>) {
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
    var pointerPosition = stage.getPointerPosition();
    if (!pointerPosition) return;

    const newPoints = this.shape
      .points()
      .concat([pointerPosition.x, pointerPosition.y]);

    this.shape.points(newPoints);
  }

  public updateConfig(
    key: IUpdatableKeys,
    value: LineConfig[IUpdatableKeys],
  ): void {
    this.shape[key](value as any);
  }
}
export default ErasorTool;
