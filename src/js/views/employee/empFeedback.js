// Employee Module: Feedback View (360 Reviews & HR AI Skill Gap Evaluations) - Powered by Supabase

import { getActiveEmployee } from '../../data.js';

export function renderEmpFeedbackView() {
  const currentEmp = getActiveEmployee() || {
    id: 'EMP001',
    name: 'Aarav Mehta',
    role: 'Python Developer',
    department: 'Software Development',
    careerInterests: 'Become a Senior Python Developer',
    skillMatchIndex: 94,
    skills: ['Python', 'SQL', 'Git'],
    performanceScore: 3.8,
    receivedFeedback: []
  };

  // If no feedback generated yet, create initial live evaluation from HR
  const feedbackList = (currentEmp.receivedFeedback && currentEmp.receivedFeedback.length > 0)
    ? currentEmp.receivedFeedback
    : [
        {
          id: 'FB-INIT',
          roleTitle: currentEmp.careerInterests || 'Senior Systems Architect',
          author: 'HR Intelligence OS',
          date: new Date().toLocaleDateString(),
          matchPercentage: currentEmp.skillMatchIndex || 94,
          matchedSkills: currentEmp.skills || ['Python', 'SQL', 'Git'],
          missingSkills: ['Cloud Security', 'Distributed Systems'],
          message: `Evaluation for ${currentEmp.careerInterests || 'Senior Role'}: You have a ${currentEmp.skillMatchIndex || 94}% skills match based on your performance score (${currentEmp.performanceScore}/5.0). Identified growth skills have been dispatched to your profile.`
        }
      ];

  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <h1 class="font-display text-2xl font-bold text-on-surface">360 Feedback & HR AI Skill Gap Evaluations</h1>
            <span class="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
              ${feedbackList.length} Evaluations Received
            </span>
          </div>
          <p class="text-xs text-on-surface-variant">View verified manager evaluations, peer endorsements, and HR AI Skill Gap feedback sent directly to your employee profile for ${currentEmp.name}.</p>
        </div>

        <a href="#/employee/skill-gap" class="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto">
          <span class="material-symbols-outlined text-base">donut_large</span>
          <span>View Skill Gap Plan</span>
        </a>
      </div>

      <!-- Feedback List -->
      <div class="flex flex-col gap-4">
        ${feedbackList.map(fb => `
          <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none"></div>

            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-surface-container pb-3">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary text-xl">verified</span>
                <span class="text-xs font-bold text-on-surface">${fb.author || 'HR Intelligence OS'}</span>
                <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                  HR AI Skill Gap Evaluation
                </span>
              </div>
              <span class="text-[11px] text-outline">${fb.date || 'Today'}</span>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <span class="px-3 py-1 rounded-xl bg-primary-fixed text-on-primary-fixed text-xs font-bold flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">auto_awesome</span>
                ${fb.matchPercentage}% Skill Match
              </span>
              <span class="text-xs font-bold text-on-surface">Target Requisition: ${fb.roleTitle}</span>
            </div>

            <p class="text-xs text-on-surface-variant leading-relaxed bg-surface-container-low p-4 rounded-xl border border-surface-container">
              "${fb.message}"
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <!-- Matched Skills -->
              <div class="p-3 rounded-xl bg-primary/5 border border-primary/20 flex flex-col gap-1">
                <span class="text-[11px] font-bold text-primary flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs">check_circle</span>
                  Verified Matched Skills (${(fb.matchedSkills || []).length})
                </span>
                <div class="flex flex-wrap gap-1 mt-1">
                  ${(fb.matchedSkills || []).map(sk => `
                    <span class="px-2 py-0.5 rounded bg-white text-primary text-[10px] font-bold shadow-xs">${sk}</span>
                  `).join('')}
                </div>
              </div>

              <!-- Assigned Missing Skills -->
              <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 flex flex-col gap-1">
                <span class="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs">add_task</span>
                  Assigned Reskilling Skills (${(fb.missingSkills || []).length})
                </span>
                <div class="flex flex-wrap gap-1 mt-1">
                  ${(fb.missingSkills && fb.missingSkills.length > 0) ? fb.missingSkills.map(sk => `
                    <span class="px-2 py-0.5 rounded bg-white text-amber-900 text-[10px] font-bold shadow-xs">${sk}</span>
                  `).join('') : '<span class="text-[10px] text-primary font-semibold">Zero Skill Shortfall!</span>'}
                </div>
              </div>
            </div>
          </div>
        `).join('')}

        <!-- Peer & Manager 360 Reviews -->
        <div class="bg-white p-5 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-xl">rate_review</span>
              <span class="text-xs font-bold text-on-surface">Department Engineering Lead (${currentEmp.department})</span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-surface-container text-outline font-medium">Quarterly Evaluation</span>
            </div>
            <span class="px-2.5 py-1 rounded bg-primary-fixed text-on-primary-fixed text-xs font-bold">${currentEmp.performanceScore || '4.3'} ★</span>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed">
            "${currentEmp.name} demonstrates exceptional technical commitment and problem-solving skills in ${currentEmp.department}. Consistently delivers project milestones on schedule."
          </p>
          <span class="text-[10px] text-outline text-right">Q3 Evaluation • Verified Record</span>
        </div>
      </div>
    </div>
  `;
}
