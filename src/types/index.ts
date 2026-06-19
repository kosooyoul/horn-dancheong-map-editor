// 맵 에디터 기본 타입 정의

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface MapTile {
  id: string;
  type: string;
  position: Position;
  texture?: string;
  properties?: Record<string, any>;
}

export interface MapLayer {
  id: string;
  name: string;
  visible: boolean;
  tiles: MapTile[];
}

export interface GameMap {
  id: string;
  name: string;
  size: Size;
  tileSize: number;
  layers: MapLayer[];
  metadata?: Record<string, any>;
}

export interface Tool {
  id: string;
  name: string;
  icon: string;
  cursor?: string;
}

export interface EditorState {
  selectedTool: string;
  currentLayer: string;
  zoom: number;
  pan: Position;
  isGridVisible: boolean;
}