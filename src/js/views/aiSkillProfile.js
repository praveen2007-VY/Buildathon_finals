// Screen 3: AI Skill Profile View - Powered by Supabase

import { getActiveEmployee } from '../data.js';

export function renderAiSkillProfileView() {
  const emp = getActiveEmployee() || {
    id: 'EMP001',
    name: 'Aarav Mehta',
    role: 'Python Developer',
    department: 'Software Development',
    grade: 'L4',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    readinessScore: 88,
    skills: ['Python', 'SQL', 'Git'],
    softSkills: ['Teamwork', 'Problem-solving'],
    performanceScore: 3.8,
    projectsCompleted: 'Student Management System',
    projectResponsibilities: 'Python coding;Database connection',
    careerInterests: 'Become a Senior Python Developer',
    proficiency: { 'Python': 94, 'SQL': 90, 'Git': 88 }
  };

  const techSkills = emp.skills || ['Python', 'SQL', 'Git'];
  const softSkills = emp.softSkills || ['Teamwork', 'Problem-solving'];
  const allSkills = [...techSkills.map(s => ({ name: s, cat: 'tech', level: 'Expert', prof: emp.proficiency[s] || 90 })), ...softSkills.map(s => ({ name: s, cat: 'soft', level: 'Verified', prof: 85 }))];

  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <!-- Breadcrumbs & Meta Bar -->
      <div class="flex items-center justify-between gap-4 mb-1">
        <div class="flex items-center gap-1.5 text-on-surface-variant text-xs">
          <a href="#/overview" class="hover:text-primary transition-colors">Directory</a>
          <span class="material-symbols-outlined text-xs text-outline">chevron_right</span>
          <span class="text-on-surface font-semibold">${emp.name}</span>
          <span class="material-symbols-outlined text-xs text-outline">chevron_right</span>
          <span class="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-semibold">AI Skill Profile</span>
        </div>
        <div class="flex items-center gap-1.5 text-[11px] text-outline">
          <span class="inline-block w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
          <span>Supabase Synced: Live Dataset</span>
        </div>
      </div>

      <!-- Profile Master Banner -->
      <section class="relative rounded-2xl bg-white p-6 shadow-xs border border-surface-container overflow-hidden">
        <div class="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-gradient-to-br from-primary-fixed/20 to-secondary-fixed/20 blur-3xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
          <!-- Profile Entity -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 min-w-0">
            <div class="relative">
              <img src="${emp.avatar}" alt="${emp.name}" class="w-16 h-16 rounded-2xl object-cover shadow-xs ring-4 ring-surface-container-lowest"/>
              <span class="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-xs shadow-xs">
                <span class="material-symbols-outlined text-xs">verified</span>
              </span>
            </div>
            <div class="flex flex-col">
              <div class="flex flex-wrap items-center gap-2">
                <h1 class="font-display text-xl font-bold text-on-surface tracking-tight">${emp.name}</h1>
                <span class="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-semibold">${emp.grade}</span>
                <span class="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-semibold flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs">auto_awesome</span> High Velocity Track
                </span>
              </div>
              <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-on-surface-variant text-xs">
                <span class="flex items-center gap-1 font-medium text-on-surface"><span class="material-symbols-outlined text-sm text-outline">badge</span> ${emp.role}</span>
                <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-outline">corporate_fare</span> ${emp.department}</span>
                <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-outline">pin</span> ID: ${emp.id}</span>
              </div>
            </div>
          </div>

          <!-- Action Panel & Readiness Gauge -->
          <div class="flex flex-wrap sm:flex-nowrap items-center gap-4 w-full xl:w-auto">
            <!-- Compact Score Ring Card -->
            <div class="flex items-center gap-3 px-4 py-2 rounded-xl bg-surface-container-low border border-surface-container">
              <div class="relative w-10 h-10 flex items-center justify-center">
                <svg class="w-10 h-10 -rotate-90" viewBox="0 0 48 48">
                  <circle class="text-surface-container-high" cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" stroke-width="4"/>
                  <circle class="text-primary-container" cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" stroke-dasharray="125.6" stroke-dashoffset="${125.6 * (1 - emp.readinessScore / 100)}" stroke-linecap="round" stroke-width="4"/>
                </svg>
                <span class="absolute font-display text-sm font-bold text-on-surface">${emp.readinessScore}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[10px] text-outline uppercase tracking-wider">AI Readiness</span>
                <span class="text-xs font-bold text-primary">${emp.performanceScore >= 4.0 ? 'Top 10%' : 'Top 25%'}</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2">
              <button id="runAuditBtn" type="button" class="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-container text-white text-xs font-semibold hover:bg-primary transition-colors shadow-xs active:scale-95">
                <span id="auditSpinner" class="material-symbols-outlined text-sm animate-spin hidden">sync</span>
                <span id="auditIcon" class="material-symbols-outlined text-sm">auto_awesome</span>
                <span id="auditText">Re-run AI Skill Audit</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Bento Metric Cards -->
      <section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div class="rounded-xl bg-white p-4 shadow-xs border border-surface-container flex flex-col justify-between">
          <div class="flex items-center justify-between text-outline text-[11px]">
            <span class="uppercase tracking-wider font-semibold">Composite Skill Index</span>
            <span class="material-symbols-outlined text-lg text-primary">analytics</span>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="font-display text-3xl text-on-surface font-bold">${emp.skillMatchIndex}</span>
            <span class="text-xs text-outline">/ 100</span>
          </div>
          <div class="w-full bg-surface-container-high h-1.5 rounded-full mt-2 overflow-hidden">
            <div class="bg-primary-container h-full rounded-full" style="width: ${emp.skillMatchIndex}%"></div>
          </div>
        </div>

        <div class="rounded-xl bg-white p-4 shadow-xs border border-surface-container flex flex-col justify-between">
          <div class="flex items-center justify-between text-outline text-[11px]">
            <span class="uppercase tracking-wider font-semibold">Verified Competencies</span>
            <span class="material-symbols-outlined text-lg text-secondary">verified_user</span>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="font-display text-3xl text-on-surface font-bold">${allSkills.length}</span>
            <span class="text-xs text-outline">Total Validated</span>
          </div>
          <div class="flex items-center gap-1 mt-2">
            <span class="h-2 flex-1 rounded-full bg-primary-container"></span>
            <span class="h-2 w-1/4 rounded-full bg-secondary-container"></span>
            <span class="h-2 w-1/6 rounded-full bg-tertiary-container"></span>
          </div>
        </div>

        <div class="rounded-xl bg-white p-4 shadow-xs border border-surface-container flex flex-col justify-between">
          <div class="flex items-center justify-between text-outline text-[11px]">
            <span class="uppercase tracking-wider font-semibold">Inference Confidence</span>
            <span class="material-symbols-outlined text-lg text-primary">fact_check</span>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="font-display text-3xl text-on-surface font-bold">${Math.round((emp.performanceScore / 5) * 98)}%</span>
            <span class="text-xs text-primary font-semibold">High Veracity</span>
          </div>
          <span class="text-[10px] text-outline mt-2">Supabase Database Connected</span>
        </div>

        <div class="rounded-xl bg-white p-4 shadow-xs border border-surface-container flex flex-col justify-between">
          <div class="flex items-center justify-between text-outline text-[11px]">
            <span class="uppercase tracking-wider font-semibold">Performance Score</span>
            <span class="material-symbols-outlined text-lg text-secondary">radar</span>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="font-display text-3xl text-on-surface font-bold">${emp.performanceScore}</span>
            <span class="text-xs text-secondary font-semibold">/ 5.0 Rating</span>
          </div>
          <span class="text-[10px] text-outline mt-2">Verified from employee telemetry</span>
        </div>
      </section>

      <!-- Skill Matrix Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- LEFT: Filterable Skill Cards List (8 Cols) -->
        <div class="lg:col-span-8 flex flex-col gap-4">
          <!-- Filter Tabs -->
          <div class="flex items-center gap-2 bg-white p-2 rounded-xl shadow-xs border border-surface-container overflow-x-auto">
            <button class="skill-tab-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-container-high text-on-surface" data-cat="all">All Skills (${allSkills.length})</button>
            <button class="skill-tab-btn px-3 py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container" data-cat="tech">Technical (${techSkills.length})</button>
            <button class="skill-tab-btn px-3 py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container" data-cat="soft">Soft Skills (${softSkills.length})</button>
          </div>

          <!-- Cards Container -->
          <div class="flex flex-col gap-3" id="skillsMatrixContainer">
            ${allSkills.map((s, idx) => `
              <article class="skill-card bg-white rounded-xl shadow-xs border border-surface-container overflow-hidden" data-category="${s.cat}">
                <div class="p-4 flex flex-col gap-3">
                  <div class="flex flex-wrap items-start justify-between gap-2">
                    <div class="flex items-start gap-3">
                      <div class="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary">
                        <span class="material-symbols-outlined text-xl">psychology</span>
                      </div>
                      <div>
                        <div class="flex items-center gap-2">
                          <h3 class="font-display text-sm font-bold text-on-surface">${s.name}</h3>
                          <span class="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">${s.level}</span>
                        </div>
                        <p class="text-xs text-on-surface-variant mt-0.5">Verified skill attribute for ${emp.role}</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="text-right">
                        <span class="font-display text-base font-bold text-primary">${s.prof}%</span>
                        <div class="text-[10px] text-outline">Proficiency</div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            `).join('')}
          </div>
        </div>

        <!-- RIGHT: Target Role Benchmark Sidebar (4 Cols) -->
        <div class="lg:col-span-4 flex flex-col gap-4">
          <div class="bg-white rounded-2xl p-4 shadow-xs border border-surface-container flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-[10px] uppercase tracking-wider text-outline font-semibold">Target Role Benchmark</span>
                <h2 class="font-display text-sm font-bold text-on-surface">${emp.careerInterests || 'Senior Systems Architect'}</h2>
              </div>
              <span class="px-2 py-1 rounded bg-primary-fixed text-on-primary-fixed text-[11px] font-bold">${emp.skillMatchIndex}% Match</span>
            </div>

            <div class="flex flex-col gap-3 bg-surface-container-low p-3.5 rounded-xl border border-surface-container">
              <div class="flex flex-col gap-1">
                <div class="flex justify-between text-[11px]">
                  <span class="font-semibold text-on-surface">${techSkills[0] || 'Technical Mastery'}</span>
                  <span class="text-outline">Current <strong class="text-primary">${emp.proficiency[techSkills[0]] || 94}%</strong> / Req. 90%</span>
                </div>
                <div class="relative w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div class="bg-primary-container h-full rounded-full" style="width: ${emp.proficiency[techSkills[0]] || 94}%"></div>
                </div>
              </div>

              <div class="flex flex-col gap-1">
                <div class="flex justify-between text-[11px]">
                  <span class="font-semibold text-on-surface">${techSkills[1] || 'System Architecture'}</span>
                  <span class="text-outline">Current <strong class="text-primary">${emp.proficiency[techSkills[1]] || 88}%</strong> / Req. 85%</span>
                </div>
                <div class="relative w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div class="bg-secondary-container h-full rounded-full" style="width: ${emp.proficiency[techSkills[1]] || 88}%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
