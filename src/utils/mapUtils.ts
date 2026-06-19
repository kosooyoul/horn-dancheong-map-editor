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
export const createNewMap = (width: number, height: number): MapData => {
  const cells = new Array<number>(width * height).fill(DEFAULT_FLOOR_ID);
  return { width, height, cells };
};

// (x, y) 좌표를 cells 배열 인덱스로 변환
export const toIndex = (x: number, y: number, width: number): number => y * width + x;

// 채우기(flood fill): startIndex 칸과 상하좌우로 연결된 "같은 값" 영역을
// 현재 모드(바닥/오브젝트)에 맞춰 targetId로 일괄 변경한 새 cells 반환
export const floodFill = (
  mapData: MapData,
  startIndex: number,
  mode: EditorMode,
  targetId: number,
): number[] => {
  const { width, height, cells } = mapData;
  const getId = mode === 'floor' ? getFloorId : getObjectId;
  const setId = mode === 'floor' ? setFloorId : setObjectId;

  const sourceId = getId(cells[startIndex]);
  if (sourceId === targetId) return cells;

  const nextCells = [...cells];
  const visited = new Set<number>();
  const stack: number[] = [startIndex];

  while (stack.length > 0) {
    const index = stack.pop()!;
    if (visited.has(index)) continue;
    visited.add(index);
    if (getId(nextCells[index]) !== sourceId) continue;

    nextCells[index] = setId(nextCells[index], targetId);

    const x = index % width;
    const y = Math.floor(index / width);
    if (x > 0) stack.push(index - 1);
    if (x < width - 1) stack.push(index + 1);
    if (y > 0) stack.push(index - width);
    if (y < height - 1) stack.push(index + width);
  }

  return nextCells;
};

// 맵 데이터를 JSON 문자열로 직렬화
export const exportMapToJSON = (map: MapData): string => JSON.stringify(map, null, 2);

// 알 수 없는 값이 유효한 MapData 형태인지 검증
export const isValidMapData = (value: unknown): value is MapData => {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  const { width, height, cells } = candidate;

  if (typeof width !== 'number' || typeof height !== 'number') return false;
  if (!Number.isInteger(width) || !Number.isInteger(height)) return false;
  if (width < 1 || height < 1) return false;
  if (!Array.isArray(cells)) return false;
  if (cells.length !== width * height) return false;

  return cells.every((cell) => typeof cell === 'number');
};

// JSON 문자열에서 맵 데이터 파싱 (실패 시 null)
export const importMapFromJSON = (jsonString: string): MapData | null => {
  try {
    const parsed: unknown = JSON.parse(jsonString);
    if (!isValidMapData(parsed)) {
      console.error('맵 불러오기 오류: 유효하지 않은 맵 데이터 형식입니다.');
      return null;
    }
    return parsed;
  } catch (error) {
    console.error('맵 불러오기 오류:', error);
    return null;
  }
};
