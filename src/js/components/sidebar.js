// Role-Aware Navigation Sidebar Component (Employee Portal vs HR / Admin Portal)

export function renderSidebar(currentPath, currentModule = 'employee') {
  const isNavActive = (path) => {
    if (currentPath === path) return true;
    const cleanCurrent = currentPath.replace('employee/', '').replace('hr/', '');
    const cleanPath = path.replace('employee/', '').replace('hr/', '');
    return cleanCurrent === cleanPath;
  };

  const getItemClass = (path) => {
    if (isNavActive(path)) {
      return "flex items-center gap-3 px-3 py-2 rounded-lg bg-[#D7F5E5] text-[#0E201A] font-semibold shadow-xs transition-all";
    }
    return "flex items-center gap-3 px-3 py-2 rounded-lg text-[#B5CCC1] hover:bg-[#163026] hover:text-white transition-all";
  };

  return `
    <aside class="fixed left-0 top-0 h-screen w-60 bg-[#0E201A] z-50 flex flex-col justify-between py-4 rounded-r-2xl shadow-[0_1px_8px_rgba(0,0,0,0.12)] overflow-y-auto">
      <div class="flex flex-col gap-4">
        <!-- Brand & Active Module Header -->
        <div class="px-4 pt-1 flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-[#16A765] flex items-center justify-center text-white font-bold text-lg shadow-xs">
            <span class="material-symbols-outlined text-xl">${currentModule === 'hr' ? 'admin_panel_settings' : 'psychology'}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-display font-bold text-lg text-white tracking-tight leading-none">TalentPulse</span>
            <span class="text-[10px] uppercase tracking-widest text-[#5FDE96] font-semibold mt-0.5">
              ${currentModule === 'hr' ? 'HR Intelligence OS' : 'Employee Portal'}
            </span>
          </div>
        </div>

        <!-- Navigation Group -->
        <nav class="flex flex-col gap-1 px-2 mt-2" id="sidebarNav">
          ${currentModule === 'employee' ? `
            <span class="px-3 pb-1 text-[10px] uppercase tracking-wider text-[#BCCABD] font-semibold">Employee Workspace</span>
            
            <a href="#/employee/dashboard" data-path="employee/dashboard" class="${getItemClass('employee/dashboard')}">
              <span class="material-symbols-outlined text-lg">dashboard</span>
              <span class="text-xs">Dashboard</span>
            </a>

            <a href="#/employee/profile" data-path="employee/profile" class="${getItemClass('employee/profile')}">
              <span class="material-symbols-outlined text-lg">person</span>
              <span class="text-xs">My Profile</span>
            </a>

            <a href="#/employee/resume" data-path="employee/resume" class="${getItemClass('employee/resume')}">
              <span class="material-symbols-outlined text-lg">description</span>
              <span class="text-xs">Resume</span>
            </a>

            <a href="#/employee/ai-skill-profile" data-path="employee/ai-skill-profile" class="${getItemClass('employee/ai-skill-profile')}">
              <span class="material-symbols-outlined text-lg text-[#5FDE96]">psychology</span>
              <span class="text-xs">AI Skill Profile</span>
            </a>

            <a href="#/employee/opportunities" data-path="employee/opportunities" class="${getItemClass('employee/opportunities')}">
              <span class="material-symbols-outlined text-lg">hub</span>
              <span class="text-xs">Opportunities</span>
            </a>

            <a href="#/employee/skill-gap" data-path="employee/skill-gap" class="${getItemClass('employee/skill-gap')}">
              <span class="material-symbols-outlined text-lg">donut_large</span>
              <span class="text-xs">Skill Gap</span>
            </a>

            <a href="#/employee/learning" data-path="employee/learning" class="${getItemClass('employee/learning')}">
              <span class="material-symbols-outlined text-lg">school</span>
              <span class="text-xs">Learning</span>
            </a>

            <a href="#/employee/ai-career-assistant" data-path="employee/ai-career-assistant" class="${getItemClass('employee/ai-career-assistant')}">
              <span class="material-symbols-outlined text-lg ${isNavActive('employee/ai-career-assistant') ? 'text-[#0E201A]' : 'text-indigo-400'}">auto_awesome</span>
              <span class="text-xs">AI Career Assistant</span>
            </a>

            <a href="#/employee/feedback" data-path="employee/feedback" class="${getItemClass('employee/feedback')}">
              <span class="material-symbols-outlined text-lg">rate_review</span>
              <span class="text-xs">Feedback</span>
            </a>

            <a href="#/employee/settings" data-path="employee/settings" class="${getItemClass('employee/settings')}">
              <span class="material-symbols-outlined text-lg">settings</span>
              <span class="text-xs">Settings</span>
            </a>
          ` : `
            <span class="px-3 pb-1 text-[10px] uppercase tracking-wider text-[#BCCABD] font-semibold">HR & Administration</span>

            <a href="#/hr/dashboard" data-path="hr/dashboard" class="${getItemClass('hr/dashboard')}">
              <span class="material-symbols-outlined text-lg">monitoring</span>
              <span class="text-xs">Dashboard</span>
            </a>

            <a href="#/hr/employee-management" data-path="hr/employee-management" class="${getItemClass('hr/employee-management')}">
              <span class="material-symbols-outlined text-lg">badge</span>
              <span class="text-xs">Employee Management</span>
            </a>

            <a href="#/hr/talent-management" data-path="hr/talent-management" class="${getItemClass('hr/talent-management')}">
              <span class="material-symbols-outlined text-lg">manage_search</span>
              <span class="text-xs">Talent Management</span>
            </a>

            <a href="#/hr/recruitment" data-path="hr/recruitment" class="${getItemClass('hr/recruitment')}">
              <span class="material-symbols-outlined text-lg">work</span>
              <span class="text-xs">Recruitment & Onboarding</span>
            </a>

            <a href="#/hr/learning-development" data-path="hr/learning-development" class="${getItemClass('hr/learning-development')}">
              <span class="material-symbols-outlined text-lg">model_training</span>
              <span class="text-xs">Learning & Development</span>
            </a>

            <a href="#/hr/performance" data-path="hr/performance" class="${getItemClass('hr/performance')}">
              <span class="material-symbols-outlined text-lg">trending_up</span>
              <span class="text-xs">Performance</span>
            </a>

            <a href="#/hr/analytics" data-path="hr/analytics" class="${getItemClass('hr/analytics')}">
              <span class="material-symbols-outlined text-lg">query_stats</span>
              <span class="text-xs">Analytics</span>
            </a>

            <a href="#/hr/reports" data-path="hr/reports" class="${getItemClass('hr/reports')}">
              <span class="material-symbols-outlined text-lg">summarize</span>
              <span class="text-xs">Reports</span>
            </a>

            <a href="#/hr/settings" data-path="hr/settings" class="${getItemClass('hr/settings')}">
              <span class="material-symbols-outlined text-lg">settings_suggest</span>
              <span class="text-xs">Settings</span>
            </a>
          `}
        </nav>
      </div>

      <!-- Footer Version Indicator -->
      <div class="px-4 pt-4 border-t border-[#1B3B2F]">
        <div class="flex items-center justify-between text-[#B5CCC1]">
          <span class="text-[11px] text-[#BCCABD]">v2.8 Enterprise</span>
          <span class="material-symbols-outlined text-sm text-[#7DFBB0]">verified</span>
        </div>
      </div>
    </aside>
  `;
}
