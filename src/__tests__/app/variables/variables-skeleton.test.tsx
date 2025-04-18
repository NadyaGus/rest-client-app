import VariablesSkeleton from '@/app/variables/variables-skeleton';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('VariablesSkeleton', () => {
  it('renders all skeleton elements', () => {
    const { container } = render(<VariablesSkeleton />);
    const skeletons = container.getElementsByClassName('MuiSkeleton-root');

    expect(skeletons.length).toBeGreaterThan(0);
  });
});
