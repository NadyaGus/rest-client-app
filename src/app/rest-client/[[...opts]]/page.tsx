'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Suspense, use } from 'react';

import { RestClientSkeleton } from './rest-client-skeleton';

const RestClientContent = dynamic(() => import('./rest-client-content').then((mod) => mod.RestClientContent), {
  ssr: false,
  loading: () => <RestClientSkeleton />,
});

export default function RestClientPage({ params }: { params: Promise<{ opts?: string[] }> }) {
  const { opts } = use(params);
  const searchParams = useSearchParams();

  return (
    <Suspense fallback={<RestClientSkeleton />}>
      <RestClientContent opts={opts} searchParams={searchParams} />
    </Suspense>
  );
}
