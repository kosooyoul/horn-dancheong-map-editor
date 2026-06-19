'use client';

import type { EditorMode, PaletteItem } from '@/types';
import { ERASER_ITEM, FLOOR_TILES, OBJECTS, TRANSPARENT_CHECKER_CLASS } from '@/utils/palette';

interface PaletteProps {
  mode: EditorMode;
  selectedId: number;
  onSelect: (id: number) => void;
}

export const Palette = ({ mode, selectedId, onSelect }: PaletteProps) => {
  const items: PaletteItem[] = [
    ERASER_ITEM,
    ...(mode === 'floor' ? FLOOR_TILES : OBJECTS),
  ];

  return (
    <section
      className="flex items-stretch gap-px overflow-x-auto bg-zinc-800 p-px"
      aria-label={mode === 'floor' ? '바닥타일 팔레트' : '오브젝트 팔레트'}
    >
      <span className="flex items-center px-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
        {mode === 'floor' ? '바닥타일' : '오브젝트'}
      </span>

      {items.map((item) => {
        const isSelected = item.id === selectedId;
        const isEraser = item.id === 0;

        return (
          <button
            key={item.id}
            type="button"
            tabIndex={0}
            aria-label={item.name}
            aria-pressed={isSelected}
            onClick={() => onSelect(item.id)}
            data-selected={isSelected}
            className={`h-10 w-10 shrink-0 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/60 data-[selected=true]:ring-2 data-[selected=true]:ring-inset data-[selected=true]:ring-blue-500 ${
              isEraser ? TRANSPARENT_CHECKER_CLASS : item.colorClass
            }`}
          />
        );
      })}
    </section>
  );
};
