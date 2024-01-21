import { useEffect, useState, ReactElement, useRef, createRef } from "react";
import Konva from "konva";
import "./App.css";
import { KonvaEventObject } from "konva/lib/Node";
import { TOOLS } from "./data/tool";
import Wizard from "./features/Wizard";

function App(): ReactElement {
  const wizard = useRef();
  const [penDown, _setPenDown] = useState(false);
  const penDownRef = useRef(penDown);
  const setPenDown = (val: boolean) => {
    _setPenDown(val);
    penDownRef.current = val;
  };
  const [points, _setPoints] = useState<Set<[number, number]>>(new Set());
  const markedPoints = useRef(points);

  const stage = useRef<Konva.Stage | null>(null);
  const layer = useRef<Konva.Layer | null>(null);
  const line = useRef<Konva.Line | null>(null);

  function handlePointerUp() {
    setPenDown(false);
  }

  function handlePointerDown() {
    const pointerPosition = stage.current?.getPointerPosition();

    if (!pointerPosition) return;
    setPenDown(true);

    const tool = (wizard.current as any).getActiveTool() as keyof typeof TOOLS;

    line.current = new Konva.Line({
      stroke: "#f00",
      strokeWidth: 5,
      globalCompositeOperation:
        tool === "pen" ? "source-over" : "destination-out",
      points: [
        pointerPosition.x,
        pointerPosition.y,
        pointerPosition.x,
        pointerPosition.y,
      ],
    });

    layer.current?.add(line.current);
  }

  const handlePointerMove = (e: KonvaEventObject<PointerEvent>) => {
    if (
      !penDownRef.current ||
      !stage.current ||
      !wizard.current ||
      !layer.current ||
      !line.current
    )
      return;

    var pointerPos = stage.current.getPointerPosition();
    if (!pointerPos) return;

    const newPoints = line.current
      .points()
      .concat([pointerPos.x, pointerPos.y]);
    line.current.points(newPoints);
  };

  useEffect(() => {
    const stg = new Konva.Stage({
      width: 500,
      height: 500,
      container: "canvas",
      name: "stage",
    });

    stg.on("pointerdown", handlePointerDown);
    stg.on("pointerup", handlePointerUp);
    stg.on("pointermove", handlePointerMove);

    const lyr = new Konva.Layer();
    stg.add(lyr);
    layer.current = lyr;
    stage.current = stg;
  }, []);

  return (
    <div className="app">
      <div className="head">Pen and erasors</div>
      <Wizard ref={wizard} />
      <div id="canvas"></div>
    </div>
  );
}

export default App;
