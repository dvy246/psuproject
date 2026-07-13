/** @jsxImportSource preact */
// ============================================================
// PSUCheck — PSU Comparer Component
// Side-by-side spec comparison of two user-selected PSUs.
// Modern dark-theme comparison table.
// ============================================================

import { useState, useCallback } from 'preact/hooks';
import type { PsuIndex } from '../../types/components';
import psuData from '../../data/index/psus.index.json';

const ALL_PSUS = psuData.items as PsuIndex[];

export function PsuComparer() {
  const [psuAId, setPsuAId] = useState<string>('corsair-rm850x-2024');
  const [psuBId, setPsuBId] = useState<string>('seasonic-focus-gx-850');

  const psuA = ALL_PSUS.find(p => p.id === psuAId) || ALL_PSUS[0];
  const psuB = ALL_PSUS.find(p => p.id === psuBId) || ALL_PSUS[1];

  const handleSelectA = useCallback((e: Event) => {
    setPsuAId((e.target as HTMLSelectElement).value);
  }, []);

  const handleSelectB = useCallback((e: Event) => {
    setPsuBId((e.target as HTMLSelectElement).value);
  }, []);

  return (
    <div class="psu-comparer-container">
      {/* Selector Dropdowns Header */}
      <div class="compare-selectors-grid">
        <div class="compare-selector-box">
          <label for="compare-psu-a" class="compare-label">Power Supply A</label>
          <select
            id="compare-psu-a"
            value={psuAId}
            onChange={handleSelectA}
            class="compare-dropdown"
          >
            {ALL_PSUS.map(p => (
              <option key={p.id} value={p.id}>{p.brand} {p.name} ({p.wattage}W)</option>
            ))}
          </select>
        </div>

        <div class="compare-vs-badge" aria-hidden="true">VS</div>

        <div class="compare-selector-box">
          <label for="compare-psu-b" class="compare-label">Power Supply B</label>
          <select
            id="compare-psu-b"
            value={psuBId}
            onChange={handleSelectB}
            class="compare-dropdown"
          >
            {ALL_PSUS.map(p => (
              <option key={p.id} value={p.id}>{p.brand} {p.name} ({p.wattage}W)</option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Comparison Table */}
      <div class="comparison-table-wrap" style="margin-top:2rem;">
        <table class="comparison-table" aria-label="PSU Spec Comparison">
          <thead>
            <tr>
              <th scope="col" style="width:30%;">Specification</th>
              <th scope="col" style="width:35%;text-align:center;">
                <span class="compare-header-name">{psuA.brand} {psuA.name}</span>
              </th>
              <th scope="col" style="width:35%;text-align:center;">
                <span class="compare-header-name">{psuB.brand} {psuB.name}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Wattage</th>
              <td class="compare-value tabular">{psuA.wattage}W</td>
              <td class="compare-value tabular">{psuB.wattage}W</td>
            </tr>
            <tr>
              <th scope="row">Efficiency Rating</th>
              <td class="compare-value text-capitalize">{psuA.efficiencyTier}</td>
              <td class="compare-value text-capitalize">{psuB.efficiencyTier}</td>
            </tr>
            <tr>
              <th scope="row">ATX Standard</th>
              <td class={`compare-value ${psuA.atxVersion === '3.1' ? 'compare-highlight-green' : ''}`}>
                ATX {psuA.atxVersion}
              </td>
              <td class={`compare-value ${psuB.atxVersion === '3.1' ? 'compare-highlight-green' : ''}`}>
                ATX {psuB.atxVersion}
              </td>
            </tr>
            <tr>
              <th scope="row">Modularity</th>
              <td class="compare-value text-capitalize">{psuA.modular}</td>
              <td class="compare-value text-capitalize">{psuB.modular}</td>
            </tr>
            <tr>
              <th scope="row">Native 12V-2x6 Cable</th>
              <td class="compare-value">
                {psuA.has12v2x6 ? <span class="compare-highlight-green">✓ Yes (ATX 3.1)</span> : <span class="compare-highlight-red">✕ No</span>}
              </td>
              <td class="compare-value">
                {psuB.has12v2x6 ? <span class="compare-highlight-green">✓ Yes (ATX 3.1)</span> : <span class="compare-highlight-red">✕ No</span>}
              </td>
            </tr>
            {psuA.cybeneticsRating || psuB.cybeneticsRating ? (
              <tr>
                <th scope="row">Cybenetics Rating</th>
                <td class="compare-value tabular">{psuA.cybeneticsRating || 'Not Rated'}</td>
                <td class="compare-value tabular">{psuB.cybeneticsRating || 'Not Rated'}</td>
              </tr>
            ) : null}
            <tr>
              <th scope="row">Estimated Price</th>
              <td class="compare-value compare-price tabular">${psuA.price}</td>
              <td class="compare-value compare-price tabular">${psuB.price}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
