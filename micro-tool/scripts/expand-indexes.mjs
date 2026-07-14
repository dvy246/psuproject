import fs from 'fs';
import path from 'path';

const baseDir = '/Users/divyyadav/New Project/micro-tool/src/data/index';

// ─── EXPAND GPUS ─────────────────────────────────────────────────────────────
const gpusPath = path.join(baseDir, 'gpus.index.json');
const gpusData = JSON.parse(fs.readFileSync(gpusPath, 'utf8'));

gpusData.items = gpusData.items.map(gpu => {
  let length = 267;
  let width = 110;
  let slotsOccupied = 2;
  let connType = '8-pin';
  let connCount = 1;

  if (gpu.connectorType.includes('12v')) {
    connType = '12v-2x6';
    connCount = 1;
    if (gpu.id.includes('5090') || gpu.id.includes('4090')) {
      length = 336;
      width = 140;
      slotsOccupied = 3.5;
    } else if (gpu.id.includes('5080') || gpu.id.includes('4080')) {
      length = 310;
      width = 120;
      slotsOccupied = 3;
    } else {
      length = 290;
      width = 115;
      slotsOccupied = 2.5;
    }
  } else if (gpu.connectorType.includes('8pin-x2')) {
    connType = '8-pin';
    connCount = 2;
    length = 280;
    width = 120;
    slotsOccupied = 2.2;
  } else if (gpu.connectorType.includes('8pin-x3')) {
    connType = '8-pin';
    connCount = 3;
    length = 315;
    width = 130;
    slotsOccupied = 3;
  } else if (gpu.connectorType.includes('8pin-x1')) {
    connType = '8-pin';
    connCount = 1;
    length = 240;
    width = 110;
    slotsOccupied = 2;
  }

  return {
    ...gpu,
    dimensions: {
      length,
      width,
      slotsOccupied,
      pciePowerConnectorPosition: 'edge'
    },
    powerConnectors: {
      type: connType,
      count: connCount
    }
  };
});

fs.writeFileSync(gpusPath, JSON.stringify(gpusData, null, 2), 'utf8');
console.log('Expanded GPUS index.');

// ─── EXPAND PSUS ─────────────────────────────────────────────────────────────
const psusPath = path.join(baseDir, 'psus.index.json');
const psusData = JSON.parse(fs.readFileSync(psusPath, 'utf8'));

psusData.items = psusData.items.map(psu => {
  const is12v = psu.has12v2x6;
  const isHighWattage = psu.wattage >= 1000;
  
  return {
    ...psu,
    connectors: {
      pcie6pin: 0,
      pcie8pin: isHighWattage ? 6 : psu.wattage >= 750 ? 4 : 2,
      pcie12vhpwr: is12v && psu.atxVersion === '3.0' ? 1 : 0,
      pcie12v2x6: is12v && psu.atxVersion === '3.1' ? 1 : 0,
      eps4pin: 0,
      eps8pin: psu.wattage >= 750 ? 2 : 1,
      sata: psu.wattage >= 1000 ? 12 : 8,
      molex: 4
    },
    cableType: psu.modular === 'full' ? 'fully-modular' : psu.modular === 'semi' ? 'semi-modular' : 'non-modular',
    modularPinoutStandard: psu.brand.toLowerCase() === 'corsair' ? 'corsair-type-4' : psu.brand.toLowerCase() === 'seasonic' ? 'seasonic-focus' : 'standard',
    nativeAtx31: psu.atxVersion === '3.1',
    includes12vhpwrCable: is12v,
    includes12vhpwrAdapter: !is12v && psu.wattage >= 750,
    cableLengths: {
      atx24pin: 610,
      eps8pin: 650,
      pcie8pin: 750
    }
  };
});

fs.writeFileSync(psusPath, JSON.stringify(psusData, null, 2), 'utf8');
console.log('Expanded PSUS index.');
