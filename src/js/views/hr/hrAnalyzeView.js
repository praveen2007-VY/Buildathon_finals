// HR Module: Add Job Post & Multi-Employee AI Skill Gap Analysis View (with Supabase & n8n Integration)
import { store } from '../../data.js';
import { getCachedRawEmployees } from '../../../services/hrAnalysisService.js';

// Predefined set of professional avatars for consistent display
const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80'
];

export function renderHrAnalyzeView(lastResults = null, employeesList = null) {
  // Use real Supabase raw employees first, fallback to cached or store
  const cached = getCachedRawEmployees();
  const rawList = employeesList || (cached && cached.length > 0 ? cached : store.rawEmployees);
  const employees = rawList && rawList.length > 0 ? rawList : (store.employees || []);
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
          <span class="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold flex items-center gap-1" id="personnelConnectedBadge">
            <span class="material-symbols-outlined text-sm">database</span> 
            <span>${employees.length} Personnel Connected</span>
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
                <h2 class="font-display text-base font-bold text-on-surface" id="databasePersonnelTitle">Database Personnel (${employees.length})</h2>
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
            <div class="flex flex-col gap-2 max-h-[380px] overflow-y-auto pr-1" id="empChecklistContainer">
              ${renderEmployeeChecklistItems(employees)}
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
            ${lastResults ? (lastResults.report ? renderN8nAnalysisReport(lastResults.report, lastResults.job) : renderMultiAnalysisResultCards(lastResults)) : `
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

/**
 * Helper to render employee checklist items with complete metadata from Supabase
 */
export function renderEmployeeChecklistItems(employees = []) {
  if (!employees || employees.length === 0) {
    return `
      <div class="p-6 text-center text-xs text-outline bg-surface-container-low rounded-xl">
        Loading personnel from Supabase...
      </div>
    `;
  }

  return employees.map((emp, index) => {
    const empId = emp.Employee_ID || emp.id || `EMP00${index + 1}`;
    const name = emp.Name || emp.name || 'Personnel';
    const role = emp.Current_Role || emp.role || 'Software Engineer';
    const dept = emp.Department || emp.department || 'Engineering';
    const avatar = emp.avatar || AVATARS[index % AVATARS.length];
    
    // Parse technical skills from string (separated by ;) or array
    let skills = [];
    if (typeof emp.Technical_Skills === 'string') {
      skills = emp.Technical_Skills.split(';').map(s => s.trim()).filter(Boolean);
    } else if (Array.isArray(emp.skills)) {
      skills = emp.skills;
    }

    return `
      <label class="flex items-center justify-between p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer border border-transparent hover:border-surface-container">
        <div class="flex items-center gap-3">
          <input 
            type="checkbox" 
            class="emp-select-checkbox w-4 h-4 rounded text-primary border-surface-container-high focus:ring-primary" 
            value="${empId}" 
            checked
          />
          <img 
            src="${avatar}" 
            class="w-9 h-9 rounded-xl object-cover border border-white shadow-xs"
            alt="${name}"
          />
          <div class="flex flex-col">
            <div class="flex items-center gap-1.5">
              <span class="text-xs font-bold text-on-surface">${name}</span>
              <span class="text-[10px] px-1.5 py-0.2 rounded bg-surface-container text-outline font-mono">${empId}</span>
            </div>
            <span class="text-[10px] text-outline">${role} • ${dept}</span>
          </div>
        </div>

        <div class="hidden sm:flex flex-wrap gap-1 max-w-[200px] justify-end">
          ${skills.slice(0, 2).map(sk => `
            <span class="px-2 py-0.5 rounded bg-white text-[10px] font-semibold text-on-surface-variant shadow-xs">${sk}</span>
          `).join('')}
        </div>
      </label>
    `;
  }).join('');
}

/**
 * Convert markdown text (headers, bold, lists, steps) into beautiful styled HTML
 */
export function formatMarkdownToHtml(markdownText) {
  if (!markdownText) return '';

  let html = markdownText
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Headings
  html = html.replace(/^### (.*$)/gim, '<h4 class="font-display text-sm font-bold text-on-surface mt-4 mb-2 flex items-center gap-1.5 text-primary">$1</h4>');
  html = html.replace(/^## (.*$)/gim, '<h3 class="font-display text-base font-bold text-on-surface mt-5 mb-2.5 flex items-center gap-2 border-b border-surface-container pb-2">$1</h3>');
  html = html.replace(/^# (.*$)/gim, '<h2 class="font-display text-lg font-bold text-on-surface mt-1 mb-3 flex items-center gap-2 text-primary">$1</h2>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-on-surface">$1</strong>');
  html = html.replace(/__(.*?)__/gim, '<strong class="font-bold text-on-surface">$1</strong>');

  // Bullet items
  html = html.replace(/^\* (.*$)/gim, '<li class="flex items-start gap-2 text-xs text-on-surface-variant my-1"><span class="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span><span class="leading-relaxed">$1</span></li>');
  html = html.replace(/^- (.*$)/gim, '<li class="flex items-start gap-2 text-xs text-on-surface-variant my-1"><span class="material-symbols-outlined text-primary text-sm mt-0.5">arrow_right</span><span class="leading-relaxed">$1</span></li>');

  // Numbered list items
  html = html.replace(/^(\d+)\. (.*$)/gim, '<div class="p-3 my-2 rounded-xl bg-surface-container-low border border-surface-container flex items-start gap-2.5 text-xs text-on-surface"><span class="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">$1</span><div class="flex-1 leading-relaxed">$2</div></div>');

  // Spacing & newlines
  html = html.replace(/\n\n/g, '<div class="my-2.5"></div>');
  html = html.replace(/\n/g, '<br/>');

  return html;
}

/**
 * Render n8n Multi-Employee AI Analysis Report (supports both structured JSON and Markdown text reports)
 */
export function renderN8nAnalysisReport(report, jobInfo = {}) {
  if (!report) return '';

  const jobTitle = jobInfo.job_role_title || report.job_role || 'Target Role';
  const department = jobInfo.department || report.department || 'Engineering';
  const employeeCount = jobInfo.selected_employee_count || report.employee_count || report.employees?.length || 1;
  const overallSummary = report.overall_summary || report.text || 'Multi-employee AI analysis successfully executed.';
  const employees = report.employees || [];
  const finalRecs = Array.isArray(report.final_recommendations) 
    ? report.final_recommendations 
    : (report.final_recommendations ? [report.final_recommendations] : []);

  // If report is raw Markdown text or has no structured employees array
  if (report.isMarkdown || (report.text && employees.length === 0)) {
    return `
      <div class="flex flex-col gap-6 animate-fade-in" id="n8nAnalysisReportView">
        <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-5">
          <!-- Header -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-container pb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shadow-xs">
                <span class="material-symbols-outlined text-2xl">insights</span>
              </div>
              <div class="flex flex-col">
                <div class="flex items-center gap-2">
                  <h3 class="font-display text-base font-bold text-on-surface">AI Career & Talent Analysis Report</h3>
                  <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">n8n Engine</span>
                </div>
                <span class="text-xs text-outline">Target Role: <strong class="text-on-surface">${jobTitle}</strong> • ${department}</span>
              </div>
            </div>
            <span class="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold self-start sm:self-auto flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm">groups</span>
              ${employeeCount} Personnel Evaluated
            </span>
          </div>

          <!-- Formatted Markdown Report Content -->
          <div class="p-6 rounded-2xl bg-surface-container-low/60 border border-surface-container text-xs text-on-surface leading-relaxed flex flex-col">
            ${formatMarkdownToHtml(report.text || overallSummary)}
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="flex flex-col gap-6 animate-fade-in" id="n8nAnalysisReportView">
      <!-- Report Header Card -->
      <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-container pb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shadow-xs">
              <span class="material-symbols-outlined text-2xl">insights</span>
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-2">
                <h3 class="font-display text-base font-bold text-on-surface">AI Skill Gap & Multi-Employee Report</h3>
                <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">n8n Engine</span>
              </div>
              <span class="text-xs text-outline">Target Role: <strong class="text-on-surface">${jobTitle}</strong> • ${department}</span>
            </div>
          </div>
          <span class="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold self-start sm:self-auto flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm">groups</span>
            ${employeeCount} Employees Analyzed
          </span>
        </div>

        <!-- Overall AI Summary -->
        <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-base">psychology</span>
            <h4 class="font-display text-xs font-bold uppercase tracking-wider text-on-surface">Overall AI Summary</h4>
          </div>
          <p class="text-xs text-on-surface leading-relaxed">${overallSummary}</p>
        </div>
      </div>

      <!-- Analyzed Employees List -->
      <div class="flex flex-col gap-4">
        ${employees.map((emp, idx) => {
          const match = Number(emp.match_percentage ?? 0);
          const matchedSkills = Array.isArray(emp.matched_skills) ? emp.matched_skills : [];
          const skillGaps = Array.isArray(emp.skill_gaps) ? emp.skill_gaps : [];
          const recLearning = Array.isArray(emp.recommended_learning) ? emp.recommended_learning : [];
          const careerRec = emp.career_recommendation || 'Continuous skill progression recommended.';

          return `
            <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
              <!-- Header -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-container pb-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center font-bold text-xs text-on-surface border border-surface-container font-mono">
                    ${emp.Employee_ID || `EMP00${idx + 1}`}
                  </div>
                  <div class="flex flex-col">
                    <span class="text-sm font-bold text-on-surface">${emp.Name || 'Employee'}</span>
                    <span class="text-[11px] text-outline">Employee ID: <strong>${emp.Employee_ID || 'N/A'}</strong></span>
                  </div>
                </div>

                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl ${match >= 75 ? 'bg-primary-fixed text-on-primary-fixed' : (match >= 50 ? 'bg-amber-100 text-amber-900' : 'bg-rose-100 text-rose-900')}">
                  <span class="font-display text-lg font-bold">${match}%</span>
                  <span class="text-[10px] font-bold uppercase tracking-wider">Match</span>
                </div>
              </div>

              <!-- Skills Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Matched Skills -->
                <div class="p-3.5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col gap-1.5">
                  <span class="text-xs font-bold text-primary flex items-center gap-1">
                    <span class="material-symbols-outlined text-base">check_circle</span>
                    Matched Skills (${matchedSkills.length})
                  </span>
                  <div class="flex flex-wrap gap-1.5 mt-1">
                    ${matchedSkills.length > 0 ? matchedSkills.map(s => `
                      <span class="px-2.5 py-0.5 rounded-md bg-white text-primary text-[11px] font-semibold border border-primary/20 shadow-2xs">${s}</span>
                    `).join('') : '<span class="text-[11px] text-outline">No direct matches</span>'}
                  </div>
                </div>

                <!-- Skill Gaps -->
                <div class="p-3.5 rounded-xl bg-error-container/20 border border-error-container/40 flex flex-col gap-1.5">
                  <span class="text-xs font-bold text-error flex items-center gap-1">
                    <span class="material-symbols-outlined text-base">warning</span>
                    Skill Gaps (${skillGaps.length})
                  </span>
                  <div class="flex flex-wrap gap-1.5 mt-1">
                    ${skillGaps.length > 0 ? skillGaps.map(s => `
                      <span class="px-2.5 py-0.5 rounded-md bg-white text-error text-[11px] font-semibold border border-error/20 shadow-2xs">${s}</span>
                    `).join('') : '<span class="text-[11px] text-primary font-semibold">Zero skill gap! Fully qualified</span>'}
                  </div>
                </div>
              </div>

              <!-- Recommended Learning / Upskilling -->
              <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-1.5">
                <span class="text-xs font-bold text-on-surface flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-secondary text-base">school</span>
                  Recommended Learning / Upskilling
                </span>
                <div class="flex flex-wrap gap-1.5 mt-1">
                  ${recLearning.length > 0 ? recLearning.map(item => `
                    <span class="px-2.5 py-1 rounded-lg bg-white text-on-surface text-[11px] font-medium border border-surface-container shadow-2xs flex items-center gap-1">
                      <span class="material-symbols-outlined text-xs text-secondary">auto_stories</span>
                      ${item}
                    </span>
                  `).join('') : '<span class="text-[11px] text-outline">No specific learning modules required</span>'}
                </div>
              </div>

              <!-- Career Recommendation -->
              <div class="p-3.5 rounded-xl bg-secondary/5 border border-secondary/20 flex items-start gap-2.5">
                <span class="material-symbols-outlined text-secondary text-lg mt-0.5">trending_up</span>
                <div class="flex flex-col text-xs flex-1">
                  <span class="font-bold text-on-surface">Career Recommendation</span>
                  <p class="text-on-surface-variant text-[11px] mt-0.5 leading-relaxed">${careerRec}</p>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Final AI Recommendations -->
      ${finalRecs.length > 0 ? `
        <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-3">
          <div class="flex items-center gap-2 border-b border-surface-container pb-3">
            <span class="material-symbols-outlined text-primary text-xl">verified</span>
            <h4 class="font-display text-base font-bold text-on-surface">Final AI Recommendations</h4>
          </div>
          <ul class="flex flex-col gap-2">
            ${finalRecs.map(rec => `
              <li class="flex items-start gap-2.5 text-xs text-on-surface p-2.5 rounded-xl bg-surface-container-low border border-surface-container">
                <span class="material-symbols-outlined text-primary text-base mt-0.5">check</span>
                <span class="leading-relaxed flex-1">${rec}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `;
}

// Backward compatibility helper
export function renderMultiAnalysisResultCards(results = []) {
  if (!results || results.length === 0) return '';
  return `
    <div class="flex flex-col gap-6 animate-fade-in">
      <div class="flex items-center justify-between bg-white p-4 rounded-xl border border-surface-container shadow-xs">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-xl">fact_check</span>
          <span class="font-display text-sm font-bold text-on-surface">AI Gap Analysis Completed (${results.length} Personnel)</span>
        </div>
      </div>
      ${results.map(res => `
        <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
          <div class="flex items-center justify-between border-b border-surface-container pb-3">
            <span class="text-sm font-bold">${res.employee?.name || 'Employee'}</span>
            <span class="text-xs font-bold text-primary">${res.matchPercentage || 75}% Match</span>
          </div>
          <p class="text-xs text-on-surface-variant">${res.feedback?.message || 'Analysis complete'}</p>
        </div>
      `).join('')}
    </div>
  `;
}
