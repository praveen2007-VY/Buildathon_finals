// Employee Module: Step-by-Step Resume-to-Skill Pipeline Visualizer

import { processResumePipeline, store } from '../../data.js';

export function renderEmpResumePipelineView() {
  const currentEmp = store.employees.find(e => e.id === store.auth.user?.id) || store.employees[0];

  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <div>
        <h1 class="font-display text-2xl font-bold text-on-surface">Employee Resume Parsing & Skill Pipeline</h1>
        <p class="text-xs text-on-surface-variant">Step-by-step visual execution of the TalentPulse AI skill extraction, normalization, and continuous profile update engine.</p>
      </div>

      <!-- Pipeline Stepper Tracker Diagram -->
      <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-6">
        <h2 class="font-display text-base font-bold text-on-surface">Execution Workflow Pipeline</h2>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
          <!-- Step 1 -->
          <div class="p-3.5 rounded-xl bg-primary-fixed/30 border border-primary-container/40 flex flex-col items-center text-center gap-1.5">
            <span class="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</span>
            <span class="text-xs font-bold text-on-surface">Upload Resume</span>
            <span class="text-[10px] text-outline">PDF / DOCX File</span>
          </div>

          <!-- Step 2 -->
          <div class="p-3.5 rounded-xl bg-primary-fixed/30 border border-primary-container/40 flex flex-col items-center text-center gap-1.5">
            <span class="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">2</span>
            <span class="text-xs font-bold text-on-surface">Resume Parser</span>
            <span class="text-[10px] text-outline">Text Extraction</span>
          </div>

          <!-- Step 3 -->
          <div class="p-3.5 rounded-xl bg-primary-fixed/30 border border-primary-container/40 flex flex-col items-center text-center gap-1.5">
            <span class="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">3</span>
            <span class="text-xs font-bold text-on-surface">AI Skill Extractor</span>
            <span class="text-[10px] text-outline">Entity Mining</span>
          </div>

          <!-- Step 4 -->
          <div class="p-3.5 rounded-xl bg-primary-fixed/30 border border-primary-container/40 flex flex-col items-center text-center gap-1.5">
            <span class="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">4</span>
            <span class="text-xs font-bold text-on-surface">Skill Normalization</span>
            <span class="text-[10px] text-outline">Taxonomy Align</span>
          </div>

          <!-- Step 5 -->
          <div class="p-3.5 rounded-xl bg-secondary-fixed border border-secondary/40 flex flex-col items-center text-center gap-1.5 col-span-2 md:col-span-1">
            <span class="w-8 h-8 rounded-full bg-secondary text-white text-xs font-bold flex items-center justify-center">5</span>
            <span class="text-xs font-bold text-on-surface">Live Skill Profile</span>
            <span class="text-[10px] text-secondary font-semibold">Continuous Update</span>
          </div>
        </div>
      </div>

      <!-- Interactive Upload Dropzone & Processing Workspace -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div class="lg:col-span-6 flex flex-col gap-4">
          <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
            <h3 class="font-display text-base font-bold text-on-surface">Upload Resume File</h3>
            
            <div id="pipelineDropzone" class="border-2 border-dashed border-primary/40 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
              <input type="file" id="resumeFileInput" class="hidden" accept=".pdf,.docx,.txt"/>
              <span class="material-symbols-outlined text-4xl text-primary mb-2">cloud_upload</span>
              <span class="text-xs font-bold text-on-surface">Click or drag resume file here to run pipeline</span>
              <span class="text-[10px] text-outline mt-1">Simulates real-time AI skill extraction & profile update</span>
            </div>
          </div>
        </div>

        <!-- Extraction Output Results -->
        <div class="lg:col-span-6 flex flex-col gap-4">
          <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4" id="pipelineResultsArea">
            <h3 class="font-display text-base font-bold text-on-surface">Active Employee Skill Matrix</h3>
            
            <div class="flex flex-col gap-2">
              <span class="text-xs text-outline font-semibold">Verified Skills for ${currentEmp.name}:</span>
              <div class="flex flex-wrap gap-1.5">
                ${(currentEmp.skills || []).map(s => `
                  <span class="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center gap-1">
                    <span class="material-symbols-outlined text-xs">verified</span> ${s}
                  </span>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
