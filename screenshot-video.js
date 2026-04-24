const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('http://localhost:5174/#corridor');
  await page.waitForTimeout(3000);
  
  // Scroll to the video section
  const videoSection = await page.locator('video').first();
  if (videoSection) {
    await videoSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
  }
  
  await page.screenshot({ path: 'video-player-view.png', fullPage: false });
  await browser.close();
})();
