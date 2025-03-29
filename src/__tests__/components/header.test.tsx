import { Header } from '@/components/header/Header';
import { render, screen } from '@testing-library/react';
import { describe } from 'node:test';
import { test, expect } from 'vitest';

test('Header tests', () => {
  describe('Header should render', () => {
    render(<Header />);
    const header = screen.getByRole('heading', { name: 'RESTful Client' });
    expect(header).toBeInTheDocument();
  });
});
