// HR Module: Performance Management View

import { performanceGoals } from '../../data.js';

export function renderHrPerformanceView() {
  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <div>
        <h1 class="font-display text-2xl font-bold text-on-surface">Performance Management</h1>
        <p class="text-xs text-on-surface-variant">Track organizational goals, annual performance reviews, and individual development plans.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
        <h3 class="font-display text-base font-bold text-on-surface">Enterprise Strategic Goals & KPIs</h3>
        <div class="flex flex-col gap-3">
          ${performanceGoals.map(g => `
            <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-2 text-xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-on-surface">${g.goal}</span>
                <span class="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold text-[10px]">${g.status}</span>
              </div>
              <div class="flex items-center justify-between text-[11px] text-outline">
                <span>Target: ${g.target}</span>
                <span>${g.progress}% Completed</span>
              </div>
              <div class="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div class="bg-primary-container h-full rounded-full" style="width: ${g.progress}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
