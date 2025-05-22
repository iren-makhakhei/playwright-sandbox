import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  testMatch: '**/*spec.ts',
  timeout: 30000,
  retries: 0,
  use: {
    headless: true,
    actionTimeout: 15000,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'off',
    screenshot: 'off',
  },
  // Add configuration for snapshot comparison
  expect: {
    toMatchSnapshot: { 
      maxDiffPixelRatio: 0.05,  // Allow 5% difference due to rendering differences
      threshold: 0.2 // Pixel-by-pixel comparison threshold
    }
  },
  projects: [
    {
        name: 'chromium',
        use: { browserName: 'chromium' },
    },
    {
        name: 'firefox',
        use: { browserName: 'firefox' },
    },
    {
        name: 'webkit',
        use: { browserName: 'webkit' },
    }
  ]
});