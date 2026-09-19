// Screen 5: Internal Talent Discovery View matching Stitch specs

import { candidateMarketplace, openRoles } from '../data.js';

export function renderTalentDiscoveryView() {
  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <!-- Top Command & Action Bar -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-secondary-fixed text-on-secondary-fixed uppercase tracking-wider font-semibold">
              <span class="material-symbols-outlined text-xs mr-1">psychology</span>
              Graph Matcher v4.2
            </span>
            <span class="text-outline text-xs">• Updated 4 mins ago</span>
          </div>
          <h1 class="font-display text-2xl font-bold text-on-surface tracking-tight">Internal Talent Discovery & Candidate Marketplace</h1>
          <p class="text-xs text-on-surface-variant max-w-3xl">Search, evaluate, and source qualified internal personnel across distributed business units using multi-vector skill graphs and mobility telemetry.</p>
        </div>

        <div class="flex items-center gap-3 self-start lg:self-auto">
          <button id="exportPoolCsvBtn" class="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white shadow-xs border border-surface-container hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors" type="button">
            <span class="material-symbols-outlined text-base text-outline">file_download</span>
            <span>Export Pool (CSV)</span>
          </button>
          <button id="createSearchReqBtn" class="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-container text-on-primary-container text-xs font-semibold shadow-xs hover:bg-primary-container/90 transition-all" type="button">
            <span class="material-symbols-outlined text-base font-semibold">add</span>
            <span>Create Search Requisition</span>
          </button>
        </div>
      </div>

      <!-- Enterprise Filter Bar -->
      <div class="bg-white p-4 rounded-2xl shadow-xs border border-surface-container">
        <!-- Semantic Search Input -->
        <div class="relative w-full flex items-center mb-3">
          <span class="material-symbols-outlined absolute left-3.5 text-primary text-xl pointer-events-none">travel_explore</span>
          <input 
            type="text" 
            id="semanticTalentSearch" 
            placeholder="Search by skills, job families, potential target roles, or employee name..." 
            value="Python, Tableau, BI Architecture, Financial Modeling, Ready < 30d"
            class="w-full h-11 pl-11 pr-28 rounded-xl bg-surface-container-low text-on-surface text-xs placeholder:text-outline focus:outline-none focus:bg-white border border-transparent focus:border-primary-container transition-all"
          />
          <div class="absolute right-2.5 flex items-center gap-1.5">
            <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-secondary-fixed text-on-secondary-fixed">
              <span class="material-symbols-outlined text-xs mr-0.5">auto_awesome</span> Semantic
            </span>
            <button id="applySemanticSearchBtn" class="px-2.5 py-1 rounded bg-primary-container text-on-primary-container text-xs font-semibold hover:opacity-90 transition-opacity">Apply</button>
          </div>
        </div>

        <!-- Filter Pill Controls -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div class="flex flex-wrap items-center gap-2">
            <div class="relative">
              <button class="filter-pill-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface text-xs font-medium hover:bg-surface-container-high transition-colors">
                <span class="text-outline text-[10px] uppercase">Dept:</span>
                <span class="font-semibold">All Departments</span>
                <span class="material-symbols-outlined text-sm text-outline">expand_more</span>
              </button>
            </div>

            <div class="relative">
              <button class="filter-pill-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                <span class="material-symbols-outlined text-xs">verified</span>
                <span class="text-[10px] uppercase">Match:</span>
                <span class="font-semibold">85%+ Overlap</span>
                <span class="material-symbols-outlined text-sm">expand_more</span>
              </button>
            </div>

            <div class="relative">
              <button class="filter-pill-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface text-xs font-medium hover:bg-surface-container-high transition-colors">
                <span class="text-outline text-[10px] uppercase">Availability:</span>
                <span class="font-semibold">Within 30–60 Days</span>
                <span class="material-symbols-outlined text-sm text-outline">expand_more</span>
              </button>
            </div>
          </div>

          <div class="flex items-center gap-2 text-xs text-on-surface-variant ml-auto">
            <span>Active Filters: <strong class="text-on-surface">3</strong></span>
            <button id="resetFiltersBtn" class="text-primary hover:underline font-semibold">Reset all</button>
          </div>
        </div>
      </div>

      <!-- Talent Pool Metric Strip -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-xl shadow-xs border border-surface-container flex items-center justify-between">
          <div class="flex flex-col">
            <span class="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">Qualified Candidates</span>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="font-display text-3xl text-on-surface font-bold">142</span>
              <span class="text-[11px] text-primary font-semibold flex items-center">
                <span class="material-symbols-outlined text-xs">arrow_upward</span>+18
              </span>
            </div>
          </div>
          <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <span class="material-symbols-outlined text-xl">groups</span>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl shadow-xs border border-surface-container flex items-center justify-between">
          <div class="flex flex-col">
            <span class="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">Avg Skill Overlap</span>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="font-display text-3xl text-on-surface font-bold">89%</span>
            </div>
          </div>
          <div class="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
            <span class="material-symbols-outlined text-xl">analytics</span>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl shadow-xs border border-surface-container flex items-center justify-between">
          <div class="flex flex-col">
            <span class="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">Mobility Readiness</span>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="font-display text-3xl text-on-surface font-bold">48</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold">Immediate</span>
            </div>
          </div>
          <div class="w-10 h-10 rounded-xl bg-primary-fixed/40 flex items-center justify-center text-primary shrink-0">
            <span class="material-symbols-outlined text-xl">transfer_within_a_station</span>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl shadow-xs border border-surface-container flex items-center justify-between">
          <div class="flex flex-col">
            <span class="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">Internal Fill Time</span>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="font-display text-3xl text-primary font-bold">3.2</span>
              <span class="text-xs text-on-surface font-bold">Days</span>
            </div>
          </div>
          <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <span class="material-symbols-outlined text-xl">bolt</span>
          </div>
        </div>
      </div>

      <!-- Candidate Cards Marketplace (8 / 4 Split) -->
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <!-- Candidates Grid (8 Cols) -->
        <div class="xl:col-span-8 flex flex-col gap-4" id="candidateListContainer">
          ${candidateMarketplace.map(c => `
            <div class="candidate-card bg-white p-6 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col gap-4 relative overflow-hidden border border-surface-container">
              ${c.topMatch ? `
                <div class="absolute top-0 right-0">
                  <div class="bg-primary text-white text-[10px] px-3 py-1 rounded-bl-xl font-semibold tracking-wide flex items-center gap-1">
                    <span class="material-symbols-outlined text-xs">star</span> Top Requisition Match
                  </div>
                </div>
              ` : ''}

              <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div class="flex items-start gap-4">
                  <img src="${c.avatar}" alt="${c.name}" class="w-14 h-14 rounded-xl object-cover shadow-xs shrink-0 border border-surface-container"/>
                  <div class="flex flex-col">
                    <div class="flex items-center gap-2 flex-wrap">
                      <h2 class="font-display text-base font-bold text-on-surface">${c.name}</h2>
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
                        <span class="material-symbols-outlined text-xs mr-0.5">check_circle</span> Verified
                      </span>
                      <span class="text-xs text-outline">ID: ${c.id}</span>
                    </div>
                    <p class="text-xs text-on-surface-variant font-medium mt-0.5">${c.role}</p>
                    <div class="flex items-center gap-3 text-outline text-[11px] mt-1">
                      <span class="flex items-center gap-1"><span class="material-symbols-outlined text-xs">location_on</span> ${c.location}</span>
                      <span>•</span>
                      <span class="flex items-center gap-1"><span class="material-symbols-outlined text-xs">schedule</span> ${c.tenure} tenure</span>
                    </div>
                  </div>
                </div>

                <div class="shrink-0 mt-2 sm:mt-0">
                  <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 text-primary">
                    <span class="font-display text-2xl font-bold">${c.matchScore}%</span>
                    <div class="flex flex-col text-left">
                      <span class="text-[10px] uppercase font-bold leading-tight">Match</span>
                      <span class="text-[10px] opacity-80 leading-tight">Score</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- AI Diagnostic Rationale -->
              <div class="p-3.5 rounded-xl bg-secondary-fixed/30 text-on-secondary-fixed flex items-start gap-3 border border-secondary-fixed/50">
                <span class="material-symbols-outlined text-lg text-secondary shrink-0 mt-0.5">auto_awesome</span>
                <div class="flex flex-col">
                  <span class="text-[10px] uppercase tracking-wider font-bold text-secondary">AI Diagnostic Reasoning</span>
                  <p class="text-xs text-on-surface mt-0.5 leading-relaxed">${c.diagnostic}</p>
                </div>
              </div>

              <!-- Competencies -->
              <div class="flex flex-col gap-1">
                <span class="text-[10px] uppercase tracking-wider text-outline font-semibold">Matched Core Competencies</span>
                <div class="flex flex-wrap items-center gap-1.5">
                  ${c.competencies.map(comp => `
                    <span class="px-2.5 py-1 rounded-md bg-surface-container text-xs text-on-surface font-medium">${comp}</span>
                  `).join('')}
                </div>
              </div>

              <!-- Card Action Buttons -->
              <div class="flex items-center justify-between pt-2 border-t border-surface-container">
                <button class="view-profile-btn text-xs text-primary font-semibold hover:underline flex items-center gap-1" data-id="${c.id}">
                  <span class="material-symbols-outlined text-sm">visibility</span> View Full Profile
                </button>
                <div class="flex items-center gap-2">
                  <button class="add-pool-btn px-3 py-1.5 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition-colors" data-id="${c.id}">
                    Add to Pool
                  </button>
                  <button class="invite-btn px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary-container text-xs font-semibold hover:bg-primary-container/90 transition-colors shadow-xs flex items-center gap-1" data-name="${c.name}">
                    <span class="material-symbols-outlined text-sm">outgoing_mail</span> Invite to Interview
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Active Requisitions Sidebar (4 Cols) -->
        <div class="xl:col-span-4 flex flex-col gap-4">
          <div class="bg-white p-4 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-on-surface">Active Requisitions</span>
              <span class="text-[11px] text-primary font-semibold">12 Open</span>
            </div>
            <div class="flex flex-col gap-2">
              ${openRoles.map(r => `
                <div class="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer border border-surface-container">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-on-surface">${r.title}</span>
                    <span class="text-[10px] font-bold text-primary">${r.matchScore}</span>
                  </div>
                  <span class="text-[10px] text-outline mt-0.5 block">${r.dept}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
