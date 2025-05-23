import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/api',
  testMatch: '**/*.spec.ts',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'https://reqres.in',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json', 
      'x-api-key': 'reqres-free-v1'
    },
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
     }
  ]
});