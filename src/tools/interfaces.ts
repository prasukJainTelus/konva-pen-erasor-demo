export interface IToolParams {
  color: string;
  x: number;
  y: number;
}

export interface ILineToolParams extends IToolParams {
  strokeWidth: number;
}

export interface IRectToolParams extends IToolParams {
  width: number;
  height: number;
}

export interface IEllipseToolParams extends IToolParams {
  radiusX: number;
  radiusY: number;
}
