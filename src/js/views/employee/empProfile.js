// Employee Module: My Profile View (6 Sub-tabs)

import { activeUser, profileDetails, skillsList } from '../../data.js';

export function renderEmpProfileView() {
  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="font-display text-2xl font-bold text-on-surface">My Employee Profile</h1>
          <p class="text-xs text-on-surface-variant">View and manage your personal details, job metadata, verified skills, and career history.</p>
        </div>
        <button id="editProfileBtn" class="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold shadow-xs hover:bg-primary/90">
          <span class="material-symbols-outlined text-base">edit</span> Edit Profile
        </button>
      </div>

      <!-- Profile Header Banner -->
      <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col md:flex-row items-center gap-6">
        <img src="${activeUser.avatar}" class="w-20 h-20 rounded-2xl object-cover shadow-sm ring-4 ring-surface-container"/>
        <div class="flex flex-col text-center md:text-left flex-1">
          <div class="flex items-center justify-center md:justify-start gap-2">
            <h2 class="font-display text-xl font-bold text-on-surface">${activeUser.name}</h2>
            <span class="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">${activeUser.grade}</span>
          </div>
          <span class="text-xs text-on-surface-variant font-medium mt-1">${activeUser.role} • ${activeUser.department}</span>
          <div class="flex items-center justify-center md:justify-start gap-4 text-xs text-outline mt-2">
            <span>📍 ${activeUser.location}</span>
            <span>🆔 ${activeUser.id}</span>
            <span>📅 Tenure: ${activeUser.tenure}</span>
          </div>
        </div>
      </div>

      <!-- Profile Sub-Tabs Navigation -->
      <div class="bg-white p-2 rounded-xl border border-surface-container shadow-xs flex items-center gap-2 overflow-x-auto" id="profileTabNav">
        <button class="profile-tab-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-surface-container-high text-on-surface" data-tab="personal">Personal Information</button>
        <button class="profile-tab-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container" data-tab="job">Job Information</button>
        <button class="profile-tab-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container" data-tab="skills">Skills</button>
        <button class="profile-tab-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container" data-tab="experience">Experience</button>
        <button class="profile-tab-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container" data-tab="projects">Projects</button>
        <button class="profile-tab-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container" data-tab="certifications">Certifications</button>
      </div>

      <!-- Sub-Tab Content Containers -->
      <div id="profileTabContent" class="bg-white p-6 rounded-2xl border border-surface-container shadow-xs">
        <!-- 1. Personal Info -->
        <div id="tab-personal" class="profile-tab-pane flex flex-col gap-4">
          <h3 class="font-display text-base font-bold text-on-surface">Personal Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">Full Legal Name</span>
              <p class="text-on-surface font-semibold mt-1">${profileDetails.personal.fullName}</p>
            </div>
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">Preferred Name</span>
              <p class="text-on-surface font-semibold mt-1">${profileDetails.personal.preferredName}</p>
            </div>
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">Corporate Email</span>
              <p class="text-on-surface font-semibold mt-1">${profileDetails.personal.email}</p>
            </div>
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">Phone Number</span>
              <p class="text-on-surface font-semibold mt-1">${profileDetails.personal.phone}</p>
            </div>
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container md:col-span-2">
              <span class="text-outline text-[10px] uppercase font-semibold">Emergency Contact</span>
              <p class="text-on-surface font-semibold mt-1">${profileDetails.personal.emergencyContact}</p>
            </div>
          </div>
        </div>

        <!-- 2. Job Info -->
        <div id="tab-job" class="profile-tab-pane hidden flex flex-col gap-4">
          <h3 class="font-display text-base font-bold text-on-surface">Job & Organization Metadata</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">Official Job Title</span>
              <p class="text-on-surface font-semibold mt-1">${profileDetails.job.title}</p>
            </div>
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">Direct Manager</span>
              <p class="text-on-surface font-semibold mt-1">${profileDetails.job.manager}</p>
            </div>
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">Business Unit</span>
              <p class="text-on-surface font-semibold mt-1">${profileDetails.job.businessUnit}</p>
            </div>
            <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <span class="text-outline text-[10px] uppercase font-semibold">Start Date</span>
              <p class="text-on-surface font-semibold mt-1">${profileDetails.job.startDate}</p>
            </div>
          </div>
        </div>

        <!-- 3. Skills -->
        <div id="tab-skills" class="profile-tab-pane hidden flex flex-col gap-4">
          <h3 class="font-display text-base font-bold text-on-surface">Verified Enterprise Skills</h3>
          <div class="flex flex-wrap gap-2">
            ${skillsList.map(s => `
              <span class="px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-semibold flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">verified</span>
                ${s.name} (${s.proficiency}%)
              </span>
            `).join('')}
          </div>
        </div>

        <!-- 4. Experience -->
        <div id="tab-experience" class="profile-tab-pane hidden flex flex-col gap-4">
          <h3 class="font-display text-base font-bold text-on-surface">Career Experience Timeline</h3>
          <div class="flex flex-col gap-3">
            ${profileDetails.experience.map(exp => `
              <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-on-surface">${exp.title} • ${exp.company}</span>
                  <span class="text-[10px] px-2 py-0.5 rounded bg-surface-container-high text-outline font-semibold">${exp.period}</span>
                </div>
                <p class="text-xs text-on-surface-variant mt-1">${exp.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 5. Projects -->
        <div id="tab-projects" class="profile-tab-pane hidden flex flex-col gap-4">
          <h3 class="font-display text-base font-bold text-on-surface">Key Enterprise Projects</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            ${profileDetails.projects.map(p => `
              <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container">
                <span class="font-bold text-on-surface block text-sm">${p.name}</span>
                <span class="text-[10px] text-primary font-semibold block mt-0.5">Role: ${p.role}</span>
                <p class="text-on-surface-variant mt-2">${p.outcome}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 6. Certifications -->
        <div id="tab-certifications" class="profile-tab-pane hidden flex flex-col gap-4">
          <h3 class="font-display text-base font-bold text-on-surface">Verified Certifications</h3>
          <div class="flex flex-col gap-3">
            ${profileDetails.certifications.map(cert => `
              <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-primary text-2xl">workspace_premium</span>
                  <div class="flex flex-col">
                    <span class="text-xs font-bold text-on-surface">${cert.title}</span>
                    <span class="text-[11px] text-outline">${cert.issuer} • Issued ${cert.year}</span>
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
