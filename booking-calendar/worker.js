/**
 * Cloudflare Worker — Booking.com iCal Availability API
 *
 * Fetches your Booking.com iCal feed, parses booked dates,
 * returns clean JSON. Cached at edge for 30 min (configurable).
 *
 * ENV VARS (set in wrangler.toml or dashboard):
 *   ICAL_URL  — your Booking.com iCal export URL
 *   PROPERTY_NAME — display name (optional)
 *   CACHE_TTL — cache seconds, default 1800 (30 min)
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors });
    }

    // Serve the embeddable widget
    if (url.pathname === '/' || url.pathname === '/widget') {
      return new Response(WIDGET_HTML(url.origin, env.PROPERTY_NAME || 'My Property'), {
        headers: { 'Content-Type': 'text/html;charset=UTF-8', ...cors },
      });
    }

    // API endpoint
    if (url.pathname === '/api/availability') {
      return handleAvailability(request, env, cors);
    }

    return new Response('Not found', { status: 404 });
  },
};

// ─── API Handler ──────────────────────────────────────────────

async function handleAvailability(request, env, cors) {
  const cache = caches.default;
  const cacheKey = new Request(new URL(request.url).origin + '/api/availability');
  const cached = await cache.match(cacheKey);

  if (cached) return cached;

  try {
    if (!env.ICAL_URL) {
      return jsonResponse({ error: 'ICAL_URL not configured' }, 500, cors);
    }

    const icalResp = await fetch(env.ICAL_URL, {
      headers: { 'User-Agent': 'CloudflareWorker/1.0' },
    });

    if (!icalResp.ok) {
      return jsonResponse({ error: `iCal fetch failed: ${icalResp.status}` }, 502, cors);
    }

    const icalText = await icalResp.text();
    const bookings = parseICal(icalText);
    const ttl = parseInt(env.CACHE_TTL) || 1800;

    const body = JSON.stringify({
      property: env.PROPERTY_NAME || 'My Property',
      bookings,
      bookedDates: bookings.flatMap(b => b.dates),
      lastSync: new Date().toISOString(),
      cacheTTL: ttl,
    });

    const response = new Response(body, {
      headers: {
        ...cors,
        'Content-Type': 'application/json',
        'Cache-Control': `public, max-age=${ttl}`,
      },
    });

    // Edge-cache it
    await cache.put(cacheKey, response.clone());
    return response;
  } catch (err) {
    return jsonResponse({ error: err.message }, 500, cors);
  }
}

function jsonResponse(data, status, cors) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });
}

// ─── iCal Parser ──────────────────────────────────────────────

function parseICal(text) {
  const bookings = [];
  const blocks = text.split('BEGIN:VEVENT');

  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i].split('END:VEVENT')[0];
    const start = extractICalDate(block, 'DTSTART');
    const end = extractICalDate(block, 'DTEND');
    const summary = extractField(block, 'SUMMARY') || 'Booked';

    if (start && end) {
      const dates = [];
      const cur = new Date(start);
      const endDate = new Date(end);

      while (cur < endDate) {
        dates.push(cur.toISOString().split('T')[0]);
        cur.setDate(cur.getDate() + 1);
      }

      bookings.push({ summary, checkIn: start, checkOut: end, dates });
    }
  }

  return bookings;
}

function extractICalDate(text, field) {
  // Handles: DTSTART;VALUE=DATE:20260215 / DTSTART:20260215T140000Z / DTSTART;TZID=...:20260215T140000
  const re = new RegExp(`${field}(?:;[^:]*)?:(\\d{4})(\\d{2})(\\d{2})`);
  const m = text.match(re);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

function extractField(text, field) {
  const re = new RegExp(`${field}(?:;[^:]*)?:(.+?)\\r?\\n`);
  const m = text.match(re);
  return m ? m[1].trim() : null;
}

// ─── Embeddable Widget HTML ───────────────────────────────────

function WIDGET_HTML(origin, propertyName) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${propertyName} — Availability</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: transparent; }
  .cal-container { max-width: 720px; margin: 0 auto; padding: 16px; }
  .cal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
  .cal-header h2 { font-size: 18px; font-weight: 600; color: #1a1a1a; }
  .cal-nav { display: flex; gap: 8px; }
  .cal-nav button {
    background: #f5f5f5; border: 1px solid #ddd; border-radius: 6px;
    width: 32px; height: 32px; cursor: pointer; font-size: 16px;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s;
  }
  .cal-nav button:hover { background: #e8e8e8; }
  .cal-months { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 560px) { .cal-months { grid-template-columns: 1fr; } }
  .cal-month h3 { text-align: center; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 8px; }
  .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
  .cal-day-label { text-align: center; font-size: 11px; color: #999; padding: 4px 0; font-weight: 500; }
  .cal-day {
    aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
    font-size: 13px; border-radius: 6px; position: relative;
  }
  .cal-day.empty { background: transparent; }
  .cal-day.past { color: #ccc; background: #fafafa; }
  .cal-day.available { background: #e8f5e9; color: #2e7d32; font-weight: 500; }
  .cal-day.booked { background: #ffebee; color: #c62828; font-weight: 500; }
  .cal-day.today { box-shadow: inset 0 0 0 2px #1976d2; }
  .cal-legend { display: flex; gap: 16px; margin-top: 16px; justify-content: center; }
  .cal-legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #666; }
  .cal-legend-dot { width: 12px; height: 12px; border-radius: 3px; }
  .cal-legend-dot.avail { background: #e8f5e9; border: 1px solid #a5d6a7; }
  .cal-legend-dot.booked { background: #ffebee; border: 1px solid #ef9a9a; }
  .cal-footer { text-align: center; margin-top: 12px; font-size: 11px; color: #bbb; }
  .cal-loading { text-align: center; padding: 40px; color: #999; }
  .cal-error { text-align: center; padding: 40px; color: #c62828; font-size: 14px; }
</style>
</head>
<body>
<div class="cal-container" id="cal-root">
  <div class="cal-loading">Loading availability...</div>
</div>
<script>
(function() {
  const API = '${origin}/api/availability';
  const root = document.getElementById('cal-root');
  const DAYS = ['Mo','Tu','We','Th','Fr','Sa','Su'];
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let bookedSet = new Set();
  let offset = 0; // month offset from current

  async function init() {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      bookedSet = new Set(data.bookedDates || []);
      render(data);
    } catch (e) {
      root.innerHTML = '<div class="cal-error">Could not load availability. Please try again later.</div>';
    }
  }

  function render(data) {
    const today = new Date();
    const m1 = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    const m2 = new Date(today.getFullYear(), today.getMonth() + offset + 1, 1);

    root.innerHTML = \`
      <div class="cal-header">
        <h2>\${data.property || 'Availability'}</h2>
        <div class="cal-nav">
          <button id="cal-prev" title="Previous">&larr;</button>
          <button id="cal-next" title="Next">&rarr;</button>
        </div>
      </div>
      <div class="cal-months">
        \${renderMonth(m1, today)}
        \${renderMonth(m2, today)}
      </div>
      <div class="cal-legend">
        <div class="cal-legend-item"><div class="cal-legend-dot avail"></div>Available</div>
        <div class="cal-legend-item"><div class="cal-legend-dot booked"></div>Booked</div>
      </div>
      <div class="cal-footer">Last synced: \${new Date(data.lastSync).toLocaleString()}</div>
    \`;

    document.getElementById('cal-prev').addEventListener('click', () => { offset--; render(data); });
    document.getElementById('cal-next').addEventListener('click', () => { offset++; render(data); });
  }

  function renderMonth(date, today) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Monday-based: 0=Mon ... 6=Sun
    let startDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const todayStr = fmt(today);

    let cells = DAYS.map(d => \`<div class="cal-day-label">\${d}</div>\`).join('');
    for (let i = 0; i < startDay; i++) cells += '<div class="cal-day empty"></div>';

    for (let d = 1; d <= daysInMonth; d++) {
      const ds = fmt(new Date(year, month, d));
      const isToday = ds === todayStr;
      const isPast = new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isBooked = bookedSet.has(ds);
      let cls = 'cal-day';
      if (isPast) cls += ' past';
      else if (isBooked) cls += ' booked';
      else cls += ' available';
      if (isToday) cls += ' today';
      cells += \`<div class="\${cls}">\${d}</div>\`;
    }

    return \`<div class="cal-month"><h3>\${MONTHS[month]} \${year}</h3><div class="cal-grid">\${cells}</div></div>\`;
  }

  function fmt(d) {
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }

  init();
})();
</script>
</body>
</html>`;
}
