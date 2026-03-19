/* ═══════════════════════════════════════════════
   AutoScrape — API Client & Helpers
   ═══════════════════════════════════════════════ */

// ── Configuration ──
// Set these to match your running backend
const API_BASE = localStorage.getItem('autoscrape_api_url') || 'http://localhost:8000';
const API_KEY  = localStorage.getItem('autoscrape_api_key') || '';

// ── Helper Functions ──
function fmtDate(d) {
  if (!d) return '—';
  const dt = new Date(d);
  const mon = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return mon[dt.getMonth()] + ' ' + dt.getDate() + ', ' + dt.getFullYear();
}

function fmtPrice(p) {
  if (p == null || isNaN(p)) return '—';
  return '$' + Number(p).toLocaleString();
}

function fmtMiles(m) {
  if (m == null || isNaN(m)) return '—';
  return Number(m).toLocaleString() + ' mi';
}

// ── API Client ──
const api = {

  /** Build headers with optional API key */
  _headers(json = false) {
    const h = {};
    if (API_KEY) h['X-API-Key'] = API_KEY;
    if (json) h['Content-Type'] = 'application/json';
    return h;
  },

  /** Generic GET with query params */
  async get(path, params = {}) {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== '' && v !== null && v !== undefined) qs.set(k, v);
    });
    const url = `${API_BASE}${path}${qs.toString() ? '?' + qs : ''}`;
    const res = await fetch(url, { headers: this._headers() });
    if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
    return res.json();
  },

  /** Generic POST with JSON body */
  async post(path, body = {}) {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: this._headers(true),
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
    return res.json();
  },

  // ── Endpoint Wrappers ──

  /** GET /listings/ — browse listings with filters */
  async getListings(params = {}) {
    return this.get('/listings/', params);
  },

  /** GET /scrape/jobs — list all jobs */
  async getJobs(params = {}) {
    return this.get('/scrape/jobs', params);
  },

  /** GET /scrape/jobs/{id} — single job detail */
  async getJob(jobId) {
    return this.get(`/scrape/jobs/${jobId}`);
  },

  /** POST /scrape/ — enqueue a new scrape job */
  async createJob(body) {
    return this.post('/scrape/', body);
  },

  /** GET /admin/stats — dashboard summary */
  async getStats() {
    return this.get('/admin/stats');
  },

  /** GET /admin/health/adapters — adapter health */
  async getHealth() {
    return this.get('/admin/health/adapters');
  },

  /** Export helpers — returns download URL */
  exportCsvUrl(params = {}) {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== '' && v !== null && v !== undefined) qs.set(k, v);
    });
    if (API_KEY) qs.set('api_key', API_KEY);
    return `${API_BASE}/listings/export/csv${qs.toString() ? '?' + qs : ''}`;
  },

  exportJsonUrl(params = {}) {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== '' && v !== null && v !== undefined) qs.set(k, v);
    });
    if (API_KEY) qs.set('api_key', API_KEY);
    return `${API_BASE}/listings/export/json${qs.toString() ? '?' + qs : ''}`;
  },
};

// ── Settings Modal Helper ──
// Call showApiSettings() from any page to let users configure the connection
function showApiSettings() {
  const current = localStorage.getItem('autoscrape_api_url') || 'http://localhost:8000';
  const key = localStorage.getItem('autoscrape_api_key') || '';
  const url = prompt('API Base URL:', current);
  if (url !== null) localStorage.setItem('autoscrape_api_url', url.replace(/\/+$/, ''));
  const k = prompt('API Key (leave blank if none):', key);
  if (k !== null) localStorage.setItem('autoscrape_api_key', k);
  location.reload();
}
