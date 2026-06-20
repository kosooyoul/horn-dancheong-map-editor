'use client';

import { useState } from 'react';

interface NewMapDialogProps {
  isOpen: boolean;
  onConfirm: (mapName: string, width: number, height: number, description?: string) => void;
  onCancel: () => void;
}

const MIN_SIZE = 1;
const MAX_SIZE = 128;
const DEFAULT_SIZE = 16;

const clampSize = (value: number): number => {
  if (Number.isNaN(value)) return MIN_SIZE;
  return Math.min(MAX_SIZE, Math.max(MIN_SIZE, Math.floor(value)));
};

const INPUT_CLASS =
  'rounded-none border-b-2 border-zinc-600 bg-zinc-800 px-3 py-2 text-base text-white focus:border-blue-500 focus:outline-none';

export const NewMapDialog = ({ isOpen, onConfirm, onCancel }: NewMapDialogProps) => {
  const [mapName, setMapName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [width, setWidth] = useState<number>(DEFAULT_SIZE);
  const [height, setHeight] = useState<number>(DEFAULT_SIZE);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedName = mapName.trim() || '새 맵';
    const trimmedDesc = description.trim() || undefined;
    onConfirm(trimmedName, clampSize(width), clampSize(height), trimmedDesc);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="새 맵 만들기"
    >
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-zinc-900 p-6 text-white">
        <h2 className="mb-6 text-lg font-light uppercase tracking-widest">새 맵</h2>

        <div className="mb-4 flex flex-col gap-2">
          <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
            맵 이름
            <input
              type="text"
              value={mapName}
              onChange={(event) => setMapName(event.target.value)}
              placeholder="새 맵"
              aria-label="맵 이름"
              className={INPUT_CLASS}
            />
          </label>
        </div>

        <div className="mb-6 flex flex-col gap-2">
          <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
            설명 (선택)
            <input
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="맵 설명을 입력하세요"
              aria-label="맵 설명"
              className={INPUT_CLASS}
            />
          </label>
        </div>

        <div className="mb-6 flex gap-4">
          <label className="flex flex-1 flex-col gap-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
            너비 (칸)
            <input
              type="number"
              min={MIN_SIZE}
              max={MAX_SIZE}
              value={width}
              onChange={(event) => setWidth(Number(event.target.value))}
              aria-label="맵 너비 (칸)"
              className={INPUT_CLASS}
            />
          </label>

          <label className="flex flex-1 flex-col gap-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
            높이 (칸)
            <input
              type="number"
              min={MIN_SIZE}
              max={MAX_SIZE}
              value={height}
              onChange={(event) => setHeight(Number(event.target.value))}
              aria-label="맵 높이 (칸)"
              className={INPUT_CLASS}
            />
          </label>
        </div>

        <div className="flex justify-end gap-px">
          <button
            type="button"
            tabIndex={0}
            aria-label="취소"
            onClick={onCancel}
            className="rounded-none bg-zinc-700 px-5 py-2 text-sm font-medium tracking-wide text-white transition-colors hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/60"
          >
            취소
          </button>
          <button
            type="submit"
            tabIndex={0}
            aria-label="맵 만들기 확인"
            className="rounded-none bg-blue-600 px-5 py-2 text-sm font-medium tracking-wide text-white transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/60"
          >
            확인
          </button>
        </div>
      </form>
    </div>
  );
};
