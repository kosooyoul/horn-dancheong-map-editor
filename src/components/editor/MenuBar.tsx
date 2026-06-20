'use client';

import type { EditorMode, EditorTool } from '@/types';

interface MenuBarProps {
  mode: EditorMode;
  tool: EditorTool;
  hasMap: boolean;
  mapName?: string;
  onNewMap: () => void;
  onLoadMap: () => void;
  onSaveMap: () => void;
  onModeChange: (mode: EditorMode) => void;
  onToolChange: (tool: EditorTool) => void;
}

const MODE_BUTTONS: { mode: EditorMode; label: string }[] = [
  { mode: 'floor', label: '바닥타일' },
  { mode: 'object', label: '오브젝트' },
];

const TOOL_BUTTONS: { tool: EditorTool; label: string }[] = [
  { tool: 'pen', label: '펜' },
  { tool: 'fill', label: '채우기' },
  { tool: 'rect', label: '사각형' },
];

const ACTION_BUTTON_CLASS =
  'rounded-none px-4 py-2 text-sm font-medium tracking-wide text-white transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/60 disabled:cursor-not-allowed disabled:opacity-40';

export const MenuBar = ({
  mode,
  tool,
  hasMap,
  mapName,
  onNewMap,
  onLoadMap,
  onSaveMap,
  onModeChange,
  onToolChange,
}: MenuBarProps) => {
  return (
    <header className="flex items-center gap-px bg-zinc-900">
      <h1 className="px-4 py-2 text-base font-light uppercase tracking-widest text-white">
        Dancheong Map Editor
      </h1>
      {mapName && (
        <span className="px-3 py-2 text-sm text-zinc-400" aria-label={`현재 맵: ${mapName}`}>
          — {mapName}
        </span>
      )}

      <nav className="flex items-center gap-px" aria-label="파일 메뉴">
        <button
          type="button"
          tabIndex={0}
          aria-label="새 맵 만들기"
          onClick={onNewMap}
          className={`${ACTION_BUTTON_CLASS} bg-blue-600 hover:bg-blue-500`}
        >
          새 맵
        </button>
        <button
          type="button"
          tabIndex={0}
          aria-label="맵 불러오기"
          onClick={onLoadMap}
          className={`${ACTION_BUTTON_CLASS} bg-zinc-700 hover:bg-zinc-600`}
        >
          맵 로드
        </button>
        <button
          type="button"
          tabIndex={0}
          aria-label="맵 저장하기"
          onClick={onSaveMap}
          disabled={!hasMap}
          className={`${ACTION_BUTTON_CLASS} bg-zinc-700 hover:bg-zinc-600`}
        >
          맵 저장
        </button>
      </nav>

      <span className="mx-2 h-6 w-px bg-zinc-700" aria-hidden="true" />

      <nav className="flex items-center gap-px" aria-label="편집 모드">
        {MODE_BUTTONS.map(({ mode: buttonMode, label }) => {
          const isActive = mode === buttonMode;

          return (
            <button
              key={buttonMode}
              type="button"
              tabIndex={0}
              aria-label={`${label} 모드`}
              aria-pressed={isActive}
              onClick={() => onModeChange(buttonMode)}
              className={`${ACTION_BUTTON_CLASS} ${
                isActive ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-zinc-700 hover:bg-zinc-600'
              }`}
            >
              {label}
            </button>
          );
        })}
      </nav>

      <span className="mx-2 h-6 w-px bg-zinc-700" aria-hidden="true" />

      <nav className="flex items-center gap-px" aria-label="그리기 툴">
        {TOOL_BUTTONS.map(({ tool: buttonTool, label }) => {
          const isActive = tool === buttonTool;

          return (
            <button
              key={buttonTool}
              type="button"
              tabIndex={0}
              aria-label={`${label} 툴`}
              aria-pressed={isActive}
              onClick={() => onToolChange(buttonTool)}
              className={`${ACTION_BUTTON_CLASS} ${
                isActive ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-zinc-700 hover:bg-zinc-600'
              }`}
            >
              {label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
