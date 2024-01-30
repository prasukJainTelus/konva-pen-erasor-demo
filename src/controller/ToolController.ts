import EllipseTool from "@/tools/ElipsisTool";
import ErasorTool from "@/tools/ErasorTool";
import PenTool from "@/tools/PenTool";
import RectangleTool from "@/tools/RectangleTool";
import Tool from "@/tools/Tool";
import { IToolParams } from "@/tools/interfaces";
import ToolConfig from "@/tools/toolConfigs";
import Konva from "konva";

class ToolController {
  public activeTool?: keyof typeof ToolConfig;
  private activeToolInstance?: InstanceType<typeof Tool>;
  private stage: Konva.Stage;
  private penDown = false;
  private layer: Konva.Layer;
  private transformer?: Konva.Transformer;

  constructor() {
    this.stage = new Konva.Stage({
      width: 500,
      height: 500,
      container: "canvas",
      name: "stage",
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    this.setActiveTool("pen");
  }

  public setActiveTool(activeTool?: keyof typeof ToolConfig) {
    this.activeTool = activeTool;
    if (!this.activeTool) return;
    this.stage.on("pointerdown", this.handlePointerDown.bind(this));
    this.stage.on("pointerup", this.handlePointerUp.bind(this));
    this.stage.on("pointermove", this.handlePointerMove.bind(this));
  }
  private handlePointerUp() {
    this.activeToolInstance = undefined;
    this.penDown = false;
  }

  private handlePointerMove() {
    if (!this.stage || !this.penDown || !this.activeToolInstance) return;

    const pointerPosition = this.stage.getPointerPosition();

    if (!pointerPosition) return;
    this.activeToolInstance.handlePointerMove(this.stage);
  }

  private handlePointerDown() {
    const pointerPosition = this.stage.getPointerPosition();
    if (!pointerPosition) return;
    const params = {
      x: pointerPosition.x,
      y: pointerPosition.y,
    };
    this.generateTool(this.activeTool, params);

    if (this.activeToolInstance) this.layer.add(this.activeToolInstance.shape);
    this.penDown = true;
  }

  private generateTool(
    tool?: keyof typeof ToolConfig,
    params: Partial<IToolParams> = {},
  ) {
    switch (tool) {
      case "erasor":
        this.activeToolInstance = new ErasorTool(params);
        break;
      case "pen":
        this.activeToolInstance = new PenTool(params);
        break;
      case "recatange":
        this.activeToolInstance = new RectangleTool(params);
        break;
      case "elipsis":
        this.activeToolInstance = new EllipseTool(params);
        break;
    }
  }

  public download() {
    const dataURL = this.stage.toDataURL({ pixelRatio: 3 });
    this.downloadURI(dataURL, "stage.png");
  }

  private downloadURI(dataURI: string, filename: string) {
    const link = document.createElement("a");
    link.download = filename;
    link.hidden = true;
    link.href = dataURI;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  public setDrag(drag: boolean) {
    this.layer.children.forEach(child => {
      child.draggable(drag);
    });
  }

  public setSelectable(selectable: boolean) {
    if (!selectable) {
      this.transformer?.nodes([]);
      this.transformer?.detach();
      document.body.onkeydown = () => {};
      this.layer.children.forEach(child => {
        // eslint-disable-next-line no-console
        console.log(child);

        child.on("pointerclick", () => {});
      });
      this.transformer = undefined;

      return;
    }
    this.layer.children.forEach(child => {
      if (child instanceof Konva.Transformer) return;
      child.on("pointerclick", () => {
        if (!selectable) return this.transformer?.nodes([]);
        if (!this.transformer) {
          this.transformer = new Konva.Transformer();
          this.layer.add(this.transformer);
        }
        this.transformer.nodes([child]);
        const container = document.body;
        container.onkeydown = (ev: KeyboardEvent) => {
          if (ev.ctrlKey && ev.key == "d")
            this.transformer?.nodes().forEach(node => {
              this.layer.add(
                node.clone({
                  x: node.x() + 10,
                  y: node.y() + 10,
                }) as Konva.Shape,
              );
            }, true);

          document.body.focus();
        };
      });
    });
  }
}

export default ToolController;
