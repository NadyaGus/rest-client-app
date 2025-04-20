import Home from '@/app/page';
import { render, screen } from '@testing-library/react';
import { it } from 'node:test';
import { expect, test } from 'vitest';

test('Page component', () => {
  it('renders the initial app page for not signed user', () => {
    render(<Home />);
    expect(screen.findByText('Welcome to RESTful Client App')).toBeTruthy();
    expect(screen.findByText('A lightweight client for RESTful APIs')).toBeTruthy();
    expect(screen.findByRole('link', { name: 'Sign in' })).toBeTruthy();
    expect(screen.findByRole('link', { name: 'Sign up' })).toBeTruthy();
  });
});
