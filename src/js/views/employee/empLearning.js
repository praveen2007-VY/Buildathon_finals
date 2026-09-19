// Employee Module: Learning View (Enrolled Skill Gap Courses, Certifications, HR Reskilling)

import { getActiveEmployee, store, saveStore, enrollEmployeeCourse } from '../../data.js';
import { showToast } from '../../components/modals.js';

export function renderEmpLearningView() {
  const emp = getActiveEmployee() || store.employees[0];
  const enrolledCourses = emp?.enrolledCourses || [];
  const assignedPlans = emp?.assignedDevelopmentPlans || [];

  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="font-display text-2xl font-bold text-on-surface">Learning & Skill Acceleration</h1>
          <p class="text-xs text-on-surface-variant">Your active enrolled reskilling tracks, skill shortfall courses, and academy certifications.</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="px-3 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold flex items-center gap-1 shadow-xs">
            <span class="material-symbols-outlined text-sm">school</span> ${enrolledCourses.length + assignedPlans.length} Active Tracks
          </span>
        </div>
      </div>

      <!-- 1. Enrolled Skill Gap Remediation Courses (From Skill Gap Page) -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-xl">auto_stories</span>
            <h2 class="font-display text-base font-bold text-on-surface">Enrolled Skill Shortfall Courses (${enrolledCourses.length})</h2>
          </div>
          <span class="text-xs text-outline">Enrolled from Skill Gap Analysis</span>
        </div>

        ${enrolledCourses.length > 0 ? `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${enrolledCourses.map(c => `
              <div class="bg-white p-5 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between gap-4">
                <div class="flex flex-col gap-2">
                  <div class="flex items-center justify-between">
                    <span class="px-2.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold">
                      Remediation: ${c.skill}
                    </span>
                    <span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
                      ${c.status || 'In Progress'}
                    </span>
                  </div>
                  <h3 class="font-display text-sm font-bold text-on-surface leading-snug mt-1">${c.title}</h3>
                  <span class="text-[11px] text-outline">Provider: ${c.provider} • ${c.estHours}</span>
                  <span class="text-[10px] text-outline">Enrolled on ${c.enrolledDate || 'Today'}</span>
                </div>

                <div class="flex flex-col gap-2 pt-3 border-t border-surface-container">
                  <div class="flex justify-between text-xs font-semibold text-on-surface">
                    <span>Learning Progress</span>
                    <span>${c.progress || 15}%</span>
                  </div>
                  <div class="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div class="bg-primary h-full rounded-full transition-all duration-500" style="width: ${c.progress || 15}%"></div>
                  </div>
                  <button data-id="${c.id}" class="continue-course-btn mt-2 w-full py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary-dark transition-all flex items-center justify-center gap-1">
                    <span class="material-symbols-outlined text-sm">play_arrow</span> Continue Course
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="bg-surface-container-low p-6 rounded-2xl border border-surface-container text-center flex flex-col items-center gap-2">
            <span class="material-symbols-outlined text-outline text-3xl">school</span>
            <span class="text-xs font-bold text-on-surface">No Self-Enrolled Skill Gap Courses Yet</span>
            <p class="text-xs text-on-surface-variant max-w-md">Go to the <strong>Skill Gap & Growth Analysis</strong> section and click <strong>"Enroll Plan"</strong> on any missing skill to add it to your active learning dashboard.</p>
            <a href="#/employee/skill-gap" class="mt-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary-dark transition-all">
              Go to Skill Gap Analysis
            </a>
          </div>
        `}
      </div>

      <!-- 2. HR Assigned Reskilling Section -->
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
                  <button class="px-3 py-1 rounded-lg bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary-dark transition-all">
                    Start Reskilling Module
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- 3. General Enterprise Recommended Course Catalog -->
      <div class="flex flex-col gap-3">
        <h2 class="font-display text-base font-bold text-on-surface">Enterprise Recommended Course Catalog</h2>
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

            <div class="flex flex-col gap-2 pt-2 border-t border-surface-container">
              <button data-course="Advanced RAG & Vector Search Systems" data-skill="Vector Databases" class="enroll-catalog-btn w-full py-2 rounded-xl bg-surface-container-high text-on-surface text-xs font-bold hover:bg-primary hover:text-white transition-all">
                Enroll Course
              </button>
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

            <div class="flex flex-col gap-2 pt-2 border-t border-surface-container">
              <button data-course="Kubernetes & Distributed System Security" data-skill="Kubernetes Security" class="enroll-catalog-btn w-full py-2 rounded-xl bg-surface-container-high text-on-surface text-xs font-bold hover:bg-primary hover:text-white transition-all">
                Enroll Course
              </button>
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

            <div class="flex flex-col gap-2 pt-2 border-t border-surface-container">
              <button data-course="Enterprise LLM Prompting & Fine-Tuning" data-skill="LLM Fine-Tuning" class="enroll-catalog-btn w-full py-2 rounded-xl bg-surface-container-high text-on-surface text-xs font-bold hover:bg-primary hover:text-white transition-all">
                Enroll Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Event Listeners for Learning View (Continue Course & Enroll Catalog)
 */
export function initEmpLearningEvents(onLearningStateChange) {
  // 1. Handle Continue Course Progress
  const continueBtns = document.querySelectorAll('.continue-course-btn');
  continueBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const courseId = btn.getAttribute('data-id');
      const emp = getActiveEmployee();
      if (emp && emp.enrolledCourses) {
        const course = emp.enrolledCourses.find(c => c.id === courseId);
        if (course) {
          course.progress = Math.min(100, (course.progress || 15) + 25);
          if (course.progress >= 100) {
            course.status = 'Completed ✓';
            showToast(`Congratulations! You completed "${course.title}".`, 'success');
          } else {
            showToast(`Progress updated: ${course.title} is now at ${course.progress}%.`, 'info');
          }
          saveStore(store);
          if (onLearningStateChange) onLearningStateChange();
        }
      }
    });
  });

  // 2. Handle Catalog Course Enrollment
  const catalogBtns = document.querySelectorAll('.enroll-catalog-btn');
  catalogBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const courseName = btn.getAttribute('data-course');
      const skillName = btn.getAttribute('data-skill');

      enrollEmployeeCourse(courseName, skillName);
      showToast(`Enrolled in "${courseName}"! Course added to your active tracks.`, 'success');
      if (onLearningStateChange) onLearningStateChange();
    });
  });
}

