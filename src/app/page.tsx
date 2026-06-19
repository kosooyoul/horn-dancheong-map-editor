'use client';

import { Button } from '@/components/Button';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Horn Dancheong
            <span className="block text-blue-600 dark:text-blue-400">Map Editor</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            게임 맵을 쉽고 직관적으로 제작할 수 있는 웹 기반 맵 에디터입니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              aria-label="새 맵 만들기"
            >
              새 맵 만들기
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              aria-label="기존 맵 불러오기"
            >
              기존 맵 불러오기
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                직관적인 UI
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                드래그 앤 드롭으로 쉽게 맵을 편집할 수 있습니다.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                빠른 성능
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                웹 기술 기반으로 빠르고 반응성 좋은 편집 환경을 제공합니다.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-4">💾</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                다양한 포맷 지원
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                JSON, XML 등 다양한 포맷으로 맵 데이터를 내보낼 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
