import { ReactElement, useRef, useState } from "react";
import Konva from "konva";
import logo from "./logo.svg";
import { useImage } from "react-konva-utils";

import { Layer, Stage, Rect, Image, Line, Group } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

interface shapeConfig {
  type: "rect" | "line";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function App(): React.ReactElement {
  const [img, status] = useImage(logo);
  const [erasors, setErasors] = useState<Array<shapeConfig>>([]);

  function onDrag(e: KonvaEventObject<DragEvent>) {
    const { x, y }: { x: number; y: number } = e.target.attrs;

    setErasors(erasors.concat([
      {
        x1: x,
        y1: y,
        x2: x + 100,
        y2: y + 100,
        type: "rect",
      },
    ]));
  }

  function onDragStart(e: KonvaEventObject<DragEvent>) {
    const { x, y }: { x: number; y: number } = e.target.attrs;

    setErasors([
      {
        x1: x,
        y1: y,
        x2: x + 100,
        y2: y + 100,
        type: "rect",
      },
    ]);
  }

  return (
    <div style={{ width: "70vw", height: "70vh", border: "1px solid black" }}>
      <Stage width={1000} height={1000}>
        <Layer>
        <Group width={1000} height={1000}>
          <Image image={img} x={0} y={0} width={500} height={500} />
       
            {erasors.map((shape: shapeConfig, index) => (
              <Rect
                key={index}
                x={shape.x1}
                width={shape.x2 - shape.x1}
                height={shape.y2 - shape.y1}
                y={shape.y1}
                fill="#000"
              />
            ))}
          </Group>
        </Layer>
        <Layer>
          <Rect
            x={100}
            y={100}
            width={100}
            height={100}
            fill="red"
            onDragMove={onDrag}
            onDragStart={onDragStart}
            draggable
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
