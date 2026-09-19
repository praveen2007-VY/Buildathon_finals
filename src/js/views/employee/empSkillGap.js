// Employee Module: Skill Gap View - Powered by Supabase

import { getActiveEmployee } from '../../data.js';

export function renderEmpSkillGapView() {
  const currentEmp = getActiveEmployee() || {
    id: 'EMP001',
    name: 'Aarav Mehta',
    role: 'Python Developer',
    department: 'Software Development',
    careerInterests: 'Become a Senior Python Developer',
    skillMatchIndex: 94,
    skills: ['Python', 'SQL', 'Git'],
    assignedSkills: ['Cloud Security', 'Distributed Systems'],
    assignedDevelopmentPlans: []
  };

  const targetTitle = currentEmp.careerInterests || 'Senior Systems Architect';
  const matchedSkills = currentEmp.skills || ['Python', 'SQL', 'Git'];
  const assignedSkills = currentEmp.assignedSkills && currentEmp.assignedSkills.length > 0
    ? currentEmp.assignedSkills
    : ['Cloud Security', 'Distributed Systems'];

  const devPlans = (currentEmp.assignedDevelopmentPlans && currentEmp.assignedDevelopmentPlans.length > 0)
    ? currentEmp.assignedDevelopmentPlans
    : assignedSkills.map(sk => ({
        id: 'PLAN-' + Math.floor(1000 + Math.random() * 9000),
        targetRole: targetTitle,
        skill: sk,
        courseName: `Accelerated ${sk} Enterprise Certification`,
        provider: 'Enterprise AI Academy & DeepLearning.AI',
        assignedBy: 'HR Intelligence OS',
        assignedDate: new Date().toLocaleDateString(),
        status: 'Assigned'
      }));

  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="font-display text-2xl font-bold text-on-surface">Skill Gap & Remediation Analysis</h1>
          <p class="text-xs text-on-surface-variant">Capability shortfall analysis for ${currentEmp.name} targeting <strong>${targetTitle}</strong>.</p>
        </div>
        <a href="#/employee/feedback" class="px-4 py-2 rounded-lg bg-secondary text-white text-xs font-semibold hover:bg-secondary/90 transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto">
          <span class="material-symbols-outlined text-base">rate_review</span>
          <span>View HR Feedback</span>
        </a>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-6">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-surface-container pb-4">
          <div class="flex flex-col">
            <span class="text-[10px] uppercase font-bold text-outline tracking-wider">Target Benchmark Role</span>
            <h2 class="font-display text-lg font-bold text-on-surface">${targetTitle}</h2>
            <span class="text-xs text-on-surface-variant">${currentEmp.role} • ${currentEmp.department}</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="px-3.5 py-1.5 rounded-xl bg-primary-fixed text-on-primary-fixed text-xs font-bold flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">auto_awesome</span>
              ${currentEmp.skillMatchIndex || 94}% Overall Skill Overlap
            </div>
          </div>
        </div>

        <!-- Matched vs Assigned Missing Skills -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Verified Competencies -->
          <div class="p-4 rounded-xl bg-primary/5 border border-primary/20 flex flex-col gap-2">
            <span class="text-xs font-bold text-primary flex items-center gap-1.5">
              <span class="material-symbols-outlined text-base">check_circle</span>
              Verified Matched Capabilities (${matchedSkills.length})
            </span>
            <div class="flex flex-wrap gap-1.5 mt-1">
              ${matchedSkills.map(sk => `
                <span class="px-2.5 py-1 rounded-lg bg-white text-primary text-xs font-bold shadow-xs">${sk}</span>
              `).join('')}
            </div>
          </div>

          <!-- HR Assigned Skill Shortfalls -->
          <div class="p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col gap-2">
            <span class="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-base">assignment_add</span>
              Assigned Skill Gaps (${assignedSkills.length})
            </span>
            <div class="flex flex-wrap gap-1.5 mt-1">
              ${assignedSkills.map(sk => `
                <span class="px-2.5 py-1 rounded-lg bg-white text-amber-900 text-xs font-bold shadow-xs flex items-center gap-1">
                  <span>${sk}</span>
                  <span class="material-symbols-outlined text-xs">school</span>
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Assigned Development Plans List -->
        <div class="flex flex-col gap-3 pt-2">
          <h3 class="font-display text-sm font-bold text-on-surface">Assigned Reskilling Courses & Development Plans</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${devPlans.map(plan => `
              <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col justify-between gap-3">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex flex-col">
                    <span class="text-[10px] uppercase font-bold text-outline">${plan.provider}</span>
                    <h4 class="text-xs font-bold text-on-surface mt-0.5">${plan.courseName}</h4>
                  </div>
                  <span class="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">${plan.status}</span>
                </div>
                <div class="flex items-center justify-between text-[11px] text-outline">
                  <span>Target Skill: <strong class="text-on-surface">${plan.skill}</strong></span>
                  <span>Assigned By: ${plan.assignedBy}</span>
                </div>
                <a href="#/employee/learning" class="mt-1 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold self-start shadow-xs flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">play_arrow</span> Start Learning Module
                </a>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}
