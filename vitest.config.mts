import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    coverage: {
      include: ['**/*.tsx'],
      exclude: ['**/*.test.tsx', '**/node_modules/**', '**/`*.spec.tsx', 'src/__test__/setup-test.ts'],
      provider: 'v8',
      reporter: ['text'],
    },
    setupFiles: ['/vitest.setup.ts'],
  },
});
