// HR Module: Analytics View (Workforce Skills, Skill Gaps, Internal Mobility, Learning Analytics)

export function renderHrAnalyticsView() {
  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <div>
        <h1 class="font-display text-2xl font-bold text-on-surface">Workforce & Skill Analytics</h1>
        <p class="text-xs text-on-surface-variant">Deep-dive telemetry into workforce skill density, internal mobility velocity, and learning retention rates.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
          <h3 class="font-display text-base font-bold text-on-surface">Skill Gap Heatmap</h3>
          <div class="p-4 rounded-xl bg-surface-container-low text-xs flex flex-col gap-2">
            <div class="flex justify-between font-semibold"><span>AI & LLM Orchestration</span><span class="text-amber-600">22% Shortfall</span></div>
            <div class="flex justify-between font-semibold"><span>DevSecOps & Kubernetes</span><span class="text-primary">Fully Covered</span></div>
            <div class="flex justify-between font-semibold"><span>Data Lake Ingestion</span><span class="text-primary">+6% Surplus</span></div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
          <h3 class="font-display text-base font-bold text-on-surface">Internal Mobility Velocity</h3>
          <div class="p-4 rounded-xl bg-surface-container-low text-xs flex flex-col gap-2">
            <span class="font-bold text-on-surface">Average Time to Internal Placement: <strong class="text-primary">3.2 Days</strong></span>
            <span class="text-outline">vs External Recruiting Agency: 45 Days (-92.8% cycle time reduction)</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
