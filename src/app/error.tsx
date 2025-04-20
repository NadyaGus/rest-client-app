'use client';

import { ErrorDisplay } from '@/components/error-display';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorDisplay message={error.message} onRetry={reset} />;
}
