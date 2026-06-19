'use client';

import { Button } from './Button';

interface HeaderProps {
  onNewMap?: () => void;
  onLoadMap?: () => void;
  onSaveMap?: () => void;
}

export const Header = ({ onNewMap, onLoadMap, onSaveMap }: HeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Horn Dancheong Map Editor
          </h1>
        </div>

        <nav className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onNewMap}
            aria-label="새 맵 만들기"
          >
            새 맵
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={onLoadMap}
            aria-label="맵 불러오기"
          >
            불러오기
          </Button>
          
          <Button 
            variant="primary" 
            size="sm"
            onClick={onSaveMap}
            aria-label="맵 저장하기"
          >
            저장
          </Button>
        </nav>
      </div>
    </header>
  );
};