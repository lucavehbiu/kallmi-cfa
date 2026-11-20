// Renders a label HTML file to a print PDF (page size and bleed come from the
// file's @page rule) and PNG proofs with trim (magenta) and safe-zone (cyan)
// guides, then a PRESS PDF for the printer (see press.py).
//
// Usage:
//   node design/labels/render.js                  → bottle 500 ml, front + back
//   node design/labels/render.js bottle 500 2027  → bottle 500 ml, harvest 2027
//   node design/labels/render.js small            → bottle 250 ml, front + back
//   node design/labels/render.js big              → bottle 750 ml, front + back
//   node design/labels/render.js tin              → 3 l tin, front (wide face)
//   node design/labels/render.js tinside          → 3 l tin, back (narrow side)
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const FORMATS = {
  // 500 and 750 ml share the 38 × 110 mm label tested on a real 500 ml bottle:
  // one die, identical backs, only the volume and the placeholder GTIN differ.
  bottle:  { file: 'olive-oil-label-38x110.html', vol: '500', unit: 'ml' },
  big:     { file: 'olive-oil-label-38x110.html', vol: '750', unit: 'ml',
             extra: '&ean=2001234567913' },
  // 250 ml: the same label scaled to the smaller bottle, 32 × 90 mm.
  small:   { file: 'olive-oil-label-250.html',    vol: '250', unit: 'ml' },
  tin:     { file: 'olive-oil-tin-3l.html',       vol: '3',   unit: 'l'  },
  // The tin's back goes on its narrow side: the wide back layout at 48 × 170 mm
  // (same height as the tin front), larger text, the tin's own placeholder GTIN.
  tinside: { file: 'olive-oil-label-wide.html',   vol: '3',   unit: 'l', suffix: '-side',
             extra: '&only=back&ean=2001234567906&h=170&legal=8.4pt' },
};

(async () => {
  const fmt = FORMATS[process.argv[2] || 'bottle'];
  if (!fmt) throw new Error(`format must be one of: ${Object.keys(FORMATS).join(', ')}`);
  const vol = process.argv[3] || fmt.vol;
  const harvest = process.argv[4] || '2026';
  const src = 'file://' + path.join(__dirname, fmt.file);
  const query = `?ml=${vol}&harvest=${harvest}${fmt.extra || ''}`;
  const name = `kallmi-oil-${vol}${fmt.unit}${fmt.suffix || ''}`;
  const out = path.join(__dirname, 'out');
  fs.mkdirSync(out, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 4 });

  await page.goto(src + query, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: path.join(out, `${name}-print.pdf`), printBackground: true, preferCSSPageSize: true });

  await page.goto(src + query + '&proof=1', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  for (const sheet of await page.$$('.sheet')) {
    const side = await sheet.evaluate(e => (e.classList.contains('front') ? 'front' : 'back'));
    await sheet.screenshot({ path: path.join(out, `${name}-${side}-proof.png`) });
  }

  await browser.close();

  // Needs Ghostscript and pypdf: apt-get install ghostscript && pip install pypdf
  try {
    execFileSync('python3', [path.join(__dirname, 'press.py'),
      path.join(out, `${name}-print.pdf`), path.join(out, `${name}-PRESS.pdf`), '3']);
  } catch (e) {
    console.warn('Skipped press PDF:', e.message);
  }
})();
