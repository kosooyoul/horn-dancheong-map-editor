'use client';

import { useRef } from 'react';
import type { EditorTool, MapData } from '@/types';
import { getFloorId, getObjectId, toIndex } from '@/utils/mapUtils';
import {
  getFloorColorClass,
  getObjectColorClass,
  TRANSPARENT_CHECKER_CLASS,
} from '@/utils/palette';

interface MapViewProps {
  mapData: MapData;
  tool: EditorTool;
  onApplyCell: (index: number) => void;
}

export const MapView = ({ mapData, tool, onApplyCell }: MapViewProps) => {
  const isPaintingRef = useRef(false);

  const handlePointerUp = () => {
    isPaintingRef.current = false;
  };

  const handleCellPointerDown = (index: number) => {
    // 채우기 툴은 드래그가 아닌 단일 클릭으로만 적용
    isPaintingRef.current = tool === 'pen';
    onApplyCell(index);
  };

  const handleCellPointerEnter = (index: number) => {
    if (!isPaintingRef.current) return;
    onApplyCell(index);
  };

  const handleCellKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    onApplyCell(index);
  };

  return (
    <main
      className="flex-1 overflow-auto bg-zinc-300 p-6 dark:bg-zinc-700"
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
    >
      <div
        className="inline-block select-none border border-zinc-900/20 bg-zinc-900/10"
        role="grid"
        aria-label="맵 뷰"
      >
        {Array.from({ length: mapData.height }, (_, y) => (
          <div key={y} className="flex" role="row">
            {Array.from({ length: mapData.width }, (_, x) => {
              const index = toIndex(x, y, mapData.width);
              const cell = mapData.cells[index];
              const floorClass = getFloorColorClass(getFloorId(cell));
              const objectClass = getObjectColorClass(getObjectId(cell));

              return (
                <button
                  key={x}
                  type="button"
                  tabIndex={0}
                  role="gridcell"
                  aria-label={`${x}, ${y} 칸`}
                  onMouseDown={() => handleCellPointerDown(index)}
                  onMouseEnter={() => handleCellPointerEnter(index)}
                  onKeyDown={(event) => handleCellKeyDown(event, index)}
                  className={`relative flex h-8 w-8 shrink-0 items-center justify-center outline outline-1 -outline-offset-1 outline-zinc-900/10 hover:outline-blue-500 focus:z-10 focus:outline-2 focus:outline-blue-500 ${
                    floorClass ?? TRANSPARENT_CHECKER_CLASS
                  }`}
                >
                  {objectClass && (
                    <span
                      className={`h-5 w-5 border border-black/30 ${objectClass}`}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </main>
  );
};
