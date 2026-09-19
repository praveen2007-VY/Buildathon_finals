// Screen 4: HR Intelligence Dashboard View matching Stitch specs

import { openRoles, candidateMarketplace } from '../data.js';

export function renderHrDashboardView() {
  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <!-- Executive Cockpit Header -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-2">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <span class="text-xs uppercase tracking-wider text-primary font-semibold">Executive Cockpit</span>
            <span class="text-outline text-xs">/</span>
            <span class="text-xs text-on-surface-variant font-medium">Q3 Workforce Cadence</span>
          </div>
          <h1 class="font-display text-2xl font-bold text-on-surface tracking-tight">Enterprise Workforce & Talent Intelligence Dashboard</h1>
          <p class="text-xs text-on-surface-variant max-w-3xl">
            Holistic organizational visibility into internal mobility, talent pipeline health, skill gap distribution, and retention risks across all dynamic business units.
          </p>
        </div>

        <!-- Filter Controls -->
        <div class="flex flex-wrap items-center gap-3">
          <div class="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-xs border border-surface-container">
            <span class="material-symbols-outlined text-outline text-base">calendar_today</span>
            <select id="hrPeriodSelect" class="bg-transparent text-xs text-on-surface font-semibold focus:outline-none cursor-pointer">
              <option value="90">Last 90 Days</option>
              <option value="ytd">Year to Date (YTD)</option>
              <option value="12m">Trailing 12 Months</option>
            </select>
          </div>

          <div class="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-xs border border-surface-container">
            <span class="material-symbols-outlined text-outline text-base">domain</span>
            <select id="hrUnitSelect" class="bg-transparent text-xs text-on-surface font-semibold focus:outline-none cursor-pointer">
              <option value="all">All Enterprise Units</option>
              <option value="eng">Engineering & Platform</option>
              <option value="ai">Data & AI</option>
            </select>
          </div>

          <button id="downloadBoardPdfBtn" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-all shadow-xs">
            <span class="material-symbols-outlined text-base">picture_as_pdf</span>
            <span>Download Board Report (PDF)</span>
          </button>
        </div>
      </div>

      <!-- Executive Stat Metrics Strip (4 Elevated Cards) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <!-- Metric 1 -->
        <div class="bg-white p-4 rounded-xl shadow-xs border border-surface-container flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-[11px] uppercase tracking-wider text-outline font-semibold">Internal Mobility</span>
            <span class="material-symbols-outlined text-primary-container text-xl">sync_alt</span>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="font-display text-3xl text-on-surface font-bold">34.2%</span>
            <span class="text-xs text-primary font-semibold flex items-center">
              <span class="material-symbols-outlined text-xs">trending_up</span>+6.8% YoY
            </span>
          </div>
          <div class="mt-2 text-xs text-on-surface-variant flex justify-between">
            <span>Agency Savings</span>
            <span class="font-bold text-primary">$2.4M</span>
          </div>
          <div class="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
            <div class="bg-primary-container h-full rounded-full" style="width: 68%"></div>
          </div>
        </div>

        <!-- Metric 2 -->
        <div class="bg-white p-4 rounded-xl shadow-xs border border-surface-container flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-[11px] uppercase tracking-wider text-outline font-semibold">Skill Coverage</span>
            <span class="material-symbols-outlined text-primary text-xl">verified_user</span>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="font-display text-3xl text-on-surface font-bold">88.5%</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-semibold">Resilient</span>
          </div>
          <div class="mt-2 text-xs text-on-surface-variant flex justify-between">
            <span>Tech & Core Product</span>
            <span class="font-semibold text-on-surface">Target >85%</span>
          </div>
          <div class="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
            <div class="bg-primary h-full rounded-full" style="width: 88.5%"></div>
          </div>
        </div>

        <!-- Metric 3 -->
        <div class="bg-white p-4 rounded-xl shadow-xs border border-surface-container flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-[11px] uppercase tracking-wider text-outline font-semibold">Open Requisitions</span>
            <span class="material-symbols-outlined text-secondary text-xl">hub</span>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="font-display text-3xl text-on-surface font-bold">64</span>
            <span class="text-xs text-outline">Active</span>
          </div>
          <div class="mt-2 text-xs text-on-surface-variant flex justify-between">
            <span>Matches (>85%)</span>
            <span class="font-bold text-secondary">42 Roles</span>
          </div>
          <div class="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
            <div class="bg-secondary h-full rounded-full" style="width: 65%"></div>
          </div>
        </div>

        <!-- Metric 4 -->
        <div class="bg-white p-4 rounded-xl shadow-xs border border-surface-container flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-[11px] uppercase tracking-wider text-outline font-semibold">Avg Internal Fill Time</span>
            <span class="material-symbols-outlined text-primary text-xl">bolt</span>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="font-display text-3xl text-on-surface font-bold">14</span>
            <span class="text-sm font-semibold text-on-surface">Days</span>
          </div>
          <div class="mt-2 text-xs text-on-surface-variant flex justify-between">
            <span>vs. External 48d</span>
            <span class="font-bold text-primary">-70.8% Speed</span>
          </div>
          <div class="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
            <div class="bg-primary-fixed-dim h-full rounded-full" style="width: 30%"></div>
          </div>
        </div>
      </div>

      <!-- Charts & Skill Gaps Section (2 Equal Columns) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- SVG Velocity Chart -->
        <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="font-display text-base font-bold text-on-surface">Internal Placement Velocity</h2>
              <p class="text-xs text-on-surface-variant">Promotions vs lateral shifts over past 4 quarters</p>
            </div>
            <div class="flex items-center gap-3 text-xs">
              <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-primary inline-block"></span> Promotions</span>
              <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-secondary-fixed-dim inline-block"></span> Laterals</span>
            </div>
          </div>

          <div class="w-full h-56 flex flex-col justify-end">
            <svg class="w-full h-full" viewBox="0 0 540 200" preserveAspectRatio="none">
              <line stroke="#E7E8E6" stroke-dasharray="3 3" x1="40" x2="520" y1="30" y2="30"/>
              <line stroke="#E7E8E6" stroke-dasharray="3 3" x1="40" x2="520" y1="80" y2="80"/>
              <line stroke="#E7E8E6" stroke-dasharray="3 3" x1="40" x2="520" y1="130" y2="130"/>
              <line stroke="#E7E8E6" x1="40" x2="520" y1="180" y2="180"/>
              
              <g transform="translate(80,0)">
                <rect class="fill-current text-primary" x="0" y="100" width="26" height="80" rx="3"/>
                <rect class="fill-current text-secondary-fixed-dim" x="30" y="125" width="26" height="55" rx="3"/>
                <text x="28" y="196" font-size="10" text-anchor="middle" class="fill-current text-outline font-medium">Q4 (Prev)</text>
              </g>

              <g transform="translate(190,0)">
                <rect class="fill-current text-primary" x="0" y="82" width="26" height="98" rx="3"/>
                <rect class="fill-current text-secondary-fixed-dim" x="30" y="110" width="26" height="70" rx="3"/>
                <text x="28" y="196" font-size="10" text-anchor="middle" class="fill-current text-outline font-medium">Q1</text>
              </g>

              <g transform="translate(300,0)">
                <rect class="fill-current text-primary" x="0" y="65" width="26" height="115" rx="3"/>
                <rect class="fill-current text-secondary-fixed-dim" x="30" y="95" width="26" height="85" rx="3"/>
                <text x="28" y="196" font-size="10" text-anchor="middle" class="fill-current text-outline font-medium">Q2</text>
              </g>

              <g transform="translate(410,0)">
                <rect class="fill-current text-primary" x="0" y="42" width="26" height="138" rx="3"/>
                <rect class="fill-current text-secondary-fixed-dim" x="30" y="70" width="26" height="110" rx="3"/>
                <text x="28" y="196" font-size="10" text-anchor="middle" class="fill-current text-on-surface font-bold">Q3 (Active)</text>
              </g>
            </svg>
          </div>
        </div>

        <!-- Skill Gap Distribution -->
        <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-display text-base font-bold text-on-surface">Critical Skill Gap Distribution</h2>
            <span class="text-xs text-outline">Target: 85% average</span>
          </div>

          <div class="flex flex-col gap-4">
            <div>
              <div class="flex justify-between items-center mb-1 text-xs">
                <span class="font-semibold text-on-surface">AI & ML Engineering</span>
                <span class="font-bold text-on-surface">78%</span>
              </div>
              <div class="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div class="bg-amber-500 h-full rounded-full" style="width: 78%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between items-center mb-1 text-xs">
                <span class="font-semibold text-on-surface">Cloud Security & DevSecOps</span>
                <span class="font-bold text-on-surface">82%</span>
              </div>
              <div class="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div class="bg-primary h-full rounded-full" style="width: 82%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between items-center mb-1 text-xs">
                <span class="font-semibold text-on-surface">Data Platform & Distributed Systems</span>
                <span class="font-bold text-on-surface">91%</span>
              </div>
              <div class="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div class="bg-primary-container h-full rounded-full" style="width: 91%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- High Priority Roles Table -->
      <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 class="font-display text-base font-bold text-on-surface">High-Priority Open Roles & Recommended Candidates</h2>
            <p class="text-xs text-on-surface-variant">Live openings querying internal talent graphs</p>
          </div>
          <button id="filterScoreBtn" class="px-3 py-1.5 rounded-lg bg-surface-container text-xs font-semibold hover:bg-surface-container-high transition-colors">
            Filter by Match Score (>85%)
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="text-outline text-[11px] uppercase tracking-wider bg-surface-container-low">
                <th class="py-3 px-4 rounded-l-lg">Role & Department</th>
                <th class="py-3 px-4">Hiring Manager</th>
                <th class="py-3 px-4">Top Candidate</th>
                <th class="py-3 px-4">Match Score</th>
                <th class="py-3 px-4 rounded-r-lg text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-container">
              ${openRoles.map(r => `
                <tr class="hover:bg-surface-container-low/50 transition-colors">
                  <td class="py-3.5 px-4">
                    <div class="flex flex-col">
                      <span class="text-xs font-bold text-on-surface">${r.title}</span>
                      <span class="text-[11px] text-outline">${r.dept}</span>
                    </div>
                  </td>
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-2">
                      <img src="${r.managerAvatar}" class="w-6 h-6 rounded-full object-cover"/>
                      <span class="text-xs text-on-surface font-medium">${r.hiringManager}</span>
                    </div>
                  </td>
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-2">
                      <img src="${r.candidateAvatar}" class="w-6 h-6 rounded-full object-cover"/>
                      <span class="text-xs text-on-surface font-semibold">${r.topCandidate}</span>
                    </div>
                  </td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-[11px] font-bold">${r.matchScore}</span>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <a href="#/talent-discovery" class="text-xs text-primary font-semibold hover:underline">Route Candidate</a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
