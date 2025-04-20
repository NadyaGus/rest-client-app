'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { HistorySkeleton } from './history-skeleton';

const HistoryContent = dynamic(() => import('./history-content').then((mod) => mod.HistoryContent), {
  ssr: false,
  loading: () => <HistorySkeleton />,
});

export default function HistoryPage() {
  return (
    <Suspense fallback={<HistorySkeleton />}>
      <HistoryContent />
    </Suspense>
  );
}
