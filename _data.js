/* ═══════════════════════════════════════════════
   AutoScrape — Mock Data & Helpers
   ═══════════════════════════════════════════════ */

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

// ── Mock Data ──
const MOCK = {
  listings: [],
  jobs: []
};

// ── Seed data generators ──
(function buildMockData() {

  // Vehicle data pool
  const makes = [
    { make: 'Toyota',    models: ['Camry','RAV4','Corolla Cross','Grand Highlander','Tacoma'] },
    { make: 'Ford',      models: ['F-150','Escape','Explorer','Mustang','Bronco Sport'] },
    { make: 'Honda',     models: ['Accord','Civic','CR-V','Pilot','HR-V'] },
    { make: 'Chevrolet', models: ['Silverado 1500','Equinox EV','Tahoe','Trax','Traverse'] },
    { make: 'BMW',       models: ['X3','3 Series','X5','iX','i5'] },
    { make: 'Hyundai',   models: ['Tucson','Elantra','Santa Fe','Ioniq 6','Kona Electric'] },
    { make: 'Nissan',    models: ['Rogue','Altima','Ariya','Pathfinder','Frontier'] },
    { make: 'Tesla',     models: ['Model Y','Model 3','Model X','Cybertruck'] },
    { make: 'Jeep',      models: ['Grand Cherokee','Wrangler','Wagoneer','Compass'] },
    { make: 'Audi',      models: ['Q5','A4','Q8 e-tron','A6','Q3'] },
    { make: 'Mercedes-Benz', models: ['GLC','C-Class','EQS SUV','E-Class'] },
    { make: 'Kia',       models: ['Sportage','Forte','EV6','Telluride','Sorento'] },
    { make: 'Subaru',    models: ['Outback','Forester','Crosstrek','Solterra'] },
    { make: 'Volkswagen', models: ['Tiguan','Jetta','Atlas','Taos','ID.4'] },
    { make: 'Lexus',     models: ['RX','NX','TX','IS','GX'] },
  ];

  const trims = ['Base','SE','SEL','XLE','XSE','Limited','Premium','Sport','Touring','LX','EX','SL','ST','Lariat','Platinum'];
  const colors = ['White','Black','Silver','Gray','Blue','Red','Green','Brown','Gold','Charcoal','Pearl White','Midnight Blue','Lunar Silver','Crystal Black'];
  const conditions = ['used','used','used','new','new']; // mix of used and new for current stock
  const sources = ['cars_com','cargurus'];
  const years = [2023,2024,2024,2024,2025,2025,2025,2025,2025,2026,2026,2026,2026,2026];

  const dealers = [
    { name:'Park Place Dealerships',      phone:'(972) 241-0900', addr:'6113 Lemmon Ave',        city:'Dallas',      state:'TX', zip:'75209', website:'parkplace.com' },
    { name:'AutoNation Toyota',           phone:'(817) 500-4200', addr:'4401 South Fwy',         city:'Fort Worth',  state:'TX', zip:'76115', website:'autonationtoyota.com' },
    { name:'Sewell Automotive',           phone:'(214) 902-2600', addr:'7110 Lemmon Ave',        city:'Dallas',      state:'TX', zip:'75209', website:'sewell.com' },
    { name:'Don Davis Auto Group',        phone:'(817) 246-2000', addr:'4333 Benbrook Hwy',      city:'Fort Worth',  state:'TX', zip:'76116', website:'' },
    { name:'Classic Chevrolet',           phone:'(972) 479-1414', addr:'1101 W Hwy 114',         city:'Grapevine',   state:'TX', zip:'76051', website:'classicchevrolet.com' },
    { name:'Longo Toyota',               phone:'(626) 966-3981', addr:'3534 N Peck Rd',         city:'El Monte',    state:'CA', zip:'91731', website:'longotoyota.com' },
    { name:'Freeman Toyota',             phone:'(972) 438-5600', addr:'1901 W Airport Fwy',     city:'Irving',      state:'TX', zip:'75062', website:'' },
    { name:'Hendrick Automotive',         phone:'(704) 566-0249', addr:'6000 Monroe Rd',         city:'Charlotte',   state:'NC', zip:'28212', website:'hendrickauto.com' },
    { name:'Larry H. Miller Dealerships', phone:'(801) 563-4100', addr:'9350 S 150 E',           city:'Sandy',       state:'UT', zip:'84070', website:'lhm.com' },
    { name:'David McDavid Honda',         phone:'(972) 659-4000', addr:'4051 W Plano Pkwy',      city:'Plano',       state:'TX', zip:'75093', website:'mcdavidhonda.com' },
    { name:'Gillman Honda',              phone:'(713) 776-6100', addr:'6310 South Loop W',      city:'Houston',     state:'TX', zip:'77401', website:'gillmanhonda.com' },
    { name:'Trophy Nissan',              phone:'(972) 243-7980', addr:'4800 Lyndon B Johnson Fwy', city:'Mesquite', state:'TX', zip:'75150', website:'trophynissan.com' },
    { name:'BMW of Dallas',              phone:'(214) 231-7000', addr:'6200 Lemmon Ave',        city:'Dallas',      state:'TX', zip:'75209', website:'bmwofdallas.com' },
    { name:'Audi Dallas',                phone:'(214) 231-7500', addr:'5033 Lemmon Ave',        city:'Dallas',      state:'TX', zip:'75209', website:'audidallas.com' },
    { name:'Tesla Dallas',               phone:'(800) 518-3752', addr:'8255 N Central Expy',    city:'Dallas',      state:'TX', zip:'75206', website:'tesla.com' },
    { name:'Vandergriff Toyota',         phone:'(817) 467-1591', addr:'1000 W I-20',            city:'Arlington',   state:'TX', zip:'76017', website:'vtoyota.com' },
    { name:'Southwest Kia',              phone:'(972) 780-1000', addr:'5555 S Hwy 360',         city:'Grand Prairie',state:'TX',zip:'75052', website:'' },
    { name:'Crest Cadillac',             phone:'(972) 241-3300', addr:'6750 Lemmon Ave',        city:'Dallas',      state:'TX', zip:'75209', website:'crestcadillac.com' },
    { name:'Clay Cooley Volkswagen',     phone:'(972) 236-9900', addr:'1701 W Airport Fwy',     city:'Irving',      state:'TX', zip:'75062', website:'' },
    { name:'Huffines Hyundai',           phone:'(972) 239-3700', addr:'1301 South Central Expy', city:'McKinney',   state:'TX', zip:'75069', website:'huffineshyundai.com' },
  ];

  const zipCodes = ['75201','75034','75093','75062','76051','76115','76116','75209','78201','77401','91731','28212','84070','75150','75206','76017','75052','75069'];

  // Simple deterministic pseudo-random
  let seed = 42;
  function rand() { seed = (seed * 16807 + 0) % 2147483647; return (seed - 1) / 2147483646; }
  function pick(arr) { return arr[Math.floor(rand() * arr.length)]; }
  function randInt(min, max) { return Math.floor(rand() * (max - min + 1)) + min; }

  // Generate 120 listings
  for (let i = 0; i < 120; i++) {
    const makeObj = pick(makes);
    const model = pick(makeObj.models);
    const year = pick(years);
    const condition = pick(conditions);
    const dealer = pick(dealers);
    const source = pick(sources);
    const color = pick(colors);
    const trim = pick(trims);

    const basePrice = condition === 'new' ? randInt(32000, 72000) : randInt(18000, 58000);
    const price = Math.round(basePrice / 100) * 100;
    const mileage = condition === 'new' ? randInt(3, 350) : randInt(2000, 48000);

    // Generate VIN-like string
    const vinChars = '0123456789ABCDEFGHJKLMNPRSTUVWXYZ';
    let vin = '';
    for (let v = 0; v < 17; v++) vin += vinChars[Math.floor(rand() * vinChars.length)];

    MOCK.listings.push({
      id: i + 1,
      source: source,
      zip_code: dealer.zip || pick(zipCodes),
      listing_url: source === 'cars_com'
        ? 'https://www.cars.com/vehicledetail/' + vin.toLowerCase() + '/'
        : 'https://www.cargurus.com/Cars/inventorylisting/' + vin.toLowerCase(),
      title: year + ' ' + makeObj.make + ' ' + model,
      year: year,
      make: makeObj.make,
      model: model,
      trim: trim,
      vin: vin,
      price: price,
      mileage: mileage,
      condition: condition,
      color: color,
      dealer_name: dealer.name,
      dealer_phone: dealer.phone,
      dealer_address: dealer.addr,
      dealer_city: dealer.city,
      dealer_state: dealer.state,
      dealer_zip: dealer.zip,
      dealer_website: dealer.website,
      first_seen_at: new Date(2026, 2, randInt(12, 18), randInt(6, 20), randInt(0, 59)).toISOString()
    });
  }

  // Generate 18 jobs
  const statuses = ['done','done','done','done','done','done','done','done','done','done','running','running','failed','partial','partial','done','done','done'];
  const errorMessages = [
    null,
    'TimeoutError: page.waitForSelector: Timeout 30000ms exceeded',
    'ConnectionError: Max retries exceeded with proxy pool-04',
    'SelectorError: #listing-card not found in DOM — possible site redesign',
  ];

  for (let j = 0; j < 18; j++) {
    const status = statuses[j] || 'done';
    const jZips = [];
    const numZips = randInt(1, 4);
    for (let z = 0; z < numZips; z++) { jZips.push(pick(zipCodes)); }
    const adapters = rand() > 0.3 ? ['cars_com','cargurus'] : [pick(sources)];
    const totalFound = status === 'failed' ? 0 : randInt(20, 280);
    const totalNew = Math.round(totalFound * (0.6 + rand() * 0.35));

    const createdAt = new Date(2026, 2, Math.max(14, 18 - Math.floor(j / 3)), randInt(6, 22), randInt(0, 59));
    const startedAt = new Date(createdAt.getTime() + randInt(1000, 5000));
    const finishedAt = status === 'running' ? null : new Date(startedAt.getTime() + randInt(8000, 120000));

    // Generate UUID-like string
    function uuid4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.floor(rand() * 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    }

    MOCK.jobs.push({
      id: String(j + 1),
      uuid: uuid4(),
      status: status,
      zip_codes: [...new Set(jZips)],
      adapters: adapters,
      radius_miles: pick([25, 50, 50, 75, 100]),
      total_found: totalFound,
      total_new: totalNew,
      created_at: createdAt.toISOString(),
      started_at: startedAt.toISOString(),
      finished_at: finishedAt ? finishedAt.toISOString() : null,
      error_message: status === 'failed' ? pick(errorMessages.filter(e => e)) : null,
    });
  }

})();
