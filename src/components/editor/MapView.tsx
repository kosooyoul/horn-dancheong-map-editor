'use client';

import { useRef, useState } from 'react';
import type { EditorTool, MapData } from '@/types';
import { getFloorId, getObjectId, getRectBounds, toIndex } from '@/utils/mapUtils';
import {
  getFloorColorClass,
  getObjectColorClass,
  TRANSPARENT_CHECKER_CLASS,
} from '@/utils/palette';

interface MapViewProps {
  mapData: MapData;
  tool: EditorTool;
  onApplyCell: (index: number) => void;
  onApplyRect: (startIndex: number, endIndex: number) => void;
}

interface RectSelection {
  startIndex: number;
  endIndex: number;
}

export const MapView = ({ mapData, tool, onApplyCell, onApplyRect }: MapViewProps) => {
  const isPaintingRef = useRef(false);
  const [rectSelection, setRectSelection] = useState<RectSelection | null>(null);

  const handlePointerUp = () => {
    isPaintingRef.current = false;
    if (rectSelection) {
      onApplyRect(rectSelection.startIndex, rectSelection.endIndex);
      setRectSelection(null);
    }
  };

  const handleCellPointerDown = (index: number) => {
    if (tool === 'rect') {
      setRectSelection({ startIndex: index, endIndex: index });
      return;
    }

    // 채우기 툴은 드래그가 아닌 단일 클릭으로만 적용
    isPaintingRef.current = tool === 'pen';
    onApplyCell(index);
  };

  const handleCellPointerEnter = (index: number) => {
    if (tool === 'rect') {
      setRectSelection((prev) => (prev ? { ...prev, endIndex: index } : prev));
      return;
    }

    if (!isPaintingRef.current) return;
    onApplyCell(index);
  };

  const handleCellKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    onApplyCell(index);
  };

  const rectBounds = rectSelection
    ? getRectBounds(rectSelection.startIndex, rectSelection.endIndex, mapData.width)
    : null;

  const isInRectPreview = (x: number, y: number): boolean => {
    if (!rectBounds) return false;
    return x >= rectBounds.minX && x <= rectBounds.maxX && y >= rectBounds.minY && y <= rectBounds.maxY;
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
              const cell = mapData.tiles[index];
              const floorClass = getFloorColorClass(getFloorId(cell));
              const objectClass = getObjectColorClass(getObjectId(cell));
              const isPreview = isInRectPreview(x, y);

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
                  {isPreview && (
                    <span
                      className="pointer-events-none absolute inset-0 z-10 bg-blue-500/40 outline outline-1 -outline-offset-1 outline-blue-500"
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
