// Employee Module: Skill Gap View (Target Role, Missing Skills, Development Plan)

import { targetOpportunity } from '../../data.js';

export function renderEmpSkillGapView() {
  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <div>
        <h1 class="font-display text-2xl font-bold text-on-surface">Skill Gap & Growth Analysis</h1>
        <p class="text-xs text-on-surface-variant">Analyze capability shortfalls for target roles and execute personalized remediation plans.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-6">
        <div class="flex items-center justify-between border-b border-surface-container pb-4">
          <div class="flex flex-col">
            <span class="text-[10px] uppercase font-bold text-outline tracking-wider">Target Benchmark Role</span>
            <h2 class="font-display text-lg font-bold text-on-surface">${targetOpportunity.title}</h2>
          </div>
          <span class="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold">${targetOpportunity.matchScore}% Overall Match</span>
        </div>

        <div class="flex flex-col gap-4">
          <h3 class="font-display text-sm font-bold text-on-surface">Identified Missing Skills & Shortfalls</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${targetOpportunity.growthGaps.map(gap => `
              <div class="p-4 rounded-xl bg-error-container/20 border border-error-container/40 flex flex-col justify-between gap-3">
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-2 text-error">
                    <span class="material-symbols-outlined text-lg">warning</span>
                    <span class="text-xs font-bold">${gap.title}</span>
                  </div>
                  <span class="px-2 py-0.5 rounded bg-white text-error text-[10px] font-bold">Gap: ${gap.gap}</span>
                </div>
                <p class="text-xs text-on-surface-variant">${gap.estHours}</p>
                <button class="enroll-gap-btn mt-2 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold self-start shadow-xs">
                  Enroll Development Plan
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}
