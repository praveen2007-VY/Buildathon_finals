// HR Module: Add Job Post & Multi-Employee AI Skill Gap Analysis View (with n8n Integration)

import { store, addJobRole, analyzeAndAssignEmployees, triggerN8nWebhook } from '../../data.js';

export function renderHrAnalyzeView(lastResults = null) {
  const employees = store.employees || [];
  const jobRoles = store.jobRoles || [];

  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="font-display text-2xl font-bold text-on-surface">HR Job Post Creation & Multi-Employee AI Analysis</h1>
          <p class="text-xs text-on-surface-variant">Create job requisitions, select personnel, run AI gap analysis, assign missing skills & send feedback.</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">database</span> ${employees.length} Personnel Connected
          </span>
        </div>
      </div>

      <!-- Main Layout Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- LEFT COLUMN: 1. Create Job Post Form & Requisition Selector (5 Cols) -->
        <div class="lg:col-span-5 flex flex-col gap-6">
          
          <!-- Create Job Post Form -->
          <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
            <div class="flex items-center justify-between border-b border-surface-container pb-3">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-xl">post_add</span>
                <h2 class="font-display text-base font-bold text-on-surface">Create New Job Post</h2>
              </div>
              <span class="text-[10px] uppercase font-bold text-outline">Requisition Engine</span>
            </div>

            <form id="hrAddRoleForm" class="flex flex-col gap-3">
              <div>
                <label class="text-[11px] font-semibold text-outline uppercase tracking-wider block mb-1">Job Role Title</label>
                <input 
                  type="text" 
                  id="roleTitleInput" 
                  required 
                  placeholder="e.g. Lead AI Systems Architect" 
                  class="w-full h-9 px-3 rounded-lg bg-surface-container-low text-xs text-on-surface focus:outline-none border border-transparent focus:border-primary"
                />
              </div>

              <div>
                <label class="text-[11px] font-semibold text-outline uppercase tracking-wider block mb-1">Department</label>
                <input 
                  type="text" 
                  id="roleDeptInput" 
                  required 
                  placeholder="e.g. Enterprise AI Platforms" 
                  class="w-full h-9 px-3 rounded-lg bg-surface-container-low text-xs text-on-surface focus:outline-none border border-transparent focus:border-primary"
                />
              </div>

              <div>
                <label class="text-[11px] font-semibold text-outline uppercase tracking-wider block mb-1">Required Skills (Comma-separated)</label>
                <input 
                  type="text" 
                  id="roleSkillsInput" 
                  required 
                  placeholder="e.g. Python, RAG Architecture, Kubernetes, Distributed Systems, SOC2 Compliance" 
                  class="w-full h-9 px-3 rounded-lg bg-surface-container-low text-xs text-on-surface focus:outline-none border border-transparent focus:border-primary"
                />
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="text-[11px] font-semibold text-outline uppercase tracking-wider block mb-1">Band Level</label>
                  <input type="text" id="roleBandInput" value="L6 (Staff)" class="w-full h-9 px-3 rounded-lg bg-surface-container-low text-xs text-on-surface focus:outline-none"/>
                </div>
                <div>
                  <label class="text-[11px] font-semibold text-outline uppercase tracking-wider block mb-1">Comp Range</label>
                  <input type="text" id="roleCompInput" value="$185k - $225k" class="w-full h-9 px-3 rounded-lg bg-surface-container-low text-xs text-on-surface focus:outline-none"/>
                </div>
              </div>

              <button type="submit" class="mt-2 w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5">
                <span class="material-symbols-outlined text-base">save</span>
                <span>Publish Job Post to Database</span>
              </button>
            </form>
          </div>

          <!-- Select Active Job Post for Analysis -->
          <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
            <div class="flex items-center gap-2 border-b border-surface-container pb-3">
              <span class="material-symbols-outlined text-secondary text-xl">work</span>
              <h2 class="font-display text-base font-bold text-on-surface">Target Job Post Selection</h2>
            </div>

            <div>
              <label class="text-[11px] font-semibold text-outline uppercase tracking-wider block mb-1">Select Target Job Post to Compare</label>
              <select id="selectRoleAnalysis" class="w-full h-11 px-3 rounded-xl bg-surface-container-low text-xs text-on-surface font-semibold focus:outline-none border border-surface-container">
                ${jobRoles.map(r => `<option value="${r.id}">${r.title} — ${r.department} (${r.band})</option>`).join('')}
              </select>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: 2. Database Employee Selector & AI Analysis Results (7 Cols) -->
        <div class="lg:col-span-7 flex flex-col gap-6">
          
          <!-- Employee Directory Checklist Panel -->
          <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
            <div class="flex items-center justify-between border-b border-surface-container pb-3">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary text-xl">groups</span>
                <h2 class="font-display text-base font-bold text-on-surface">Database Personnel (${employees.length})</h2>
              </div>
              
              <!-- Select All Toggle -->
              <button 
                type="button" 
                id="selectAllEmpsBtn" 
                class="px-3 py-1 rounded-lg bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-container-highest transition-colors flex items-center gap-1"
              >
                <span class="material-symbols-outlined text-sm">done_all</span>
                <span>Select All Employees</span>
              </button>
            </div>

            <!-- Employee List Checkboxes -->
            <div class="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-1" id="empChecklistContainer">
              ${employees.map(emp => `
                <label class="flex items-center justify-between p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer border border-transparent hover:border-surface-container">
                  <div class="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      class="emp-select-checkbox w-4 h-4 rounded text-primary border-surface-container-high focus:ring-primary" 
                      value="${emp.id}" 
                      checked
                    />
                    <img 
                      src="${emp.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}" 
                      class="w-9 h-9 rounded-xl object-cover border border-white shadow-xs"
                    />
                    <div class="flex flex-col">
                      <span class="text-xs font-bold text-on-surface">${emp.name}</span>
                      <span class="text-[10px] text-outline">${emp.role} • ${emp.department}</span>
                    </div>
                  </div>

                  <div class="hidden sm:flex flex-wrap gap-1 max-w-[200px] justify-end">
                    ${(emp.skills || []).slice(0, 2).map(sk => `
                      <span class="px-2 py-0.5 rounded bg-white text-[10px] font-semibold text-on-surface-variant shadow-xs">${sk}</span>
                    `).join('')}
                  </div>
                </label>
              `).join('')}
            </div>

            <!-- Run Multi-Employee Analysis Button -->
            <button 
              id="runAnalysisBtn" 
              class="mt-2 w-full py-3.5 rounded-xl bg-secondary text-white text-xs font-bold shadow-md hover:bg-secondary/90 transition-all flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined text-base">auto_awesome</span>
              <span>Analyze Selected Employees, Assign Skill Gaps & Dispatch Feedback</span>
            </button>
          </div>

          <!-- Analysis Results Output Area -->
          <div class="flex flex-col gap-6" id="analysisResultContainer">
            ${lastResults ? renderMultiAnalysisResultCards(lastResults) : `
              <div class="bg-white p-8 rounded-2xl shadow-xs border border-surface-container flex flex-col items-center justify-center text-center gap-3 min-h-[300px]">
                <span class="material-symbols-outlined text-4xl text-outline">analytics</span>
                <span class="font-display text-base font-bold text-on-surface">Select Personnel & Click "Analyze Selected Employees"</span>
                <p class="text-xs text-outline max-w-sm">
                  The AI engine will compute skill match percentages, identify missing skills, assign those specific reskilling paths to each employee's profile, and send automated feedback.
                </p>
              </div>
            `}
          </div>

        </div>
      </div>
    </div>
  `;
}

// Function to render multi-employee AI analysis results
export function renderMultiAnalysisResultCards(results = []) {
  if (!results || results.length === 0) return '';

  return `
    <div class="flex flex-col gap-6 animate-fade-in">
      <div class="flex items-center justify-between bg-white p-4 rounded-xl border border-surface-container shadow-xs">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-xl">fact_check</span>
          <span class="font-display text-sm font-bold text-on-surface">AI Gap Analysis & Reskilling Assignment Completed (${results.length} Personnel)</span>
        </div>
        <span class="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">Feedback Sent to All</span>
      </div>

      ${results.map(res => {
        const { employee, jobRole, matchPercentage, matchedSkills, missingSkills, feedback, n8nPayload } = res;

        return `
          <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-5">
            <!-- Employee Card Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container pb-4">
              <div class="flex items-center gap-3">
                <img 
                  src="${employee.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}" 
                  class="w-11 h-11 rounded-xl object-cover border border-surface-container"
                />
                <div class="flex flex-col">
                  <span class="text-xs font-bold text-on-surface">${employee.name} (${employee.role})</span>
                  <span class="text-[11px] text-outline">Evaluated For: <strong>${jobRole.title}</strong> (${jobRole.department})</span>
                </div>
              </div>

              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl ${matchPercentage >= 75 ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-amber-100 text-amber-900'}">
                <span class="font-display text-xl font-bold">${matchPercentage}%</span>
                <span class="text-[10px] font-bold uppercase tracking-wider">Skill Match</span>
              </div>
            </div>

            <!-- Skills Comparison Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Matched Skills -->
              <div class="p-3.5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col gap-1.5">
                <span class="text-xs font-bold text-primary flex items-center gap-1">
                  <span class="material-symbols-outlined text-base">check_circle</span>
                  Matched Skills (${matchedSkills.length})
                </span>
                <div class="flex flex-wrap gap-1.5 mt-1">
                  ${matchedSkills.length > 0 ? matchedSkills.map(s => `
                    <span class="px-2 py-0.5 rounded bg-white text-primary text-[11px] font-semibold shadow-xs">${s}</span>
                  `).join('') : '<span class="text-[11px] text-outline">No direct matches</span>'}
                </div>
              </div>

              <!-- Missing Skills Gap (Assigned) -->
              <div class="p-3.5 rounded-xl bg-error-container/20 border border-error-container/40 flex flex-col gap-1.5">
                <span class="text-xs font-bold text-error flex items-center justify-between">
                  <span class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-base">assignment_add</span>
                    Assigned Missing Skill Gap (${missingSkills.length})
                  </span>
                  <span class="text-[9px] bg-white px-1.5 py-0.5 rounded text-error uppercase font-bold">Assigned</span>
                </span>
                <div class="flex flex-wrap gap-1.5 mt-1">
                  ${missingSkills.length > 0 ? missingSkills.map(s => `
                    <span class="px-2 py-0.5 rounded bg-white text-error text-[11px] font-semibold shadow-xs flex items-center gap-1">
                      <span>${s}</span>
                      <span class="material-symbols-outlined text-xs">add_task</span>
                    </span>
                  `).join('') : '<span class="text-[11px] text-primary font-semibold">Zero Skill Gap! Fully Qualified</span>'}
                </div>
              </div>
            </div>

            <!-- Feedback Sent Confirmation Card -->
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex items-start gap-3">
              <span class="material-symbols-outlined text-secondary text-lg mt-0.5">mark_email_read</span>
              <div class="flex flex-col text-xs flex-1">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-on-surface">Feedback Dispatched to ${employee.name}</span>
                  <span class="text-[10px] text-outline">${feedback?.date || 'Just now'}</span>
                </div>
                <p class="text-on-surface-variant text-[11px] mt-0.5 font-mono leading-relaxed">
                  "${feedback?.message}"
                </p>
              </div>
            </div>

            <!-- n8n Payload Inspector -->
            <div class="p-3.5 rounded-xl bg-[#0E201A] text-white flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[#5FDE96] text-base">webhook</span>
                  <span class="font-display text-xs font-bold text-white">n8n Workflow JSON Payload</span>
                </div>
                <button 
                  type="button" 
                  class="trigger-n8n-item-btn px-3 py-1 rounded bg-[#16A765] text-white text-[11px] font-bold hover:bg-[#16A765]/90 transition-all flex items-center gap-1"
                  data-payload='${JSON.stringify(n8nPayload)}'
                >
                  <span class="material-symbols-outlined text-xs">send</span> Trigger n8n
                </button>
              </div>
              <pre class="text-[10px] font-mono text-[#5FDE96] bg-[#07130F] p-2.5 rounded-lg overflow-x-auto border border-[#1B3B2F]">${JSON.stringify(n8nPayload, null, 2)}</pre>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}
