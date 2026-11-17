// Renders the label HTML to a print PDF (front + back, with 3 mm bleed)
// and PNG proofs with trim (magenta) and safe-zone (cyan) guides.
// Usage: node design/labels/render.js [ml] [harvest]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const ml = process.argv[2] || '500';
  const harvest = process.argv[3] || '2024';
  const src = 'file://' + path.join(__dirname, 'olive-oil-label.html');
  const out = path.join(__dirname, 'out');
  fs.mkdirSync(out, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 4 });

  await page.goto(`${src}?ml=${ml}&harvest=${harvest}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: path.join(out, `kallmi-oil-${ml}ml-print.pdf`),
    width: '54mm', height: '146mm', printBackground: true, preferCSSPageSize: true,
  });

  await page.goto(`${src}?ml=${ml}&harvest=${harvest}&proof=1`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const sheets = await page.$$('.sheet');
  await sheets[0].screenshot({ path: path.join(out, `kallmi-oil-${ml}ml-front-proof.png`) });
  await sheets[1].screenshot({ path: path.join(out, `kallmi-oil-${ml}ml-back-proof.png`) });

  await browser.close();
})();
