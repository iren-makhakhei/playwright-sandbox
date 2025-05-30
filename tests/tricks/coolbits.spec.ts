import { test, expect } from '@playwright/test';


test.describe('Coolbits Feature Testing', () => {

    test(' Check TestInfo Object', async ({ page }, testInfo) => {
        // Log the test info object
        console.log('Test Info:', testInfo);

        // Assert that the test info object is not null
        expect(testInfo).not.toBeNull();

        // Assert that the test info has a title
        expect(testInfo.title).toBe('Check TestInfo Object');

        // Assert that the test info has a status
        expect(testInfo.status).toBe('passed');
    });

    test('Test Skip Browser ', async ({ page, browserName }) => {

        test.skip(browserName === 'chromium', 'Skipping test in Chromium browser');
        // same as skip, just specifically noting to fix it later
        //test.fixme(browserName === 'chromium', 'Skipping test in Chromium browser');
        
        // Navigate to a sample page
        await page.goto('https://example.com');
        
    });
    
    const users = ['standard_user', 'locked_out_user',  'problem_user',  'performance_glitch_user',  'error_user',  'visual_user'];
    for (const user of users ) {
        test(`circular for ${user}`, async ({ page })  => {
            await page.goto('https://www.saucedemo.com/')
            await page.fill('#user-name', `${user}`)
        })
    }

    test('Multitab', async ({ browser }) => {
        const context = await browser.newContext();
        const page1 = await context.newPage();
        const page2 = await context.newPage();
        await page1.goto('https://example.com');
        await page1.waitForTimeout(3500);
        await page2.goto('https://www.saucedemo.com/');
        await page2.waitForTimeout(3500);
    })
})
