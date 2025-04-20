'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import Loading from './variables-skeleton';

const VariablesContent = dynamic(() => import('./variables-content').then((mod) => mod.VariablesContent), {
  ssr: false,
  loading: () => <Loading />,
});

export default function VariablesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <VariablesContent />
    </Suspense>
  );
}
