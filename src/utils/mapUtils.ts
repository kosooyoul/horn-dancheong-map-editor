import type { EditorMode, MapData } from '@/types';

// 칸 정수값 비트 구성
// 0x0000FF: 바닥타일 정보, 0x00FF00: 오브젝트 정보
export const FLOOR_MASK = 0x0000ff;
export const OBJECT_MASK = 0x00ff00;
export const OBJECT_SHIFT = 8;

// 새 맵 생성 시 기본으로 깔리는 바닥타일 id
export const DEFAULT_FLOOR_ID = 1;

// 칸 값에서 바닥타일 id 추출
export const getFloorId = (cell: number): number => cell & FLOOR_MASK;

// 칸 값에서 오브젝트 id 추출
export const getObjectId = (cell: number): number => (cell & OBJECT_MASK) >> OBJECT_SHIFT;

// 칸 값에 바닥타일 id 적용 (다른 비트는 보존)
export const setFloorId = (cell: number, floorId: number): number =>
  (cell & ~FLOOR_MASK) | (floorId & 0xff);

// 칸 값에 오브젝트 id 적용 (다른 비트는 보존)
export const setObjectId = (cell: number, objectId: number): number =>
  (cell & ~OBJECT_MASK) | ((objectId & 0xff) << OBJECT_SHIFT);

// 기본 바닥으로 채워진 새 맵 생성
export const createNewMap = (
  mapName: string,
  width: number,
  height: number,
  description?: string,
): MapData => {
  const tiles = new Array<number>(width * height).fill(DEFAULT_FLOOR_ID);
  return { mapName, description, width, height, tiles };
};

// (x, y) 좌표를 tiles 배열 인덱스로 변환
export const toIndex = (x: number, y: number, width: number): number => y * width + x;

// 채우기(flood fill): startIndex 칸과 상하좌우로 연결된 "같은 값" 영역을
// 현재 모드(바닥/오브젝트)에 맞춰 targetId로 일괄 변경한 새 tiles 반환
export const floodFill = (
  mapData: MapData,
  startIndex: number,
  mode: EditorMode,
  targetId: number,
): number[] => {
  const { width, height, tiles } = mapData;
  const getId = mode === 'floor' ? getFloorId : getObjectId;
  const setId = mode === 'floor' ? setFloorId : setObjectId;

  const sourceId = getId(tiles[startIndex]);
  if (sourceId === targetId) return tiles;

  const nextTiles = [...tiles];
  const visited = new Set<number>();
  const stack: number[] = [startIndex];

  while (stack.length > 0) {
    const index = stack.pop()!;
    if (visited.has(index)) continue;
    visited.add(index);
    if (getId(nextTiles[index]) !== sourceId) continue;

    nextTiles[index] = setId(nextTiles[index], targetId);

    const x = index % width;
    const y = Math.floor(index / width);
    if (x > 0) stack.push(index - 1);
    if (x < width - 1) stack.push(index + 1);
    if (y > 0) stack.push(index - width);
    if (y < height - 1) stack.push(index + width);
  }

  return nextTiles;
};

// 두 인덱스를 양 끝점으로 하는 사각형 영역의 경계(min/max 좌표) 계산
export const getRectBounds = (
  startIndex: number,
  endIndex: number,
  width: number,
): { minX: number; maxX: number; minY: number; maxY: number } => {
  const startX = startIndex % width;
  const startY = Math.floor(startIndex / width);
  const endX = endIndex % width;
  const endY = Math.floor(endIndex / width);

  return {
    minX: Math.min(startX, endX),
    maxX: Math.max(startX, endX),
    minY: Math.min(startY, endY),
    maxY: Math.max(startY, endY),
  };
};

// 사각형 영역 채우기: startIndex~endIndex를 양 끝점으로 하는 사각형 내부 칸을
// 현재 모드(바닥/오브젝트)에 맞춰 targetId로 변경한 새 tiles 반환
export const fillRect = (
  mapData: MapData,
  startIndex: number,
  endIndex: number,
  mode: EditorMode,
  targetId: number,
): number[] => {
  const { width } = mapData;
  const setId = mode === 'floor' ? setFloorId : setObjectId;
  const { minX, maxX, minY, maxY } = getRectBounds(startIndex, endIndex, width);

  const nextTiles = [...mapData.tiles];
  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const index = y * width + x;
      nextTiles[index] = setId(nextTiles[index], targetId);
    }
  }
  return nextTiles;
};

// 맵 데이터를 JSON 문자열로 직렬화
export const exportMapToJSON = (map: MapData): string => JSON.stringify(map, null, 2);

// 알 수 없는 값이 유효한 MapData 형태인지 검증
// 하위 호환성을 위해 구 형식(cells 필드)도 tiles로 마이그레이션하여 수용
export const isValidMapData = (value: unknown): value is MapData => {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  const { mapName, width, height } = candidate;
  const tilesOrCells = candidate.tiles ?? candidate.cells;

  if (typeof width !== 'number' || typeof height !== 'number') return false;
  if (!Number.isInteger(width) || !Number.isInteger(height)) return false;
  if (width < 1 || height < 1) return false;
  if (!Array.isArray(tilesOrCells)) return false;
  if (tilesOrCells.length !== width * height) return false;
  if (!tilesOrCells.every((cell) => typeof cell === 'number')) return false;

  // mapName이 없으면 빈 문자열로 처리 (구 형식 호환)
  if (mapName !== undefined && typeof mapName !== 'string') return false;

  return true;
};

// JSON 문자열에서 맵 데이터 파싱 (실패 시 null)
// 구 형식(cells)을 새 형식(tiles)으로 자동 마이그레이션
export const importMapFromJSON = (jsonString: string): MapData | null => {
  try {
    const parsed: unknown = JSON.parse(jsonString);
    if (!isValidMapData(parsed)) {
      console.error('맵 불러오기 오류: 유효하지 않은 맵 데이터 형식입니다.');
      return null;
    }

    const candidate = parsed as unknown as Record<string, unknown>;

    // 구 형식(cells) → 신 형식(tiles) 마이그레이션
    const tiles = (candidate.tiles ?? candidate.cells) as number[];
    const mapName = typeof candidate.mapName === 'string' ? candidate.mapName : '불러온 맵';
    const description =
      typeof candidate.description === 'string' ? candidate.description : undefined;

    return {
      mapName,
      description,
      width: parsed.width,
      height: parsed.height,
      tiles,
    };
  } catch (error) {
    console.error('맵 불러오기 오류:', error);
    return null;
  }
};
