import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  testMatch: '**/*spec.ts',  // Updated to match TypeScript files
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