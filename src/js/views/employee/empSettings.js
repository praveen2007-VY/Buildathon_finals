// Employee Module: Settings View

export function renderEmpSettingsView() {
  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <div>
        <h1 class="font-display text-2xl font-bold text-on-surface">Employee Account Settings</h1>
        <p class="text-xs text-on-surface-variant">Configure your career privacy, mobility notifications, and account preferences.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-6 max-w-2xl">
        <div class="flex items-center justify-between border-b border-surface-container pb-4">
          <div class="flex flex-col">
            <span class="text-xs font-bold text-on-surface">Career Privacy Guarantee Mode</span>
            <span class="text-[11px] text-outline">Keep your exploratory queries private from managers</span>
          </div>
          <input type="checkbox" checked class="h-5 w-5 accent-primary cursor-pointer"/>
        </div>

        <div class="flex items-center justify-between border-b border-surface-container pb-4">
          <div class="flex flex-col">
            <span class="text-xs font-bold text-on-surface">Internal Job Opportunity Alerts</span>
            <span class="text-[11px] text-outline">Receive real-time notifications for roles matching >85%</span>
          </div>
          <input type="checkbox" checked class="h-5 w-5 accent-primary cursor-pointer"/>
        </div>

        <button id="saveSettingsBtn" class="px-5 py-2.5 rounded-lg bg-primary text-white text-xs font-semibold shadow-xs self-start">
          Save Settings
        </button>
      </div>
    </div>
  `;
}
