import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/ui',
  testMatch: '**/*spec.ts',  // Updated to match TypeScript files
  timeout: 30000,
  retries: 0,
  use: {
    headless: true,
    actionTimeout: 15000,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
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