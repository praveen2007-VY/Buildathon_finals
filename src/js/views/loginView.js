// Login & Portal Selection View (Employee Login vs HR Login) - Powered by Supabase

import { store } from '../data.js';

export function renderLoginView() {
  const employeesList = (store.employees && store.employees.length > 0) ? store.employees : [
    { id: 'EMP001', name: 'Aarav Mehta', email: 'aarav.mehta@enterprise.ai', role: 'Python Developer', department: 'Software Development' }
  ];

  const activeEmpId = store.auth?.user?.id || employeesList[0].id;
  const activeEmp = employeesList.find(e => e.id === activeEmpId) || employeesList[0];

  return `
    <div class="min-h-[85vh] flex items-center justify-center py-10 px-4 animate-fade-in">
      <div class="max-w-4xl w-full flex flex-col gap-8">
        <!-- Brand Header -->
        <div class="flex flex-col items-center text-center gap-2">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#16A765] to-[#0E201A] flex items-center justify-center text-white shadow-lg mb-1 ring-4 ring-emerald-500/10">
            <span class="material-symbols-outlined text-3xl">psychology</span>
          </div>
          <h1 class="font-display text-3xl font-bold text-on-surface tracking-tight">TalentPulse AI Enterprise Portal</h1>
          <p class="text-xs sm:text-sm text-on-surface-variant max-w-lg">
            Connected to Supabase project <code class="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-mono text-xs">yhskpilxfkzzmmamvcaa</code> (${employeesList.length} Live Employee Records)
          </p>
        </div>

        <!-- Authentication Dual-Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 1. EMPLOYEE LOGIN CARD -->
          <div class="bg-white p-8 rounded-3xl shadow-sm border border-surface-container hover:shadow-md transition-all flex flex-col justify-between gap-6 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform"></div>

            <div class="flex flex-col gap-4 relative z-10">
              <div class="flex items-center justify-between">
                <div class="w-12 h-12 rounded-2xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold">
                  <span class="material-symbols-outlined text-2xl">person</span>
                </div>
                <span class="px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider">Employee Portal</span>
              </div>

              <div>
                <h2 class="font-display text-xl font-bold text-on-surface">Employee Login</h2>
                <p class="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Access your AI Skill Profile, view career mobility recommendations, active learning, and feedback from Supabase.
                </p>
              </div>

              <div class="flex flex-col gap-3 pt-2">
                <div>
                  <label class="text-[11px] font-semibold text-outline uppercase tracking-wider block mb-1">Select Employee Profile (${employeesList.length} Available)</label>
                  <select id="empLoginSelect" class="w-full h-11 px-3.5 rounded-xl bg-surface-container-low text-xs font-semibold text-on-surface border border-surface-container focus:outline-none focus:border-primary">
                    ${employeesList.map(e => `
                      <option value="${e.id}" ${e.id === activeEmpId ? 'selected' : ''}>
                        ${e.id} — ${e.name} (${e.role}, ${e.department})
                      </option>
                    `).join('')}
                  </select>
                </div>

                <div>
                  <label class="text-[11px] font-semibold text-outline uppercase tracking-wider block mb-1">Corporate Email</label>
                  <input 
                    type="email" 
                    id="empEmailInput" 
                    value="${activeEmp.email}" 
                    class="w-full h-10 px-3.5 rounded-xl bg-surface-container-low text-xs text-on-surface border border-surface-container focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <button 
              id="loginAsEmployeeBtn" 
              class="w-full py-3.5 px-4 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2 group-hover:shadow-lg"
            >
              <span class="material-symbols-outlined text-base">login</span>
              <span>Sign In as Employee</span>
            </button>
          </div>

          <!-- 2. HR LOGIN CARD -->
          <div class="bg-white p-8 rounded-3xl shadow-sm border border-surface-container hover:shadow-md transition-all flex flex-col justify-between gap-6 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform"></div>

            <div class="flex flex-col gap-4 relative z-10">
              <div class="flex items-center justify-between">
                <div class="w-12 h-12 rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold">
                  <span class="material-symbols-outlined text-2xl">admin_panel_settings</span>
                </div>
                <span class="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[11px] font-bold uppercase tracking-wider">HR & Admin OS</span>
              </div>

              <div>
                <h2 class="font-display text-xl font-bold text-on-surface">HR / Admin Login</h2>
                <p class="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Post new job requisitions, select employees, execute multi-employee AI gap analysis, assign reskilling tracks & dispatch feedback.
                </p>
              </div>

              <div class="flex flex-col gap-3 pt-2">
                <div>
                  <label class="text-[11px] font-semibold text-outline uppercase tracking-wider block mb-1">HR Lead Name</label>
                  <input 
                    type="text" 
                    id="hrNameInput" 
                    value="Dr. Priya Patel (HR Director)" 
                    class="w-full h-10 px-3.5 rounded-xl bg-surface-container-low text-xs font-semibold text-on-surface border border-surface-container focus:outline-none focus:border-secondary"
                  />
                </div>

                <div>
                  <label class="text-[11px] font-semibold text-outline uppercase tracking-wider block mb-1">HR Security Passkey</label>
                  <input 
                    type="password" 
                    id="hrKeyInput" 
                    value="admin123" 
                    class="w-full h-10 px-3.5 rounded-xl bg-surface-container-low text-xs text-on-surface border border-surface-container focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>
            </div>

            <button 
              id="loginAsHrBtn" 
              class="w-full py-3.5 px-4 rounded-2xl bg-secondary text-white text-xs font-bold hover:bg-secondary/90 transition-all shadow-md flex items-center justify-center gap-2 group-hover:shadow-lg"
            >
              <span class="material-symbols-outlined text-base">shield_person</span>
              <span>Sign In as HR Administrator</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
