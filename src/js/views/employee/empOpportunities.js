// Employee Module: Opportunities View (Internal Jobs, Projects, Recommended Roles)

import { opportunities } from '../../data.js';

export function renderEmpOpportunitiesView() {
  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <div>
        <h1 class="font-display text-2xl font-bold text-on-surface">Internal Mobility & Opportunities</h1>
        <p class="text-xs text-on-surface-variant">Explore internal jobs, strategic project gigs, and recommended career paths matched to your skill graph.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${opportunities.map(op => `
          <div class="bg-white p-5 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between gap-4">
            <div class="flex items-start justify-between">
              <div class="flex flex-col">
                <span class="text-[10px] uppercase font-bold text-primary tracking-wider">${op.type}</span>
                <h3 class="font-display text-base font-bold text-on-surface mt-0.5">${op.title}</h3>
                <span class="text-xs text-outline mt-0.5">${op.dept} • ${op.location}</span>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold">${op.match}% Match</span>
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-surface-container">
              <span class="text-xs font-semibold text-on-surface">Target Band: ${op.band}</span>
              <button class="express-interest-btn px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-xs">
                Express Interest
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
