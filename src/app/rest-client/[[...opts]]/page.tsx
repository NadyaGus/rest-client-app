'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Suspense, use } from 'react';

import Loading from './rest-client-skeleton';

const RestClientContent = dynamic(() => import('./rest-client-content').then((mod) => mod.RestClientContent), {
  ssr: false,
  loading: () => <Loading />,
});

export default function RestClientPage({ params }: { params: Promise<{ opts?: string[] }> }) {
  const { opts } = use(params);
  const searchParams = useSearchParams();

  return (
    <Suspense fallback={<Loading />}>
      <RestClientContent opts={opts} searchParams={searchParams} />
    </Suspense>
  );
}
