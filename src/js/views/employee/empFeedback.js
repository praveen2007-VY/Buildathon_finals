// Employee Module: Feedback View (Peer & Manager 360 Reviews & HR AI Feedback)

import { store } from '../../data.js';

export function renderEmpFeedbackView() {
  const currentUserId = store.auth?.user?.id;
  const currentEmp = store.employees.find(e => e.id === currentUserId) || store.employees[0];
  const receivedFeedback = currentEmp?.receivedFeedback || [];

  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <div>
        <h1 class="font-display text-2xl font-bold text-on-surface">360 Feedback & HR AI Evaluations</h1>
        <p class="text-xs text-on-surface-variant">View verified manager evaluations, peer endorsements, and HR AI Gap Analysis feedback sent to your profile.</p>
      </div>

      <!-- Feedback List -->
      <div class="flex flex-col gap-4">
        ${receivedFeedback.length > 0 ? receivedFeedback.map(fb => `
          <div class="bg-white p-5 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-3 relative overflow-hidden">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary text-xl">verified</span>
                <span class="text-xs font-bold text-on-surface">${fb.author || 'HR Intelligence OS'}</span>
                <span class="text-[10px] px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">HR Evaluation</span>
              </div>
              <span class="text-[10px] text-outline">${fb.date || 'Today'}</span>
            </div>

            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 rounded-lg bg-primary-fixed text-on-primary-fixed text-xs font-bold">${fb.matchPercentage}% Skills Overlap</span>
              <span class="text-xs font-bold text-on-surface">Target Requisition: ${fb.roleTitle}</span>
            </div>

            <p class="text-xs text-on-surface-variant leading-relaxed bg-surface-container-low p-3.5 rounded-xl border border-surface-container">
              "${fb.message}"
            </p>

            ${(fb.missingSkills || []).length > 0 ? `
              <div class="flex items-center gap-2 text-xs">
                <span class="text-outline font-semibold">Assigned Reskilling Skills:</span>
                <div class="flex flex-wrap gap-1">
                  ${fb.missingSkills.map(sk => `
                    <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">${sk}</span>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        `).join('') : ''}

        <!-- General Peer & Manager Feedback -->
        <div class="bg-white p-5 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-xl">rate_review</span>
              <span class="text-xs font-bold text-on-surface">Elena Rostova (VP Product Engineering)</span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-surface-container text-outline font-medium">Quarterly Review</span>
            </div>
            <span class="px-2.5 py-1 rounded bg-primary-fixed text-on-primary-fixed text-xs font-bold">5.0 ★</span>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed">
            "Alex demonstrated exceptional technical leadership in architecting our RAG telemetry framework. High potential for staff-level transition."
          </p>
          <span class="text-[10px] text-outline text-right">Q3 2026 Evaluation</span>
        </div>

        <div class="bg-white p-5 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-xl">thumb_up</span>
              <span class="text-xs font-bold text-on-surface">Marcus Chen (Staff Engineer)</span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-surface-container text-outline font-medium">Peer Endorsement</span>
            </div>
            <span class="px-2.5 py-1 rounded bg-primary-fixed text-on-primary-fixed text-xs font-bold">5.0 ★</span>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed">
            "Alex is an incredible cross-functional mentor. Deep expertise in SQL data pipelines and Python ML models."
          </p>
          <span class="text-[10px] text-outline text-right">Endorsed for Distributed Systems</span>
        </div>
      </div>
    </div>
  `;
}
