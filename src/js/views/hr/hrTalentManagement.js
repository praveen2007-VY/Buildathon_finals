// HR Module: Talent Management View (Skill Directory, Talent Search, Opportunities, Project Allocation)

import { candidateMarketplace, opportunities } from '../../data.js';

export function renderHrTalentManagementView() {
  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <div>
        <h1 class="font-display text-2xl font-bold text-on-surface">Talent Management & Allocation</h1>
        <p class="text-xs text-on-surface-variant">Taxonomy skill directory, candidate searching, internal mobility, and project allocation tracking.</p>
      </div>

      <!-- Skill Directory & Search -->
      <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
        <h3 class="font-display text-base font-bold text-on-surface">Enterprise Skill Directory</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container">
            <span class="font-bold text-primary block">AI & Machine Learning (1,240 Skills)</span>
            <p class="text-on-surface-variant mt-1">LLM Fine-Tuning, RAG Architecture, Vector DBs, PyTorch, Ray Core</p>
          </div>
          <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container">
            <span class="font-bold text-secondary block">Cloud Infrastructure (890 Skills)</span>
            <p class="text-on-surface-variant mt-1">Kubernetes, Terraform, AWS Security, Snowflake, Kafka Streaming</p>
          </div>
          <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container">
            <span class="font-bold text-tertiary block">People Strategy & Ops (450 Skills)</span>
            <p class="text-on-surface-variant mt-1">People Analytics, Visier, Attrition Modeling, Org Design, Succession</p>
          </div>
        </div>
      </div>

      <!-- Project Allocation Tracker -->
      <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
        <h3 class="font-display text-base font-bold text-on-surface">Strategic Project Allocation</h3>
        <div class="flex flex-col gap-3">
          ${opportunities.map(op => `
            <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between">
              <div class="flex flex-col">
                <span class="text-xs font-bold text-on-surface">${op.title}</span>
                <span class="text-[11px] text-outline">${op.dept} • Allocation Band: ${op.band}</span>
              </div>
              <button class="allocate-proj-btn px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold shadow-xs">
                Manage Allocation
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
