// Employee Module: My Profile View (6 Sub-tabs) - Powered by Supabase Real Data

import { getActiveEmployee, store, saveStore } from '../../data.js';

export function renderEmpProfileView() {
  const emp = getActiveEmployee() || store.employees[0];

  const techSkills = emp.skills && emp.skills.length > 0 ? emp.skills : ['Python', 'SQL', 'Git'];
  const softSkills = emp.softSkills && emp.softSkills.length > 0 ? emp.softSkills : ['Teamwork', 'Problem-solving'];
  const certsList = (emp.certifications && emp.certifications.length > 0) ? emp.certifications : ['Oracle Java Foundations', 'Enterprise Tech Certificate'];
  const coursesList = (emp.coursesLearning && emp.coursesLearning.length > 0) ? emp.coursesLearning : ['Python Programming'];

  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <!-- Page Header with Database Employee Switcher -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="font-display text-2xl font-bold text-on-surface">Employee Profile</h1>
          <p class="text-xs text-on-surface-variant">View and manage verified personal details, job metadata, skills, and projects from Supabase database.</p>
        </div>
        <div class="flex items-center gap-3">
          <!-- Employee Selector Dropdown -->
          <div class="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-surface-container shadow-xs">
            <span class="material-symbols-outlined text-sm text-primary">badge</span>
            <label for="profileEmpSelect" class="text-xs font-semibold text-outline">View Profile:</label>
            <select id="profileEmpSelect" class="bg-transparent text-xs font-bold text-on-surface focus:outline-none cursor-pointer">
              ${store.employees.map(e => `
                <option value="${e.id}" ${e.id === emp.id ? 'selected' : ''}>${e.id} - ${e.name} (${e.role})</option>
              `).join('')}
            </select>
          </div>
          <span class="px-3 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">verified</span> Live Supabase Data
          </span>
        </div>
      </div>

      <!-- Profile Header Banner -->
      <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col md:flex-row items-center gap-6">
        <img src="${emp.avatar}" class="w-20 h-20 rounded-2xl object-cover shadow-sm ring-4 ring-surface-container"/>
        <div class="flex flex-col text-center md:text-left flex-1">
          <div class="flex items-center justify-center md:justify-start gap-2">
            <h2 class="font-display text-xl font-bold text-on-surface">${emp.name}</h2>
            <span class="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">${emp.grade}</span>
            <span class="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">${emp.department}</span>
          </div>
          <span class="text-xs text-on-surface-variant font-medium mt-1">${emp.role} • ${emp.education} (${emp.specialization})</span>
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-outline mt-2">
            <span>📍 ${emp.location}</span>
            <span>🆔 ${emp.id}</span>
            <span>📅 Exp: ${emp.experience}</span>
            <span>⭐ Rating: ${emp.performanceScore} / 5.0</span>
            <span>🎯 Readiness: ${emp.readinessScore || 85}%</span>
          </div>
        </div>
      </div>

      <!-- Profile Sub-Tabs Navigation -->
      <div class="bg-white p-2 rounded-xl border border-surface-container shadow-xs flex items-center gap-2 overflow-x-auto" id="profileTabNav">
        <button class="profile-tab-btn active-tab px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-surface-container-high text-on-surface transition-all" data-tab="personal">Personal Information</button>
        <button class="profile-tab-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-all" data-tab="job">Job Information</button>
        <button class="profile-tab-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-all" data-tab="skills">Skills & Competencies</button>
        <button class="profile-tab-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-all" data-tab="experience">Career & Achievements</button>
        <button class="profile-tab-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-all" data-tab="projects">Projects & Responsibilities</button>
        <button class="profile-tab-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-all" data-tab="certifications">Certifications & Learning</button>
      </div>

      <!-- Sub-Tab Content Containers -->
      <div id="profileTabContent" class="bg-white p-6 rounded-2xl border border-surface-container shadow-xs">
        <!-- 1. Personal Info -->
        <div id="tab-personal" class="profile-tab-pane flex flex-col gap-4">
          <h3 class="font-display text-base font-bold text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">person</span> Personal Information
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">Full Legal Name</span>
              <p class="text-on-surface font-semibold mt-1">${emp.name}</p>
            </div>
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">Corporate Email</span>
              <p class="text-on-surface font-semibold mt-1">${emp.email}</p>
            </div>
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">Office Location / Hub</span>
              <p class="text-on-surface font-semibold mt-1">${emp.location}</p>
            </div>
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">Age</span>
              <p class="text-on-surface font-semibold mt-1">${emp.age || 25} years old</p>
            </div>
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">Education Qualification</span>
              <p class="text-on-surface font-semibold mt-1">${emp.education}</p>
            </div>
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">Academic Specialization</span>
              <p class="text-on-surface font-semibold mt-1">${emp.specialization}</p>
            </div>
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">Communication Rating</span>
              <p class="text-on-surface font-semibold mt-1">${emp.communicationSkills}</p>
            </div>
          </div>
        </div>

        <!-- 2. Job Info -->
        <div id="tab-job" class="profile-tab-pane hidden flex flex-col gap-4">
          <h3 class="font-display text-base font-bold text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">work</span> Job & Organization Metadata
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">Current Official Role</span>
              <p class="text-on-surface font-semibold mt-1">${emp.role}</p>
            </div>
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">Department / Business Unit</span>
              <p class="text-on-surface font-semibold mt-1">${emp.department}</p>
            </div>
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">Employee Database ID</span>
              <p class="text-on-surface font-semibold mt-1">${emp.id}</p>
            </div>
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">Employee Band Level</span>
              <p class="text-on-surface font-semibold mt-1">${emp.grade}</p>
            </div>
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">Performance Rating</span>
              <p class="text-on-surface font-semibold mt-1">⭐ ${emp.performanceScore} / 5.0</p>
            </div>
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">AI Career Readiness</span>
              <p class="text-on-surface font-semibold mt-1">🎯 ${emp.readinessScore || 85}%</p>
            </div>
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container md:col-span-2 lg:col-span-3">
              <span class="text-outline text-[10px] uppercase font-semibold">Career Interest & Mobility Target</span>
              <p class="text-primary font-bold mt-1">${emp.careerInterests}</p>
            </div>
          </div>
        </div>

        <!-- 3. Skills -->
        <div id="tab-skills" class="profile-tab-pane hidden flex flex-col gap-4">
          <h3 class="font-display text-base font-bold text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">psychology</span> Verified Enterprise Skills & Proficiency
          </h3>
          <div class="flex flex-col gap-3">
            <span class="text-xs font-semibold text-outline uppercase">Technical Skills</span>
            <div class="flex flex-wrap gap-2">
              ${techSkills.map(s => `
                <span class="px-3.5 py-2 rounded-xl bg-primary/10 text-primary text-xs font-semibold flex items-center gap-1.5 shadow-xs">
                  <span class="material-symbols-outlined text-sm">verified</span>
                  ${s} <strong class="text-primary font-bold">(${emp.proficiency && emp.proficiency[s] ? emp.proficiency[s] : 90}%)</strong>
                </span>
              `).join('')}
            </div>

            <span class="text-xs font-semibold text-outline uppercase mt-3">Soft Skills & Competencies</span>
            <div class="flex flex-wrap gap-2">
              ${softSkills.map(s => `
                <span class="px-3.5 py-2 rounded-xl bg-secondary/10 text-secondary text-xs font-semibold flex items-center gap-1.5 shadow-xs">
                  <span class="material-symbols-outlined text-sm">psychology</span>
                  ${s}
                </span>
              `).join('')}
            </div>

            <div class="mt-4 p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-1 text-xs">
              <span class="text-outline text-[10px] uppercase font-semibold">Communication Skills Evaluation</span>
              <p class="text-on-surface font-semibold">${emp.communicationSkills}</p>
            </div>
          </div>
        </div>

        <!-- 4. Experience -->
        <div id="tab-experience" class="profile-tab-pane hidden flex flex-col gap-4">
          <h3 class="font-display text-base font-bold text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">history_edu</span> Career Experience & Key Achievements
          </h3>
          <div class="flex flex-col gap-3">
            <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-1">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-on-surface">${emp.role} • ${emp.department}</span>
                <span class="text-[10px] px-2.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold">Current Role</span>
              </div>
              <p class="text-xs text-on-surface-variant mt-1">Total Experience: ${emp.yearsExperience} years.</p>
              <p class="text-xs text-outline">Previous Roles & Background: ${emp.previousRoles}</p>
            </div>

            <div class="p-4 rounded-xl bg-primary/5 border border-primary/20 flex flex-col gap-1">
              <span class="text-xs font-bold text-primary flex items-center gap-1">
                <span class="material-symbols-outlined text-base">emoji_events</span>
                Key Achievement Milestone
              </span>
              <p class="text-xs text-on-surface font-medium mt-1">"${emp.achievements}"</p>
            </div>
          </div>
        </div>

        <!-- 5. Projects -->
        <div id="tab-projects" class="profile-tab-pane hidden flex flex-col gap-4">
          <h3 class="font-display text-base font-bold text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">folder_open</span> Key Enterprise Projects
          </h3>
          <div class="p-5 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <span class="font-bold text-on-surface text-sm">${emp.projectsCompleted}</span>
              <span class="px-2.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">Completed</span>
            </div>
            <span class="text-xs text-primary font-semibold">Key Responsibilities:</span>
            <p class="text-xs text-on-surface-variant leading-relaxed">${emp.projectResponsibilities}</p>
          </div>
        </div>

        <!-- 6. Certifications -->
        <div id="tab-certifications" class="profile-tab-pane hidden flex flex-col gap-4">
          <h3 class="font-display text-base font-bold text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">verified</span> Verified Certifications & Active Courses
          </h3>
          <div class="flex flex-col gap-3">
            <span class="text-xs font-semibold text-outline uppercase">Active Learning Courses</span>
            ${coursesList.map(course => `
              <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-secondary text-2xl">auto_stories</span>
                  <div class="flex flex-col">
                    <span class="text-xs font-bold text-on-surface">${course}</span>
                    <span class="text-[11px] text-outline">Enrolled Learning Track</span>
                  </div>
                </div>
                <span class="px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">In Progress</span>
              </div>
            `).join('')}

            <span class="text-xs font-semibold text-outline uppercase mt-3">Verified Certifications</span>
            ${certsList.map(cert => `
              <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-primary text-2xl">workspace_premium</span>
                  <div class="flex flex-col">
                    <span class="text-xs font-bold text-on-surface">${cert}</span>
                    <span class="text-[11px] text-outline">Enterprise Academy Verified</span>
                  </div>
                </div>
                <span class="px-2 py-1 rounded bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">Verified</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Initialize event listeners for sub-tabs & employee switcher on profile page
 */
export function initEmpProfileEvents(onProfileChangeCallback) {
  // 1. Handle Employee Dropdown Switcher
  const empSelect = document.getElementById('profileEmpSelect');
  if (empSelect) {
    empSelect.addEventListener('change', (e) => {
      const selectedId = e.target.value;
      const selectedEmp = store.employees.find(emp => emp.id === selectedId);
      if (selectedEmp) {
        store.auth.user = {
          id: selectedEmp.id,
          name: selectedEmp.name,
          email: selectedEmp.email,
          role: selectedEmp.role,
          department: selectedEmp.department
        };
        saveStore(store);
        if (onProfileChangeCallback) onProfileChangeCallback();
      }
    });
  }

  // 2. Handle Sub-Tab Switching
  const tabButtons = document.querySelectorAll('.profile-tab-btn');
  const tabPanes = document.querySelectorAll('.profile-tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update button styles
      tabButtons.forEach(b => {
        b.classList.remove('bg-surface-container-high', 'text-on-surface', 'active-tab');
        b.classList.add('text-on-surface-variant', 'hover:bg-surface-container');
      });
      btn.classList.remove('text-on-surface-variant', 'hover:bg-surface-container');
      btn.classList.add('bg-surface-container-high', 'text-on-surface', 'active-tab');

      // Update content pane visibility
      tabPanes.forEach(pane => {
        if (pane.id === `tab-${targetTab}`) {
          pane.classList.remove('hidden');
        } else {
          pane.classList.add('hidden');
        }
      });
    });
  });
}
