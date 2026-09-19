// Interactive Modals and Command Palette Component

import { candidateMarketplace, openRoles, skillsList } from '../data.js';

export function renderSearchModal() {
  return `
    <div id="searchModal" class="fixed inset-0 z-[100] flex items-start justify-center pt-20 bg-black/40 backdrop-blur-sm animate-fade-in hidden">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-surface-container-high mx-4">
        <!-- Search Input Header -->
        <div class="p-4 border-b border-surface-container flex items-center gap-3 bg-surface-container-lowest">
          <span class="material-symbols-outlined text-primary text-xl">search</span>
          <input 
            type="text" 
            id="modalSearchInput" 
            placeholder="Type a skill, candidate name, role, or prompt query..." 
            class="w-full text-sm bg-transparent focus:outline-none text-on-surface placeholder:text-outline"
            autofocus
          />
          <kbd class="text-[10px] font-semibold text-outline bg-surface-container px-2 py-1 rounded">ESC</kbd>
        </div>

        <!-- Realtime Search Results Area -->
        <div class="p-4 max-h-[420px] overflow-y-auto flex flex-col gap-4" id="modalSearchResults">
          <!-- Default Suggested Quick Filters -->
          <div>
            <span class="text-[11px] uppercase tracking-wider text-outline font-semibold block mb-2">Quick Navigation</span>
            <div class="grid grid-cols-2 gap-2">
              <a href="#/ai-career-assistant" class="search-item p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container flex items-center gap-2 text-xs font-semibold text-on-surface">
                <span class="material-symbols-outlined text-secondary text-base">auto_awesome</span>
                <span>AI Career Assistant</span>
              </a>
              <a href="#/talent-discovery" class="search-item p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container flex items-center gap-2 text-xs font-semibold text-on-surface">
                <span class="material-symbols-outlined text-primary text-base">manage_search</span>
                <span>Talent Discovery Marketplace</span>
              </a>
              <a href="#/hr-dashboard" class="search-item p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container flex items-center gap-2 text-xs font-semibold text-on-surface">
                <span class="material-symbols-outlined text-primary text-base">monitoring</span>
                <span>HR Intelligence Dashboard</span>
              </a>
              <a href="#/ai-skill-profile" class="search-item p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container flex items-center gap-2 text-xs font-semibold text-on-surface">
                <span class="material-symbols-outlined text-tertiary text-base">psychology</span>
                <span>AI Skill Profile Matrix</span>
              </a>
            </div>
          </div>

          <div>
            <span class="text-[11px] uppercase tracking-wider text-outline font-semibold block mb-2">Top Talent Matches</span>
            <div class="flex flex-col gap-2" id="modalCandidateMatches">
              ${candidateMarketplace.slice(0, 3).map(c => `
                <div class="flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer border border-surface-container">
                  <div class="flex items-center gap-3">
                    <img src="${c.avatar}" class="w-8 h-8 rounded-full object-cover"/>
                    <div class="flex flex-col">
                      <span class="text-xs font-semibold text-on-surface">${c.name}</span>
                      <span class="text-[11px] text-outline">${c.role}</span>
                    </div>
                  </div>
                  <span class="text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/10">${c.matchScore}% Match</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderAiDrawerModal() {
  return `
    <div id="aiDrawerModal" class="fixed inset-y-0 right-0 z-[100] w-full max-w-md bg-white shadow-2xl border-l border-surface-container-high transform translate-x-full transition-transform duration-300 flex flex-col justify-between">
      <div class="p-4 bg-[#0E201A] text-white flex items-center justify-between shadow-sm">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-secondary-fixed text-xl">auto_awesome</span>
          <span class="font-display font-bold text-sm">TalentPulse Quick AI Drawer</span>
        </div>
        <button id="closeAiDrawer" class="p-1 rounded text-outline-variant hover:text-white transition-colors">
          <span class="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      <div class="p-4 flex-1 overflow-y-auto flex flex-col gap-3 bg-surface" id="aiDrawerFeed">
        <div class="bg-surface-container-low p-3.5 rounded-xl text-xs text-on-surface leading-relaxed">
          <p class="font-semibold text-primary mb-1">Hello Alex,</p>
          I am your TalentPulse Intelligence Copilot. How can I assist your workforce query today?
        </div>
      </div>

      <div class="p-4 border-t border-surface-container bg-white flex items-center gap-2">
        <input 
          type="text" 
          id="aiDrawerInput" 
          placeholder="Ask anything about roles, skills, or candidates..." 
          class="flex-1 h-10 px-3 rounded-lg bg-surface-container-low text-xs text-on-surface focus:outline-none"
        />
        <button id="aiDrawerSendBtn" class="w-10 h-10 rounded-lg bg-primary-container text-white flex items-center justify-center hover:bg-primary transition-colors">
          <span class="material-symbols-outlined text-lg">send</span>
        </button>
      </div>
    </div>
  `;
}

export function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const bgColor = type === 'success' ? 'bg-[#0E201A] text-white' : 'bg-secondary-fixed text-on-secondary-fixed';
  toast.className = `px-4 py-3 rounded-xl shadow-xl font-semibold text-xs flex items-center gap-2 pointer-events-auto animate-fade-in ${bgColor}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined text-base text-[#7DFBB0]">verified</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
