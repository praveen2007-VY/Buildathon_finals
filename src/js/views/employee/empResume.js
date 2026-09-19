// Employee Module: Resume View (Upload, View, Update)

export function renderEmpResumeView() {
  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <div>
        <h1 class="font-display text-2xl font-bold text-on-surface">My Career Resume</h1>
        <p class="text-xs text-on-surface-variant">Upload, view, and update your parsed resume artifact used by the AI Talent Graph.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Resume Actions & Upload Dropzone (5 Cols) -->
        <div class="lg:col-span-5 flex flex-col gap-4">
          <!-- Upload Box -->
          <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
            <h3 class="font-display text-base font-bold text-on-surface">Upload & Parse Resume</h3>
            
            <div id="resumeDropzone" class="border-2 border-dashed border-primary/40 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
              <span class="material-symbols-outlined text-4xl text-primary mb-2">cloud_upload</span>
              <span class="text-xs font-bold text-on-surface">Drag & drop your resume PDF / DOCX here</span>
              <span class="text-[10px] text-outline mt-1">Supports PDF, DOCX up to 10MB</span>
              <button class="mt-4 px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold shadow-xs">Browse Files</button>
            </div>

            <div class="p-3.5 rounded-xl bg-surface-container-low text-xs flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-lg">description</span>
                <div class="flex flex-col">
                  <span class="font-bold text-on-surface">Alex_Mercer_Resume_2024.pdf</span>
                  <span class="text-[10px] text-outline">Uploaded Oct 10, 2024 • 2.4 MB</span>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">Active</span>
            </div>
          </div>
        </div>

        <!-- Resume Live Preview (7 Cols) -->
        <div class="lg:col-span-7 flex flex-col gap-4">
          <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
            <div class="flex items-center justify-between border-b border-surface-container pb-4">
              <h3 class="font-display text-base font-bold text-on-surface">AI Parsed Resume View</h3>
              <button id="updateResumeBtn" class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-variant">
                <span class="material-symbols-outlined text-base">sync</span> Re-parse Skills
              </button>
            </div>

            <!-- Resume Content Summary -->
            <div class="p-6 bg-surface-container-low rounded-xl border border-surface-container flex flex-col gap-4 text-xs">
              <div class="border-b border-surface-container-high pb-4">
                <h4 class="font-display text-lg font-bold text-on-surface">Alex Mercer</h4>
                <p class="text-primary font-semibold">Principal Systems & Talent Analyst</p>
                <p class="text-outline text-[11px] mt-1">San Francisco, CA • alex.mercer@enterprise.ai • (555) 234-8901</p>
              </div>

              <div>
                <h5 class="font-bold text-on-surface uppercase text-[10px] tracking-wider mb-1">Executive Summary</h5>
                <p class="text-on-surface-variant leading-relaxed">
                  Principal Systems & Talent Analyst with 8+ years of expertise designing distributed data architectures, machine learning orchestration pipelines, and predictive workforce analytics platforms.
                </p>
              </div>

              <div>
                <h5 class="font-bold text-on-surface uppercase text-[10px] tracking-wider mb-2">Parsed Skills Extracted by AI</h5>
                <div class="flex flex-wrap gap-1.5">
                  <span class="px-2.5 py-1 rounded bg-white text-on-surface font-semibold shadow-xs">Python</span>
                  <span class="px-2.5 py-1 rounded bg-white text-on-surface font-semibold shadow-xs">SQL & Snowflake</span>
                  <span class="px-2.5 py-1 rounded bg-white text-on-surface font-semibold shadow-xs">Prompt Engineering</span>
                  <span class="px-2.5 py-1 rounded bg-white text-on-surface font-semibold shadow-xs">RAG Architecture</span>
                  <span class="px-2.5 py-1 rounded bg-white text-on-surface font-semibold shadow-xs">Kubernetes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
