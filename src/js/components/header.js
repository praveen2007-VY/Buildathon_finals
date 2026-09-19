// Header Component with Module Switcher (Employee <-> HR / Admin)

import { activeUser } from '../data.js';

export function renderHeader(currentModule = 'employee') {
  return `
    <header class="fixed top-0 left-60 right-0 h-16 bg-white/95 backdrop-blur-xl border-b border-surface-container-high shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-6">
      <!-- Search Input Trigger -->
      <div class="flex items-center flex-1 max-w-lg">
        <div class="relative w-full flex items-center cursor-pointer" id="headerSearchBtn">
          <span class="material-symbols-outlined absolute left-3 text-outline text-lg pointer-events-none">search</span>
          <input 
            type="text" 
            placeholder="Search employees, skills, requisitions, or AI recommendations..." 
            readonly
            class="w-full h-10 pl-10 pr-12 rounded-lg bg-surface-container-low text-on-surface text-xs placeholder:text-outline focus:outline-none cursor-pointer hover:bg-surface-container transition-all"
          />
          <span class="absolute right-3 text-[11px] font-semibold text-outline px-1.5 py-0.5 rounded bg-surface-container-high shadow-xs">⌘K</span>
        </div>
      </div>

      <!-- Module Switcher & Header Controls -->
      <div class="flex items-center gap-4 ml-6">
        <!-- Dual Module Switcher Segmented Control -->
        <div class="flex items-center p-1 rounded-xl bg-surface-container-low border border-surface-container">
          <button 
            id="switchToEmployeeBtn"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${currentModule === 'employee' ? 'bg-white text-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}"
          >
            <span class="material-symbols-outlined text-base">person</span>
            <span>Employee</span>
          </button>
          <button 
            id="switchToHrBtn"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${currentModule === 'hr' ? 'bg-white text-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}"
          >
            <span class="material-symbols-outlined text-base">admin_panel_settings</span>
            <span>HR / Admin</span>
          </button>
        </div>

        <!-- AI Assistant Drawer Trigger -->
        <button 
          type="button" 
          id="headerAiBtn"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-semibold hover:bg-secondary-fixed-dim transition-colors shadow-xs"
        >
          <span class="material-symbols-outlined text-base">auto_awesome</span>
          <span class="hidden sm:inline">AI Copilot</span>
          <span class="text-[10px] px-1 rounded bg-white/60">⌘J</span>
        </button>

        <!-- Notifications Bell -->
        <button 
          type="button" 
          id="headerNotifBtn"
          aria-label="Notifications"
          class="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors"
        >
          <span class="material-symbols-outlined text-xl">notifications</span>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error animate-ping"></span>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error"></span>
        </button>

        <div class="h-6 w-px bg-surface-container-high"></div>

        <!-- Active User Profile Dropdown Widget -->
        <div class="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-surface-container-high transition-colors" id="userProfileBtn">
          <img 
            src="${activeUser.avatar}" 
            alt="${activeUser.name}" 
            class="w-8 h-8 rounded-full object-cover border border-white shadow-xs"
          />
          <div class="flex flex-col text-left">
            <span class="text-xs font-semibold text-on-surface leading-tight">${activeUser.name}</span>
            <span class="text-[10px] text-outline leading-tight">${currentModule === 'hr' ? 'HR Administrator' : 'Principal Analyst'}</span>
          </div>
          <span class="material-symbols-outlined text-on-surface-variant text-base">arrow_drop_down</span>
        </div>
      </div>
    </header>
  `;
}
