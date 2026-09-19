// HR Module: Recruitment & Onboarding View

import { jobRequisitions, candidateMarketplace } from '../../data.js';

export function renderHrRecruitmentView() {
  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <div>
        <h1 class="font-display text-2xl font-bold text-on-surface">Recruitment & Onboarding Workflows</h1>
        <p class="text-xs text-on-surface-variant">Manage job requisitions, candidate routing pipelines, onboarding checklists, and legal documents.</p>
      </div>

      <!-- Requisitions Intake Grid -->
      <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <h3 class="font-display text-base font-bold text-on-surface">Active Requisitions (${jobRequisitions.length})</h3>
          <button id="newReqBtn" class="px-3.5 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold shadow-xs">+ Create Requisition</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          ${jobRequisitions.map(req => `
            <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col justify-between gap-3">
              <div>
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-bold text-outline">${req.reqId}</span>
                  <span class="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">${req.status}</span>
                </div>
                <h4 class="font-bold text-on-surface mt-1">${req.title}</h4>
                <span class="text-[11px] text-outline block mt-0.5">${req.dept}</span>
              </div>
              <div class="flex items-center justify-between pt-2 border-t border-surface-container">
                <span class="text-primary font-bold">${req.candidatesCount} Candidates Matched</span>
                <button class="px-2.5 py-1 rounded bg-white text-on-surface font-semibold border border-surface-container">Inspect</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
