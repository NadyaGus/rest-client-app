'use client';

import dynamic from 'next/dynamic';
import { Suspense, use } from 'react';

import Loading from './rest-client-skeleton';

const RestClientContent = dynamic(() => import('./rest-client-content').then((mod) => mod.RestClientContent), {
  ssr: false,
  loading: () => <Loading />,
});

export default function RestClientPage({ params }: { params: Promise<{ opts?: string[] }> }) {
  const { opts } = use(params);

  return (
    <Suspense fallback={<Loading />}>
      <RestClientContent opts={opts} />
    </Suspense>
  );
}
