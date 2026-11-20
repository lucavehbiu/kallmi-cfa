// Shared by every label page: query-string overrides and the EAN-13 renderer.
  const q = new URLSearchParams(location.search);
  if (q.has('ml')) document.querySelectorAll('[data-ml]').forEach(e => e.textContent = q.get('ml'));
  if (q.has('harvest')) document.querySelectorAll('[data-harvest]').forEach(e => e.textContent = q.get('harvest'));
  if (q.has('proof')) document.body.classList.add('proof');
  if (q.has('ean')) document.querySelectorAll('svg[data-ean]').forEach(e => e.dataset.ean = q.get('ean'));
  if (q.get('only') === 'back') document.querySelectorAll('.sheet.front').forEach(e => e.remove());

  // ?h=170 → taller trim (mm), ?legal=8.5pt → larger mandatory text. Used by the
  // 3 l tin side label, which reuses the 500 ml back at the tin front's height.
  if (q.has('h') || q.has('legal')) {
    const root = document.documentElement.style, css = getComputedStyle(document.documentElement);
    if (q.has('legal')) root.setProperty('--legal', q.get('legal'));
    if (q.has('h')) {
      const mm = v => parseFloat(css.getPropertyValue(v));
      const w = mm('--trim-w') + 2 * mm('--bleed'), h = +q.get('h') + 2 * mm('--bleed');
      root.setProperty('--trim-h', q.get('h') + 'mm');
      const page = document.createElement('style');
      page.textContent = `@page { size: ${w}mm ${h}mm; margin: 0; }`;
      document.head.appendChild(page);
    }
  }

  // EAN-13 → SVG bars. Fixes the check digit, so any 12-digit stem works.
  function ean13(svg) {
    const stem = svg.dataset.ean.slice(0, 12);
    const sum = [...stem].reduce((s, d, i) => s + (+d) * (i % 2 ? 3 : 1), 0);
    const code = stem + ((10 - sum % 10) % 10);
    const L = ['0001101','0011001','0010011','0111101','0100011','0110001','0101111','0111011','0110111','0001011'];
    const G = L.map(p => [...p].map(b => b === '1' ? '0' : '1').reverse().join(''));
    const R = L.map(p => [...p].map(b => b === '1' ? '0' : '1').join(''));
    const parity = ['LLLLLL','LLGLGG','LLGGLG','LLGGGL','LGLLGG','LGGLLG','LGGGLL','LGLGLG','LGLGGL','LGGLGL'][+code[0]];
    let bits = '101';
    for (let i = 1; i <= 6; i++) bits += (parity[i - 1] === 'L' ? L : G)[+code[i]];
    bits += '01010';
    for (let i = 7; i <= 12; i++) bits += R[+code[i]];
    bits += '101';
    const guard = new Set([0,1,2,45,46,47,48,49,92,93,94]);
    const ox = 9, H = 44, W = ox + 95 + 7;   // 11-module left quiet zone incl. first digit
    let rects = '';
    for (let i = 0; i < 95; i++) if (bits[i] === '1')
      rects += `<rect x="${ox + i}" y="0" width="1" height="${guard.has(i) ? H + 5 : H}"/>`;
    const t = (x, s) => `<text x="${x}" y="${H + 10}" text-anchor="middle">${s}</text>`;
    svg.setAttribute('viewBox', `0 0 ${W} ${H + 11}`);
    svg.innerHTML = `<rect width="${W}" height="${H + 11}" fill="#fff"/><g fill="#000">${rects}</g>` +
      `<g font-family="Jost, sans-serif" font-size="9" fill="#000">${t(4, code[0])}${t(ox + 24, code.slice(1, 7))}${t(ox + 70, code.slice(7))}</g>`;
  }
  document.querySelectorAll('svg[data-ean]').forEach(ean13);
