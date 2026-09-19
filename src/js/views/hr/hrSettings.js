// HR Module: HR & System Settings View

export function renderHrSettingsView() {
  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <div>
        <h1 class="font-display text-2xl font-bold text-on-surface">HR System & AI Governance Settings</h1>
        <p class="text-xs text-on-surface-variant">Configure AI model parameters, role-based access control (RBAC), and enterprise integrations.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-6 max-w-2xl">
        <div class="flex flex-col gap-1 border-b border-surface-container pb-4">
          <label class="text-xs font-bold text-on-surface">Active Talent Match Engine Model</label>
          <select class="h-10 px-3 rounded-lg bg-surface-container-low text-xs text-on-surface focus:outline-none">
            <option>TalentPulse Llama-3-Enterprise (v4.2 Deterministic)</option>
            <option>Gemini 1.5 Pro Enterprise Architecture</option>
          </select>
        </div>

        <div class="flex items-center justify-between border-b border-surface-container pb-4">
          <div class="flex flex-col">
            <span class="text-xs font-bold text-on-surface">Automated Internal Candidate Matching</span>
            <span class="text-[11px] text-outline">Automatically route >90% matched internal personnel to open requisitions</span>
          </div>
          <input type="checkbox" checked class="h-5 w-5 accent-primary cursor-pointer"/>
        </div>

        <button id="saveHrSettingsBtn" class="px-5 py-2.5 rounded-lg bg-primary text-white text-xs font-semibold shadow-xs self-start">
          Save Governance Settings
        </button>
      </div>
    </div>
  `;
}
