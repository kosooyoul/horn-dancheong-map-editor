// 맵 에디터 기본 타입 정의

// 편집 모드: 바닥타일 / 오브젝트
export type EditorMode = 'floor' | 'object';

// 그리기 툴: 펜(개별 칠) / 채우기(연결된 같은 값 일괄 칠) / 사각형(영역 지정 칠)
export type EditorTool = 'pen' | 'fill' | 'rect';

// 맵 데이터
// - tiles: 각 칸의 정수값 배열 (length === width * height)
// - 칸의 정수값 구성: 하위 바이트(0x0000FF)=바닥타일, 다음 바이트(0x00FF00)=오브젝트
export interface MapData {
  mapName: string;
  description?: string;
  width: number;
  height: number;
  tiles: number[];
}

// 팔레트 항목 (바닥타일 또는 오브젝트)
// - id 0 은 "지우개"(해당 칸의 값을 비움)를 의미
export interface PaletteItem {
  id: number;
  name: string;
  colorClass: string;
}
