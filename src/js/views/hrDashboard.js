// Screen 4: HR Intelligence Dashboard View - Powered by Supabase

import { getHrAnalyticsMetrics } from '../data.js';

export function renderHrDashboardView(deptFilter = 'all', locFilter = 'all') {
  const metrics = getHrAnalyticsMetrics(deptFilter, locFilter);

  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <!-- Executive Cockpit Header -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-2">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-xs uppercase tracking-wider text-primary font-semibold">Executive Cockpit</span>
            <span class="text-outline text-xs">/</span>
            <span class="text-xs text-on-surface-variant font-medium">Supabase Dataset: yhskpilxfkzzmmamvcaa</span>
            <span class="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">
              ${metrics.totalEmployees} Live Personnel Connected
            </span>
          </div>
          <h1 class="font-display text-2xl font-bold text-on-surface tracking-tight">Enterprise Workforce & Talent Intelligence Dashboard</h1>
          <p class="text-xs text-on-surface-variant max-w-3xl">
            Real-time organizational analytics powered by Supabase workforce records across ${metrics.departments.length} departments and ${metrics.locations.length} office hubs.
          </p>
        </div>

        <!-- Filter Controls -->
        <div class="flex flex-wrap items-center gap-3">
          <div class="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-xs border border-surface-container">
            <span class="material-symbols-outlined text-outline text-base">domain</span>
            <select id="hrDeptFilterSelect" class="bg-transparent text-xs text-on-surface font-semibold focus:outline-none cursor-pointer">
              <option value="all" ${deptFilter === 'all' ? 'selected' : ''}>All Departments (${metrics.departments.length})</option>
              ${metrics.departments.map(d => `
                <option value="${d}" ${deptFilter === d ? 'selected' : ''}>${d}</option>
              `).join('')}
            </select>
          </div>

          <div class="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-xs border border-surface-container">
            <span class="material-symbols-outlined text-outline text-base">pin_drop</span>
            <select id="hrLocFilterSelect" class="bg-transparent text-xs text-on-surface font-semibold focus:outline-none cursor-pointer">
              <option value="all" ${locFilter === 'all' ? 'selected' : ''}>All Locations (${metrics.locations.length})</option>
              ${metrics.locations.map(l => `
                <option value="${l}" ${locFilter === l ? 'selected' : ''}>${l}</option>
              `).join('')}
            </select>
          </div>

          <button id="downloadBoardPdfBtn" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-all shadow-xs">
            <span class="material-symbols-outlined text-base">picture_as_pdf</span>
            <span>Export HR Report</span>
          </button>
        </div>
      </div>

      <!-- Executive Stat Metrics Strip (4 Elevated Cards) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <!-- Metric 1: Total Employees -->
        <div class="bg-white p-5 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-[11px] uppercase tracking-wider text-outline font-semibold">Total Personnel</span>
            <span class="material-symbols-outlined text-primary-container text-xl">groups</span>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="font-display text-3xl text-on-surface font-bold">${metrics.totalEmployees}</span>
            <span class="text-xs text-primary font-semibold flex items-center">
              <span class="material-symbols-outlined text-xs mr-0.5">check_circle</span>${metrics.activeEmployees} Active
            </span>
          </div>
          <div class="mt-2 text-xs text-on-surface-variant flex justify-between">
            <span>Workforce Status</span>
            <span class="font-bold text-primary">100% Operational</span>
          </div>
          <div class="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
            <div class="bg-primary-container h-full rounded-full" style="width: 100%"></div>
          </div>
        </div>

        <!-- Metric 2: New Joiners / Freshers -->
        <div class="bg-white p-5 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-[11px] uppercase tracking-wider text-outline font-semibold">New Joiners / Freshers</span>
            <span class="material-symbols-outlined text-primary text-xl">person_add</span>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="font-display text-3xl text-on-surface font-bold">${metrics.newJoiners}</span>
            <span class="text-[10px] px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-semibold">Entry Level</span>
          </div>
          <div class="mt-2 text-xs text-on-surface-variant flex justify-between">
            <span>Freshers Share</span>
            <span class="font-semibold text-on-surface">${Math.round((metrics.newJoiners / Math.max(metrics.totalEmployees, 1)) * 100)}% of Total</span>
          </div>
          <div class="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
            <div class="bg-primary h-full rounded-full" style="width: ${Math.round((metrics.newJoiners / Math.max(metrics.totalEmployees, 1)) * 100)}%"></div>
          </div>
        </div>

        <!-- Metric 3: Senior Technical Leads -->
        <div class="bg-white p-5 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-[11px] uppercase tracking-wider text-outline font-semibold">Senior & Staff Leads</span>
            <span class="material-symbols-outlined text-secondary text-xl">workspace_premium</span>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="font-display text-3xl text-on-surface font-bold">${metrics.seniorLeads}</span>
            <span class="text-xs text-outline">5+ Yrs Exp</span>
          </div>
          <div class="mt-2 text-xs text-on-surface-variant flex justify-between">
            <span>Leadership Ratio</span>
            <span class="font-bold text-secondary">${Math.round((metrics.seniorLeads / Math.max(metrics.totalEmployees, 1)) * 100)}% Senior</span>
          </div>
          <div class="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
            <div class="bg-secondary h-full rounded-full" style="width: ${Math.round((metrics.seniorLeads / Math.max(metrics.totalEmployees, 1)) * 100)}%"></div>
          </div>
        </div>

        <!-- Metric 4: Average Org Performance -->
        <div class="bg-white p-5 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-[11px] uppercase tracking-wider text-outline font-semibold">Avg Performance Rating</span>
            <span class="material-symbols-outlined text-primary text-xl">star</span>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="font-display text-3xl text-on-surface font-bold">${metrics.avgPerf}</span>
            <span class="text-sm font-semibold text-on-surface">/ 5.0</span>
          </div>
          <div class="mt-2 text-xs text-on-surface-variant flex justify-between">
            <span>Verified Telemetry</span>
            <span class="font-bold text-primary">High Veracity</span>
          </div>
          <div class="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
            <div class="bg-primary-fixed-dim h-full rounded-full" style="width: ${Math.round((parseFloat(metrics.avgPerf) / 5.0) * 100)}%"></div>
          </div>
        </div>
      </div>

      <!-- Department Distribution & Headcount Experience Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Department Distribution List (7 Cols) -->
        <div class="lg:col-span-7 bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
          <div class="flex items-center justify-between border-b border-surface-container pb-3">
            <div>
              <h2 class="font-display text-base font-bold text-on-surface">Department Workforce Distribution</h2>
              <p class="text-xs text-on-surface-variant">Headcount distribution across database business units</p>
            </div>
            <span class="text-xs font-bold text-primary">${Object.keys(metrics.deptDist).length} Units</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${Object.keys(metrics.deptDist).map(d => {
              const count = metrics.deptDist[d];
              const pct = Math.round((count / Math.max(metrics.totalEmployees, 1)) * 100);
              return `
                <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-1.5">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-bold text-on-surface leading-tight">${d}</span>
                    <span class="font-display font-bold text-primary">${count} <span class="text-[10px] font-normal text-outline">(${pct}%)</span></span>
                  </div>
                  <div class="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div class="bg-primary-container h-full rounded-full" style="width: ${Math.max(8, pct * 2.5)}%"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Experience & Tenure Distribution (5 Cols) -->
        <div class="lg:col-span-5 bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between">
          <div class="flex items-center justify-between mb-4 border-b border-surface-container pb-3">
            <div>
              <h2 class="font-display text-base font-bold text-on-surface">Experience Band Breakdown</h2>
              <p class="text-xs text-on-surface-variant">Tenure distribution from freshers to staff leads</p>
            </div>
          </div>

          <div class="flex flex-col gap-4">
            ${Object.keys(metrics.expBands).map(band => {
              const count = metrics.expBands[band];
              const pct = Math.round((count / Math.max(metrics.totalEmployees, 1)) * 100);
              return `
                <div>
                  <div class="flex justify-between items-center mb-1 text-xs">
                    <span class="font-semibold text-on-surface">${band}</span>
                    <span class="font-bold text-on-surface">${count} Employees (${pct}%)</span>
                  </div>
                  <div class="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div class="bg-secondary h-full rounded-full" style="width: ${Math.max(5, pct)}%"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Critical Skill Gap & HR Action Center Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Critical Skill Gap Analysis (7 Cols) -->
        <div class="lg:col-span-7 bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between">
          <div class="flex items-center justify-between mb-4 border-b border-surface-container pb-3">
            <div>
              <h2 class="font-display text-base font-bold text-on-surface">Critical Skill Gap & Coverage Analysis</h2>
              <p class="text-xs text-on-surface-variant">Real workforce skill availability vs target demand</p>
            </div>
            <span class="text-xs font-semibold text-primary">Database Telemetry</span>
          </div>

          <div class="flex flex-col gap-4">
            ${metrics.criticalGaps.map(g => `
              <div>
                <div class="flex justify-between items-center mb-1 text-xs">
                  <span class="font-semibold text-on-surface flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full ${g.coverage < 25 ? 'bg-error' : (g.coverage < 50 ? 'bg-amber-500' : 'bg-primary')}"></span>
                    ${g.skill}
                  </span>
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${g.coverage < 25 ? 'bg-error/10 text-error' : (g.coverage < 50 ? 'bg-amber-100 text-amber-900' : 'bg-primary/10 text-primary')}">${g.status}</span>
                    <span class="font-bold text-on-surface">${g.coverage}%</span>
                  </div>
                </div>
                <div class="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div class="${g.coverage < 25 ? 'bg-error' : (g.coverage < 50 ? 'bg-amber-500' : 'bg-primary-container')} h-full rounded-full" style="width: ${Math.max(5, g.coverage)}%"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- HR Action Center (5 Cols) -->
        <div class="lg:col-span-5 bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between">
          <div class="flex items-center justify-between mb-4 border-b border-surface-container pb-3">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary text-xl">notifications_active</span>
              <div>
                <h2 class="font-display text-base font-bold text-on-surface">HR Action Center</h2>
                <p class="text-xs text-on-surface-variant">Priority operational alerts requiring attention</p>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            ${metrics.hrActions.map(action => `
              <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex items-start gap-3">
                <span class="material-symbols-outlined ${action.type === 'warning' ? 'text-amber-500' : (action.type === 'error' ? 'text-error' : 'text-primary')} text-lg mt-0.5">
                  ${action.type === 'warning' ? 'warning' : (action.type === 'error' ? 'error' : 'info')}
                </span>
                <div class="flex flex-col flex-1">
                  <span class="text-xs font-bold text-on-surface">${action.title}</span>
                  <p class="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">${action.detail}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- High Priority Roles Table (Strictly NO undefined values) -->
      <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-container pb-3">
          <div>
            <h2 class="font-display text-base font-bold text-on-surface">Active Job Requisitions & Recommended Top Candidates</h2>
            <p class="text-xs text-on-surface-variant">Querying real database records and internal talent match scores</p>
          </div>
          <a href="#/hr/analyze" class="px-3.5 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all flex items-center gap-1.5 self-start sm:self-auto">
            <span class="material-symbols-outlined text-sm">add</span>
            <span>Post Requisition</span>
          </a>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="text-outline text-[11px] uppercase tracking-wider bg-surface-container-low">
                <th class="py-3 px-4 rounded-l-lg">Requisition ID & Title</th>
                <th class="py-3 px-4">Department</th>
                <th class="py-3 px-4">Hiring Manager</th>
                <th class="py-3 px-4">Top Candidate</th>
                <th class="py-3 px-4">Match Score</th>
                <th class="py-3 px-4">Stage</th>
                <th class="py-3 px-4 rounded-r-lg text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-container">
              ${metrics.requisitions.map(r => `
                <tr class="hover:bg-surface-container-low/50 transition-colors">
                  <td class="py-3.5 px-4">
                    <div class="flex flex-col">
                      <span class="text-xs font-bold text-on-surface">${r.title || 'N/A'}</span>
                      <span class="text-[10px] text-outline">${r.id || 'N/A'} • Open Date: ${r.openDate || 'N/A'}</span>
                    </div>
                  </td>
                  <td class="py-3.5 px-4">
                    <span class="text-xs text-on-surface font-medium">${r.department || 'N/A'}</span>
                  </td>
                  <td class="py-3.5 px-4">
                    <span class="text-xs text-on-surface font-medium">${r.hiringManager || 'N/A'}</span>
                  </td>
                  <td class="py-3.5 px-4">
                    <span class="text-xs text-on-surface font-bold text-primary">${r.topCandidate || 'N/A'}</span>
                  </td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-[11px] font-bold">${r.matchScore || 'N/A'}</span>
                  </td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-[10px] font-semibold">${r.currentStage || 'N/A'}</span>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <a href="#/hr/analyze" class="text-xs text-primary font-bold hover:underline">Run AI Match</a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Employee Directory Summary Table (All 50 Database Personnel) -->
      <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
        <div class="flex items-center justify-between border-b border-surface-container pb-3">
          <div>
            <h2 class="font-display text-base font-bold text-on-surface">Employee Directory Summary (${metrics.filteredEmployees.length} Records)</h2>
            <p class="text-xs text-on-surface-variant">Live summary of personnel stored in Supabase dataset</p>
          </div>
          <span class="text-xs text-outline font-semibold">Page 1 of 1</span>
        </div>

        <div class="overflow-x-auto max-h-[420px]">
          <table class="w-full text-left border-collapse">
            <thead class="sticky top-0 bg-white shadow-xs z-10">
              <tr class="text-outline text-[11px] uppercase tracking-wider bg-surface-container-low">
                <th class="py-3 px-4 rounded-l-lg">ID & Name</th>
                <th class="py-3 px-4">Role & Department</th>
                <th class="py-3 px-4">Location</th>
                <th class="py-3 px-4">Experience</th>
                <th class="py-3 px-4">Performance</th>
                <th class="py-3 px-4 rounded-r-lg">Technical Skills</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-container">
              ${metrics.filteredEmployees.map(e => `
                <tr class="hover:bg-surface-container-low/50 transition-colors">
                  <td class="py-3 px-4">
                    <div class="flex items-center gap-2.5">
                      <img src="${e.avatar}" class="w-7 h-7 rounded-full object-cover"/>
                      <div class="flex flex-col">
                        <span class="text-xs font-bold text-on-surface">${e.name || 'N/A'}</span>
                        <span class="text-[10px] text-outline">${e.id || 'N/A'}</span>
                      </div>
                    </div>
                  </td>
                  <td class="py-3 px-4">
                    <div class="flex flex-col">
                      <span class="text-xs font-semibold text-on-surface">${e.role || 'N/A'}</span>
                      <span class="text-[10px] text-outline">${e.department || 'N/A'}</span>
                    </div>
                  </td>
                  <td class="py-3 px-4 text-xs text-on-surface">${e.location || 'N/A'}</td>
                  <td class="py-3 px-4 text-xs text-on-surface font-medium">${e.experience || 'N/A'}</td>
                  <td class="py-3 px-4">
                    <span class="px-2 py-0.5 rounded text-[11px] font-bold ${e.performanceScore >= 4.5 ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-surface-container-high text-on-surface-variant'}">
                      ${e.performanceScore || 'N/A'} / 5.0
                    </span>
                  </td>
                  <td class="py-3 px-4">
                    <div class="flex flex-wrap gap-1 max-w-[240px]">
                      ${(e.skills || []).slice(0, 3).map(sk => `
                        <span class="px-2 py-0.5 rounded bg-surface-container-low text-[10px] font-semibold text-on-surface-variant">${sk}</span>
                      `).join('')}
                    </div>
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
