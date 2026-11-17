// Renders a label HTML file to a print PDF (front + back, page size and
// bleed come from the file's @page rule) and PNG proofs with trim (magenta)
// and safe-zone (cyan) guides.
//
// Usage:
//   node design/labels/render.js                          → bottle, 500 ml
//   node design/labels/render.js bottle 750 2027          → bottle, 750 ml, harvest 2027
//   node design/labels/render.js tin                      → 3 l tin
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const FORMATS = {
  bottle: { file: 'olive-oil-label.html', vol: '500', unit: 'ml' },
  tin:    { file: 'olive-oil-tin-3l.html', vol: '3',  unit: 'l'  },
};

(async () => {
  const fmt = FORMATS[process.argv[2] || 'bottle'];
  if (!fmt) throw new Error(`format must be one of: ${Object.keys(FORMATS).join(', ')}`);
  const vol = process.argv[3] || fmt.vol;
  const harvest = process.argv[4] || '2026';
  const src = 'file://' + path.join(__dirname, fmt.file);
  const name = `kallmi-oil-${vol}${fmt.unit}`;
  const out = path.join(__dirname, 'out');
  fs.mkdirSync(out, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 4 });

  await page.goto(`${src}?ml=${vol}&harvest=${harvest}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: path.join(out, `${name}-print.pdf`), printBackground: true, preferCSSPageSize: true });

  await page.goto(`${src}?ml=${vol}&harvest=${harvest}&proof=1`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const sheets = await page.$$('.sheet');
  await sheets[0].screenshot({ path: path.join(out, `${name}-front-proof.png`) });
  await sheets[1].screenshot({ path: path.join(out, `${name}-back-proof.png`) });

  await browser.close();

  // Press version for the printer: outlined text + trim/bleed boxes (see press.py).
  // Needs Ghostscript and pypdf: apt-get install ghostscript && pip install pypdf
  try {
    execFileSync('python3', [path.join(__dirname, 'press.py'),
      path.join(out, `${name}-print.pdf`), path.join(out, `${name}-PRESS.pdf`), '3']);
  } catch (e) {
    console.warn('Skipped press PDF:', e.message);
  }
})();
