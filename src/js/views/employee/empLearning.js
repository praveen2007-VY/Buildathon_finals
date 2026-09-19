// Employee Module: Learning View (Courses, Certifications, Projects, Assigned HR Reskilling)

import { store } from '../../data.js';

export function renderEmpLearningView() {
  const currentUserId = store.auth?.user?.id;
  const currentEmp = store.employees.find(e => e.id === currentUserId) || store.employees[0];
  const assignedPlans = currentEmp?.assignedDevelopmentPlans || [];

  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <div>
        <h1 class="font-display text-2xl font-bold text-on-surface">Learning & Skill Acceleration</h1>
        <p class="text-xs text-on-surface-variant">Your personalized reskilling track, HR-assigned missing skills, and course certifications.</p>
      </div>

      <!-- Assigned Reskilling Section from HR -->
      ${assignedPlans.length > 0 ? `
        <div class="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-xl">assignment_turned_in</span>
              <h2 class="font-display text-base font-bold text-primary">HR Assigned Reskilling Tracks (${assignedPlans.length})</h2>
            </div>
            <span class="px-2.5 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold">Action Required</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${assignedPlans.map(plan => `
              <div class="bg-white p-4 rounded-xl shadow-xs border border-surface-container flex flex-col justify-between gap-3">
                <div class="flex flex-col gap-1">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] uppercase font-bold text-outline">Target Role: ${plan.targetRole}</span>
                    <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">Gap Skill: ${plan.skill}</span>
                  </div>
                  <h3 class="font-display text-sm font-bold text-on-surface mt-1">${plan.courseName}</h3>
                  <span class="text-[10px] text-outline">Provider: ${plan.provider} • Assigned by ${plan.assignedBy} (${plan.assignedDate})</span>
                </div>

                <div class="flex items-center justify-between pt-2 border-t border-surface-container">
                  <span class="text-[11px] font-semibold text-primary">Status: ${plan.status}</span>
                  <button class="px-3 py-1 rounded-lg bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary/90 transition-all">
                    Start Reskilling Module
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- General Course Catalog -->
      <div class="flex flex-col gap-3">
        <h2 class="font-display text-base font-bold text-on-surface">Recommended Course Catalog</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white p-5 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between gap-4">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[10px] font-semibold">DeepLearning.AI</span>
                <span class="text-[10px] font-bold text-primary">Certification</span>
              </div>
              <h3 class="font-display text-sm font-bold text-on-surface leading-snug">Advanced RAG & Vector Search Systems</h3>
              <span class="text-[11px] text-outline mt-1 block">Duration: 16 hrs cohort</span>
            </div>

            <div class="flex flex-col gap-1.5 pt-2 border-t border-surface-container">
              <div class="flex justify-between text-xs font-semibold text-on-surface">
                <span>Progress</span>
                <span>65%</span>
              </div>
              <div class="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div class="bg-primary h-full rounded-full" style="width: 65%"></div>
              </div>
            </div>
          </div>

          <div class="bg-white p-5 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between gap-4">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[10px] font-semibold">Cloud Native Foundation</span>
                <span class="text-[10px] font-bold text-secondary">Expert Level</span>
              </div>
              <h3 class="font-display text-sm font-bold text-on-surface leading-snug">Kubernetes & Distributed System Security</h3>
              <span class="text-[11px] text-outline mt-1 block">Duration: 24 hrs cohort</span>
            </div>

            <div class="flex flex-col gap-1.5 pt-2 border-t border-surface-container">
              <div class="flex justify-between text-xs font-semibold text-on-surface">
                <span>Progress</span>
                <span>40%</span>
              </div>
              <div class="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div class="bg-secondary h-full rounded-full" style="width: 40%"></div>
              </div>
            </div>
          </div>

          <div class="bg-white p-5 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between gap-4">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[10px] font-semibold">Stanford Online</span>
                <span class="text-[10px] font-bold text-primary">Specialization</span>
              </div>
              <h3 class="font-display text-sm font-bold text-on-surface leading-snug">Enterprise LLM Prompting & Fine-Tuning</h3>
              <span class="text-[11px] text-outline mt-1 block">Duration: 12 hrs cohort</span>
            </div>

            <div class="flex flex-col gap-1.5 pt-2 border-t border-surface-container">
              <div class="flex justify-between text-xs font-semibold text-on-surface">
                <span>Progress</span>
                <span>85%</span>
              </div>
              <div class="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div class="bg-primary h-full rounded-full" style="width: 85%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
