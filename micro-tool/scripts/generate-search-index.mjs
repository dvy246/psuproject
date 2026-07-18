import fs from 'fs';
import path from 'path';

const INDEX_DIR = 'src/data/index';
const GUIDES_DIR = 'src/pages/guides';
const OUTPUT_FILE = 'public/search-index.json';

const searchIndex = [];

// Helper to add item
function addItem(id, name, type, url, brand = '', subtitle = '') {
  searchIndex.push({
    id,
    name,
    type,
    url,
    brand,
    subtitle
  });
}

// 1. Add Core Tools/Calculators
addItem('psu-calculator', 'PSU Sizing Calculator', 'tool', '/psu-calculator/', 'VoltForge', 'Calculate steady load & transient spikes');
addItem('pc-builder', 'PC Builder & Cost Estimator', 'tool', '/pc-builder/', 'VoltForge', 'Build a custom PC and estimate costs');
addItem('psu-checker', 'PSU Upgrade Headroom Checker', 'tool', '/psu-checker/', 'VoltForge', 'Check compatibility for GPU upgrades');
addItem('psu-replacement-calculator', 'PSU Replacement Calculator', 'tool', '/psu-replacement-calculator/', 'VoltForge', 'Check if aging PSU can run new GPU');
addItem('breaker-calculator', 'Circuit Breaker Auditor', 'tool', '/compare/breaker-calculator/', 'VoltForge', 'Calculate breaker load limits for your PC');
addItem('ups-calculator', 'UPS Battery Sizer', 'tool', '/compare/ups-calculator/', 'VoltForge', 'Size backup battery UPS runtime');
addItem('gpu-upgrade-checker', 'GPU Upgrade Checker', 'tool', '/compare/gpu-upgrade-checker/', 'VoltForge', 'Select from-to GPUs and verify PSU safety');
addItem('best-psu', 'Best PSU Recommendations', 'tool', '/best-psu/', 'VoltForge', 'Premium, mid-range & budget PSU tier list');
addItem('psu-reliability', 'Reliability & Longevity Database', 'tool', '/psu-reliability/', 'VoltForge', 'Real community failure rates by PSU model');
addItem('diagnose', 'PSU Fail Symptoms & Diagnostic Triage Wizard', 'tool', '/diagnose/', 'VoltForge', 'Diagnose shutdowns, boot loops, coil whine, or BSODs');

// 2. Load Component Indexes
// CPUs -> /pc-builder?cpu=[id]
const cpus = JSON.parse(fs.readFileSync(path.join(INDEX_DIR, 'cpus.index.json'), 'utf8'));
for (const item of cpus.items) {
  addItem(item.id, item.name, 'cpu', `/pc-builder?cpu=${item.id}`, item.brand, `CPU · ${item.cores} Cores · ${item.tdp}W TDP`);
  addItem(`${item.id}-power`, `${item.name} Actual Power Draw`, 'tool', `/power-consumption/${item.id}/`, item.brand, `Measured Power Draw Specs & Headroom Verdict`);
}

// GPUs -> /psu-for/[id]/
const gpus = JSON.parse(fs.readFileSync(path.join(INDEX_DIR, 'gpus.index.json'), 'utf8'));
for (const item of gpus.items) {
  addItem(item.id, item.name, 'gpu', `/psu-for/${item.id}/`, item.brand, `GPU · ${item.vram} VRAM · ${item.tbp}W TBP`);
  addItem(`${item.id}-power`, `${item.name} Actual Power Draw`, 'tool', `/power-consumption/${item.id}/`, item.brand, `Measured Power Draw Specs & Headroom Verdict`);
}

// PSUs -> /psu/[id]/
const psus = JSON.parse(fs.readFileSync(path.join(INDEX_DIR, 'psus.index.json'), 'utf8'));
for (const item of psus.items) {
  addItem(item.id, item.name, 'psu', `/psu/${item.id}/`, item.brand, `PSU · ${item.wattage}W · Tier ${item.qualityTier}`);
}

// Cases -> /pc-builder
const cases = JSON.parse(fs.readFileSync(path.join(INDEX_DIR, 'cases.index.json'), 'utf8'));
for (const item of cases.items) {
  addItem(item.id, item.name, 'case', `/pc-builder`, item.brand, `PC Case · Max GPU ${item.maxGpuLength}mm`);
}

// Coolers -> /pc-builder
const coolers = JSON.parse(fs.readFileSync(path.join(INDEX_DIR, 'coolers.index.json'), 'utf8'));
for (const item of coolers.items) {
  addItem(item.id, item.name, 'cooler', `/pc-builder`, item.brand, `Cooler · Type ${item.type} · ${item.size}mm`);
}

// 3. Load Guides
const guideFiles = fs.readdirSync(GUIDES_DIR);
for (const file of guideFiles) {
  if (file === 'index.astro' || !file.endsWith('.astro')) continue;
  const filePath = path.join(GUIDES_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract title from Astro Layout title prop
  let title = file.replace('.astro', '').replace(/-/g, ' ');
  const titleMatch = content.match(/<Layout\s+title="([^"]+)"/i);
  if (titleMatch) {
    title = titleMatch[1].split('—')[0].split(':')[0].trim();
  }
  
  const slug = file.replace('.astro', '');
  addItem(slug, title, 'guide', `/guides/${slug}/`, '', 'Article · Sizing Guide');
}

// Make sure output folder exists
const publicDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(searchIndex, null, 2), 'utf8');
console.log(`✓ Consolidated Search Index created: ${searchIndex.length} items`);
