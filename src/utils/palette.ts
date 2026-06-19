import type { PaletteItem } from '@/types';

// 투명(빈 값)을 나타내는 체크무늬 배경 클래스
// 지우개 팔레트 칸과 투명 바닥타일(id 0) 칸 표시에 공통 사용
export const TRANSPARENT_CHECKER_CLASS =
  'bg-[repeating-conic-gradient(#52525b_0%_25%,#3f3f46_0%_50%)] bg-[length:10px_10px]';

// 지우개(비우기) 항목: 모든 모드에서 맨 앞에 노출
export const ERASER_ITEM: PaletteItem = {
  id: 0,
  name: '지우개',
  colorClass: 'bg-transparent',
};

// 바닥타일 목록 (단청 색감 기반)
export const FLOOR_TILES: PaletteItem[] = [
  { id: 1, name: '적색 바닥', colorClass: 'bg-red-300' },
  { id: 2, name: '청색 바닥', colorClass: 'bg-sky-300' },
  { id: 3, name: '녹색 바닥', colorClass: 'bg-emerald-300' },
  { id: 4, name: '황색 바닥', colorClass: 'bg-amber-200' },
  { id: 5, name: '백색 바닥', colorClass: 'bg-stone-100' },
];

// 오브젝트 목록
export const OBJECTS: PaletteItem[] = [
  { id: 1, name: '기둥', colorClass: 'bg-rose-600' },
  { id: 2, name: '등', colorClass: 'bg-yellow-400' },
  { id: 3, name: '나무', colorClass: 'bg-green-700' },
  { id: 4, name: '바위', colorClass: 'bg-gray-500' },
  { id: 5, name: '문', colorClass: 'bg-amber-800' },
];

// id로 바닥타일 색상 클래스 조회 (0 또는 미존재 시 null)
export const getFloorColorClass = (id: number): string | null =>
  FLOOR_TILES.find((tile) => tile.id === id)?.colorClass ?? null;

// id로 오브젝트 색상 클래스 조회 (0 또는 미존재 시 null)
export const getObjectColorClass = (id: number): string | null =>
  OBJECTS.find((object) => object.id === id)?.colorClass ?? null;
