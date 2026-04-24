import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('http://localhost:5174/#corridor');
  await page.waitForTimeout(3000);
  
  // Scroll to the video section
  const video = await page.locator('video').first();
  if (video) {
    await video.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
  }
  
  await page.screenshot({ path: 'video-player-view.png', fullPage: false });
  await browser.close();
})();
