// HR Module: Learning & Development View

import { learningCatalog } from '../../data.js';

export function renderHrLearningDevelopmentView() {
  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <div>
        <h1 class="font-display text-2xl font-bold text-on-surface">Learning & Development Management</h1>
        <p class="text-xs text-on-surface-variant">Enterprise course catalog, training program cohorts, and organizational skill acceleration tracks.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
        <h3 class="font-display text-base font-bold text-on-surface">Active Training Programs & Cohorts</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${learningCatalog.map(c => `
            <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col justify-between gap-3 text-xs">
              <div>
                <span class="text-[10px] uppercase font-bold text-primary">${c.type}</span>
                <h4 class="font-bold text-on-surface mt-1">${c.title}</h4>
                <span class="text-[11px] text-outline mt-0.5 block">${c.provider}</span>
              </div>
              <button class="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold shadow-xs">Manage Cohort</button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
