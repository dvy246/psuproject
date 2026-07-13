import type { CpuIndex, GpuIndex, MotherboardIndex, RamConfig, StorageConfig, CoolingConfig, PsuIndex } from '../types/components';

import cpuData from '../data/index/cpus.index.json';
import gpuData from '../data/index/gpus.index.json';
import moboData from '../data/index/motherboards.index.json';
import psuData from '../data/index/psus.index.json';
import componentData from '../data/components.json';

const allCpus = cpuData.items as CpuIndex[];
const allGpus = gpuData.items as GpuIndex[];
const allMobos = moboData.items as MotherboardIndex[];
const allPsus = psuData.items as PsuIndex[];
const allRam = componentData.ram as RamConfig[];
const allStorage = componentData.storage as StorageConfig[];
const allCooling = componentData.cooling as CoolingConfig[];

export interface DeserializedBuild {
  cpu: CpuIndex | null;
  gpu: GpuIndex | null;
  mobo: MotherboardIndex | null;
  ram: RamConfig | null;
  storage: StorageConfig[];
  cooling: CoolingConfig | null;
  psu: PsuIndex | null;
  cpuOcPercent?: number;
  gpuOcPercent?: number;
  safetyBufferPercent?: number;
}

/**
 * Encodes the selected component IDs into a URL query parameter string.
 */
export function serializeBuild(
  cpu: CpuIndex | null,
  gpu: GpuIndex | null,
  mobo: MotherboardIndex | null,
  ram: RamConfig | null,
  storage: StorageConfig[],
  cooling: CoolingConfig | null,
  psu: PsuIndex | null,
  cpuOcPercent?: number,
  gpuOcPercent?: number,
  safetyBufferPercent?: number
): string {
  const params = new URLSearchParams();

  if (cpu) params.set('cpu', cpu.id);
  if (gpu) params.set('gpu', gpu.id);
  if (mobo) params.set('mobo', mobo.id);

  if (ram) {
    const ramIdx = allRam.findIndex(r => r.capacity === ram.capacity && r.speed === ram.speed && r.type === ram.type && r.sticks === ram.sticks);
    if (ramIdx !== -1) params.set('ram', ramIdx.toString());
  }

  if (storage.length > 0) {
    const storageIndices = storage
      .map(s => allStorage.findIndex(x => x.type === s.type && x.capacity === s.capacity))
      .filter(idx => idx !== -1);
    if (storageIndices.length > 0) params.set('str', storageIndices.join(','));
  }

  if (cooling) {
    const coolingIdx = allCooling.findIndex(c => c.type === cooling.type);
    if (coolingIdx !== -1) params.set('cool', coolingIdx.toString());
  }

  if (psu) params.set('psu', psu.id);

  if (cpuOcPercent && cpuOcPercent > 0) params.set('cpuoc', cpuOcPercent.toString());
  if (gpuOcPercent && gpuOcPercent > 0) params.set('gpuoc', gpuOcPercent.toString());
  if (safetyBufferPercent && safetyBufferPercent !== 10) params.set('sb', safetyBufferPercent.toString());

  return params.toString();
}

/**
 * Decodes a URL query parameter string back into component objects.
 */
export function deserializeBuild(searchString: string): DeserializedBuild {
  const params = new URLSearchParams(searchString);

  const cpuId = params.get('cpu');
  const gpuId = params.get('gpu');
  const moboId = params.get('mobo');
  const ramIdxStr = params.get('ram');
  const strIndicesStr = params.get('str');
  const coolIdxStr = params.get('cool');
  const psuId = params.get('psu');

  const cpu = cpuId ? allCpus.find(c => c.id === cpuId) || null : null;
  const gpu = gpuId ? allGpus.find(g => g.id === gpuId) || null : null;
  const mobo = moboId ? allMobos.find(m => m.id === moboId) || null : null;

  let ram: RamConfig | null = null;
  if (ramIdxStr) {
    const idx = parseInt(ramIdxStr, 10);
    if (!isNaN(idx) && allRam[idx]) ram = allRam[idx];
  }

  let storage: StorageConfig[] = [];
  if (strIndicesStr) {
    const indices = strIndicesStr.split(',').map(s => parseInt(s, 10)).filter(n => !isNaN(n));
    storage = indices.map(idx => allStorage[idx]).filter(Boolean);
  }

  let cooling: CoolingConfig | null = null;
  if (coolIdxStr) {
    const idx = parseInt(coolIdxStr, 10);
    if (!isNaN(idx) && allCooling[idx]) cooling = allCooling[idx];
  }

  const psu = psuId ? allPsus.find(p => p.id === psuId) || null : null;

  const cpuOcStr = params.get('cpuoc');
  const gpuOcStr = params.get('gpuoc');
  const sbStr = params.get('sb');
  const cpuOcPercent = cpuOcStr ? Math.min(Math.max(parseInt(cpuOcStr, 10) || 0, 0), 30) : undefined;
  const gpuOcPercent = gpuOcStr ? Math.min(Math.max(parseInt(gpuOcStr, 10) || 0, 0), 30) : undefined;
  const safetyBufferPercent = sbStr ? Math.min(Math.max(parseInt(sbStr, 10) || 0, 0), 30) : undefined;

  return { cpu, gpu, mobo, ram, storage, cooling, psu, cpuOcPercent, gpuOcPercent, safetyBufferPercent };
}
