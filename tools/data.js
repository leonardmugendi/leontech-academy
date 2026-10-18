// Zana ya matengenezo ya data. Inahitaji Node.js pekee.
//   node tools/data.js export  -> tools/academy.json (hariri masomo/alama hapa)
//   node tools/data.js build   -> kagua tools/academy.json na uandike assets/data.js
//   node tools/data.js check   -> kagua data.js, photos.js na questions.js bila kubadilisha kitu
//   node tools/data.js sw      -> andika upya sw.js (orodha ya mafaili ya offline + toleo jipya la cache)
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA = path.join(ROOT, 'assets', 'data.js');
const JSON_FILE = path.join(__dirname, 'academy.json');
const DIAGRAMS = ['pedals', 'gears', 'steering', 'cockpit', 'inspect', 'mirrors', 'plan', 'route', 'bay', 'parallel', 'lanes',
  'roundabout', 'junction', 'left', 'right', 'turn', 'signals', 'signs', 'markings', 'weather', 'distance', 'reverse', 'stop', 'straight', 'observe'];

function loadGlobal(file, name) {
  const window = {};
  new Function('window', fs.readFileSync(file, 'utf8'))(window);
  return window[name];
}

function validate(d) {
  const errors = [];
  const ids = new Set();
  for (const l of d.lessons) {
    if (ids.has(l.id)) errors.push(`Somo ${l.id} limerudiwa`);
    ids.add(l.id);
    if (!/^\d\d-\d\d$/.test(l.id)) errors.push(`Namba ya somo si sahihi: ${l.id}`);
    if (!d.modules[l.module]) errors.push(`${l.id}: moduli ${l.module} haipo`);
    for (const k of ['title', 'body', 'error', 'criteria']) if (!String(l[k] || '').trim()) errors.push(`${l.id}: ${k} haijajazwa`);
    if (!Array.isArray(l.steps) || l.steps.length < 1) errors.push(`${l.id}: hatua hazipo`);
    if (!DIAGRAMS.includes(l.diagram)) errors.push(`${l.id}: mchoro "${l.diagram}" haujulikani`);
  }
  d.modules.forEach((m, i) => {
    if (m.id !== i) errors.push(`Moduli ${m.title}: id inapaswa kuwa ${i}`);
    for (const id of m.lessonIds) {
      const l = d.lessons.find(x => x.id === id);
      if (!l) errors.push(`Moduli ${i}: somo ${id} halipo`);
      else if (l.module !== i) errors.push(`${id}: limo kwenye moduli ${i} lakini module=${l.module}`);
    }
  });
  for (const l of d.lessons) if (!d.modules.some(m => m.lessonIds.includes(l.id))) errors.push(`${l.id}: halimo kwenye moduli yoyote`);
  for (const s of d.signs) {
    if (!fs.existsSync(path.join(ROOT, s.image))) errors.push(`Alama ${s.code}: picha ${s.image} haipo`);
    if (!s.sw || !s.action) errors.push(`Alama ${s.code}: maelezo ya Kiswahili hayajakamilika`);
  }
  return errors;
}

function checkExtras(d) {
  const errors = [];
  const P = loadGlobal(path.join(ROOT, 'assets', 'photos.js'), 'PHOTOS');
  for (const l of d.lessons) {
    const pid = P.lessons[l.id];
    if (!pid) errors.push(`${l.id}: hakuna picha halisi`);
    else if (!P.items[pid] || !fs.existsSync(path.join(ROOT, P.items[pid].src))) errors.push(`${l.id}: picha ${pid} haipo`);
  }
  const Q = loadGlobal(path.join(ROOT, 'assets', 'questions.js'), 'EXTRA_THEORY');
  Q.forEach((q, i) => {
    if (q.length !== 4 || !Array.isArray(q[1]) || q[1].length < 2 || !(q[2] >= 0 && q[2] < q[1].length)) errors.push(`Swali la ziada #${i + 1} si sahihi: ${q[0]}`);
  });
  return errors;
}

const cmd = process.argv[2];
if (cmd === 'export') {
  fs.writeFileSync(JSON_FILE, JSON.stringify(loadGlobal(DATA, 'ACADEMY'), null, 1));
  console.log('Imeandikwa', path.relative(ROOT, JSON_FILE));
} else if (cmd === 'build') {
  const d = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
  const errors = validate(d);
  if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
  fs.writeFileSync(DATA, 'window.ACADEMY=' + JSON.stringify(d) + ';\n');
  console.log(`Imejengwa assets/data.js: masomo ${d.lessons.length}, alama ${d.signs.length}`);
} else if (cmd === 'check') {
  const d = loadGlobal(DATA, 'ACADEMY');
  const errors = [...validate(d), ...checkExtras(d)];
  if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
  console.log(`Sawa: masomo ${d.lessons.length}, moduli ${d.modules.length}, alama ${d.signs.length}, kila somo lina picha.`);
} else if (cmd === 'sw') {
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
  const files = ['./', 'index.html', 'manifest.webmanifest', ...walk(path.join(ROOT, 'assets')).map(f => path.relative(ROOT, f))].map(f => f.split(path.sep).join('/'));
  const sw = `// Offline cache for the hosted site (https). Imeandikwa na: node tools/data.js sw
// The app shell and assets are stored at install; guide pages and the PDF are cached the first time they are opened.
const CACHE="leontech-${new Date().toISOString().replace(/\D/g, '').slice(0, 14)}";
const FILES=${JSON.stringify(files)};
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{if(res.ok&&u.pathname.includes("/references/")){const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return res})))});
`;
  fs.writeFileSync(path.join(ROOT, 'sw.js'), sw);
  console.log('sw.js imeandikwa: mafaili', files.length);
} else {
  console.log('Tumia: node tools/data.js export | build | check | sw');
}
