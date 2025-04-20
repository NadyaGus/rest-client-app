import { HistorySkeleton } from '@/app/history/history-skeleton';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('HistorySkeleton', () => {
  it('renders all skeleton elements', () => {
    const { container } = render(<HistorySkeleton />);
    const skeletons = container.getElementsByClassName('MuiSkeleton-root');

    expect(skeletons.length).toBeGreaterThan(0);
  });
});
