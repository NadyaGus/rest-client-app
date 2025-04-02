import { Header } from '@/components/header';
import { render, screen } from '@testing-library/react';
import { describe } from 'node:test';
import { test, expect } from 'vitest';

test('Header Component', () => {
  describe('renders the header with title', () => {
    render(<Header />);
    const header = screen.getByRole('heading', { name: 'RESTful Client' });
    expect(header).toBeInTheDocument();
  });
});
