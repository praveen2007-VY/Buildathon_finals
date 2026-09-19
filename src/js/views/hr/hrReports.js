// HR Module: Reports Generator View

export function renderHrReportsView() {
  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <div>
        <h1 class="font-display text-2xl font-bold text-on-surface">Reports & Export Center</h1>
        <p class="text-xs text-on-surface-variant">Generate executive PDF board reports, export skill matrix CSV datasets, or schedule automated audits.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between gap-4">
          <div>
            <h3 class="font-display text-base font-bold text-on-surface">Q3 Executive Board Report</h3>
            <p class="text-xs text-on-surface-variant mt-1">Full breakdown of internal mobility savings ($2.4M), succession strength, and skill coverage.</p>
          </div>
          <button id="genPdfReportBtn" class="px-4 py-2.5 rounded-lg bg-primary text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-base">picture_as_pdf</span> Generate Board PDF
          </button>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col justify-between gap-4">
          <div>
            <h3 class="font-display text-base font-bold text-on-surface">Workforce Skill Taxonomy Export</h3>
            <p class="text-xs text-on-surface-variant mt-1">Export complete 1,240 skill telemetry matrix as structured CSV for external BI platforms.</p>
          </div>
          <button id="genCsvExportBtn" class="px-4 py-2.5 rounded-lg bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-variant flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-base">csv</span> Export Skill CSV
          </button>
        </div>
      </div>
    </div>
  `;
}
