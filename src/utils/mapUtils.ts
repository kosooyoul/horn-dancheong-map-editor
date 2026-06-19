import type { GameMap, MapLayer, MapTile, Position } from '@/types';

// 새 맵 생성 함수
export const createNewMap = (name: string, width: number, height: number, tileSize: number = 32): GameMap => {
  const baseLayer: MapLayer = {
    id: 'layer-1',
    name: 'Base Layer',
    visible: true,
    tiles: []
  };

  return {
    id: `map-${Date.now()}`,
    name,
    size: { width, height },
    tileSize,
    layers: [baseLayer],
    metadata: {
      createdAt: new Date().toISOString(),
      version: '1.0.0'
    }
  };
};

// 좌표를 그리드 위치로 변환
export const screenToGrid = (x: number, y: number, tileSize: number): Position => {
  return {
    x: Math.floor(x / tileSize),
    y: Math.floor(y / tileSize)
  };
};

// 그리드 위치를 화면 좌표로 변환
export const gridToScreen = (gridX: number, gridY: number, tileSize: number): Position => {
  return {
    x: gridX * tileSize,
    y: gridY * tileSize
  };
};

// 맵 데이터를 JSON으로 내보내기
export const exportMapToJSON = (map: GameMap): string => {
  return JSON.stringify(map, null, 2);
};

// JSON에서 맵 데이터 불러오기
export const importMapFromJSON = (jsonString: string): GameMap | null => {
  try {
    const map = JSON.parse(jsonString);
    return map;
  } catch (error) {
    console.error('맵 불러오기 오류:', error);
    return null;
  }
};