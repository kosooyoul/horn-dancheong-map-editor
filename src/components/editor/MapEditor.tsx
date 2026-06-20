'use client';

import { useRef, useState } from 'react';
import type { EditorMode, EditorTool, MapData } from '@/types';
import {
  createNewMap,
  exportMapToJSON,
  fillRect,
  floodFill,
  importMapFromJSON,
  setFloorId,
  setObjectId,
} from '@/utils/mapUtils';
import { MenuBar } from './MenuBar';
import { Palette } from './Palette';
import { MapView } from './MapView';
import { NewMapDialog } from './NewMapDialog';

export const MapEditor = () => {
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [mode, setMode] = useState<EditorMode>('floor');
  const [tool, setTool] = useState<EditorTool>('pen');
  const [selectedFloorId, setSelectedFloorId] = useState<number>(1);
  const [selectedObjectId, setSelectedObjectId] = useState<number>(1);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedId = mode === 'floor' ? selectedFloorId : selectedObjectId;

  const handleSelect = (id: number) => {
    if (mode === 'floor') {
      setSelectedFloorId(id);
      return;
    }
    setSelectedObjectId(id);
  };

  const handleApplyCell = (index: number) => {
    setMapData((prev) => {
      if (!prev) return prev;

      if (tool === 'fill') {
        const nextTiles = floodFill(prev, index, mode, selectedId);
        if (nextTiles === prev.tiles) return prev;
        return { ...prev, tiles: nextTiles };
      }

      const nextTiles = [...prev.tiles];
      nextTiles[index] =
        mode === 'floor'
          ? setFloorId(nextTiles[index], selectedFloorId)
          : setObjectId(nextTiles[index], selectedObjectId);
      return { ...prev, tiles: nextTiles };
    });
  };

  const handleApplyRect = (startIndex: number, endIndex: number) => {
    setMapData((prev) => {
      if (!prev) return prev;
      const nextTiles = fillRect(prev, startIndex, endIndex, mode, selectedId);
      return { ...prev, tiles: nextTiles };
    });
  };

  const handleConfirmNewMap = (
    mapName: string,
    width: number,
    height: number,
    description?: string,
  ) => {
    setMapData(createNewMap(mapName, width, height, description));
    setIsDialogOpen(false);
  };

  const handleSaveMap = () => {
    if (!mapData) return;

    const json = exportMapToJSON(mapData);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;

    const safeName = mapData.mapName.replace(/[^a-zA-Z0-9가-힣_\- ]/g, '').trim() || 'map';
    anchor.download = `${safeName}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadMap = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    try {
      const text = await file.text();
      const loadedMap = importMapFromJSON(text);
      if (!loadedMap) {
        window.alert('유효하지 않은 맵 파일입니다.');
        return;
      }
      setMapData(loadedMap);
    } catch (error) {
      console.error('맵 파일 읽기 오류:', error);
      window.alert('맵 파일을 읽는 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex h-screen flex-col bg-zinc-300 dark:bg-zinc-700">
      <MenuBar
        mode={mode}
        tool={tool}
        hasMap={mapData !== null}
        mapName={mapData?.mapName}
        onNewMap={() => setIsDialogOpen(true)}
        onLoadMap={handleLoadMap}
        onSaveMap={handleSaveMap}
        onModeChange={setMode}
        onToolChange={setTool}
      />
      <Palette mode={mode} selectedId={selectedId} onSelect={handleSelect} />

      {mapData ? (
        <MapView
          mapData={mapData}
          tool={tool}
          onApplyCell={handleApplyCell}
          onApplyRect={handleApplyRect}
        />
      ) : (
        <main className="flex flex-1 items-center justify-center">
          <p className="text-sm uppercase tracking-widest text-zinc-600 dark:text-zinc-300">
            상단 메뉴의 &quot;새 맵&quot; 또는 &quot;맵 로드&quot;로 시작하세요.
          </p>
        </main>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />

      <NewMapDialog
        isOpen={isDialogOpen}
        onConfirm={handleConfirmNewMap}
        onCancel={() => setIsDialogOpen(false)}
      />
    </div>
  );
};
