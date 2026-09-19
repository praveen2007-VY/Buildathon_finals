// Employee Module: Step-by-Step Resume-to-Skill Pipeline Visualizer with Supabase Integration
import { store } from '../../data.js';
import { 
  uploadResumeToSupabase, 
  fetchEmployeeResume, 
  validateResumeFile, 
  formatBytes,
  resolveEmployeeId,
  DEFAULT_EMPLOYEE_ID
} from '../../../services/resumeService.js';
import { showToast } from '../../components/modals.js';

export function renderEmpResumePipelineView() {
  const currentEmpId = resolveEmployeeId(store.auth?.user?.id);
  const currentEmp = store.employees.find(e => e.id === currentEmpId) || store.employees[0] || { name: 'Alex Mercer', skills: [] };

  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in" id="resumePipelineContainer">
      <div>
        <h1 class="font-display text-2xl font-bold text-on-surface">Employee Resume Parsing & Skill Pipeline</h1>
        <p class="text-xs text-on-surface-variant">Step-by-step visual execution of the TalentPulse AI skill extraction, normalization, and continuous profile update engine.</p>
      </div>

      <!-- Pipeline Stepper Tracker Diagram -->
      <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-6">
        <h2 class="font-display text-base font-bold text-on-surface">Execution Workflow Pipeline</h2>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-3" id="pipelineStepsTracker">
          <!-- Step 1 -->
          <div id="stepCard1" class="p-3.5 rounded-xl bg-primary-fixed/30 border border-primary-container/40 flex flex-col items-center text-center gap-1.5 transition-all">
            <span id="stepBadge1" class="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</span>
            <span class="text-xs font-bold text-on-surface">Upload Resume</span>
            <span id="stepStatus1" class="text-[10px] text-outline">PDF / DOCX File</span>
          </div>

          <!-- Step 2 -->
          <div id="stepCard2" class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex flex-col items-center text-center gap-1.5 transition-all">
            <span id="stepBadge2" class="w-8 h-8 rounded-full bg-surface-container-high text-on-surface text-xs font-bold flex items-center justify-center">2</span>
            <span class="text-xs font-bold text-on-surface">Resume Parser</span>
            <span id="stepStatus2" class="text-[10px] text-outline">Text Extraction</span>
          </div>

          <!-- Step 3 -->
          <div id="stepCard3" class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex flex-col items-center text-center gap-1.5 transition-all">
            <span id="stepBadge3" class="w-8 h-8 rounded-full bg-surface-container-high text-on-surface text-xs font-bold flex items-center justify-center">3</span>
            <span class="text-xs font-bold text-on-surface">AI Skill Extractor</span>
            <span id="stepStatus3" class="text-[10px] text-outline">Entity Mining</span>
          </div>

          <!-- Step 4 -->
          <div id="stepCard4" class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex flex-col items-center text-center gap-1.5 transition-all">
            <span id="stepBadge4" class="w-8 h-8 rounded-full bg-surface-container-high text-on-surface text-xs font-bold flex items-center justify-center">4</span>
            <span class="text-xs font-bold text-on-surface">Skill Normalization</span>
            <span id="stepStatus4" class="text-[10px] text-outline">Taxonomy Align</span>
          </div>

          <!-- Step 5 -->
          <div id="stepCard5" class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex flex-col items-center text-center gap-1.5 col-span-2 md:col-span-1 transition-all">
            <span id="stepBadge5" class="w-8 h-8 rounded-full bg-surface-container-high text-on-surface text-xs font-bold flex items-center justify-center">5</span>
            <span class="text-xs font-bold text-on-surface">Live Skill Profile</span>
            <span id="stepStatus5" class="text-[10px] text-outline font-semibold">Continuous Update</span>
          </div>
        </div>
      </div>

      <!-- Interactive Upload Dropzone & Processing Workspace -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div class="lg:col-span-6 flex flex-col gap-4">
          <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <h3 class="font-display text-base font-bold text-on-surface">Upload Resume File</h3>
              <span class="text-[10px] uppercase font-semibold text-outline tracking-wider">Employee ID: <strong class="text-primary">${currentEmpId}</strong></span>
            </div>
            
            <!-- Dropzone Container -->
            <div 
              id="pipelineDropzone" 
              class="relative border-2 border-dashed border-primary/40 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer min-h-[220px]"
            >
              <input type="file" id="resumeFileInput" class="hidden" accept=".pdf,.doc,.docx" />
              
              <!-- Inner Dynamic Dropzone State -->
              <div id="dropzoneContent" class="flex flex-col items-center justify-center text-center w-full">
                <span class="material-symbols-outlined text-4xl text-primary mb-2">cloud_upload</span>
                <span class="text-xs font-bold text-on-surface">Click or drag resume file here to run pipeline</span>
                <span class="text-[10px] text-outline mt-1">Supported formats: PDF, DOC, DOCX (Max: 10 MB)</span>
              </div>
            </div>

            <!-- Error / Validation Alert Banner -->
            <div id="resumeErrorAlert" class="hidden p-3 rounded-xl bg-error-container/40 border border-error-container text-error text-xs flex items-center gap-2">
              <span class="material-symbols-outlined text-base shrink-0">error</span>
              <span id="resumeErrorMessage">Invalid file type.</span>
            </div>
          </div>
        </div>

        <!-- Extraction Output Results: Active Employee Skill Matrix -->
        <div class="lg:col-span-6 flex flex-col gap-4">
          <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4" id="pipelineResultsArea">
            <div class="flex items-center justify-between">
              <h3 class="font-display text-base font-bold text-on-surface">Active Employee Skill Matrix</h3>
              <span class="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">Verified</span>
            </div>
            
            <div class="flex flex-col gap-2">
              <span class="text-xs text-outline font-semibold">Verified Skills for ${currentEmp.name}:</span>
              <div class="flex flex-wrap gap-1.5">
                ${(currentEmp.skills || []).map(s => `
                  <span class="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center gap-1.5 border border-primary/20">
                    <span class="material-symbols-outlined text-sm">verified</span> ${s}
                  </span>
                `).join('')}
              </div>
            </div>

            <!-- Metadata Info card -->
            <div id="resumeMetadataCard" class="hidden mt-2 p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-1.5 text-xs">
              <span class="text-[10px] uppercase tracking-wider text-outline font-semibold">Current Stored Resume</span>
              <div class="flex items-center justify-between">
                <span class="font-bold text-on-surface truncate" id="metaFileName">-</span>
                <span class="text-outline text-[11px]" id="metaFileSize">-</span>
              </div>
              <div class="flex items-center justify-between text-[10px] text-outline pt-1 border-t border-surface-container/60">
                <span id="metaStoragePath" class="truncate font-mono">resumes/EMP001/...</span>
                <span id="metaUploadedAt">-</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Controller logic for Resume Upload & Supabase sync
export async function initResumePipelineEvents() {
  const container = document.getElementById('resumePipelineContainer');
  if (!container) return;

  const dropzone = document.getElementById('pipelineDropzone');
  const fileInput = document.getElementById('resumeFileInput');
  const dropzoneContent = document.getElementById('dropzoneContent');
  const errorAlert = document.getElementById('resumeErrorAlert');
  const errorMessage = document.getElementById('resumeErrorMessage');
  const metadataCard = document.getElementById('resumeMetadataCard');
  const metaFileName = document.getElementById('metaFileName');
  const metaFileSize = document.getElementById('metaFileSize');
  const metaStoragePath = document.getElementById('metaStoragePath');
  const metaUploadedAt = document.getElementById('metaUploadedAt');

  // Stepper Elements
  const stepCard1 = document.getElementById('stepCard1');
  const stepBadge1 = document.getElementById('stepBadge1');
  const stepStatus1 = document.getElementById('stepStatus1');
  const stepCard2 = document.getElementById('stepCard2');
  const stepBadge2 = document.getElementById('stepBadge2');
  const stepStatus2 = document.getElementById('stepStatus2');

  // Centralized Employee ID (guaranteed EMP001, matching AI Career Assistant)
  const employeeId = resolveEmployeeId(store.auth?.user?.id);

  // Helper to show/hide error
  const showError = (msg) => {
    if (!errorAlert || !errorMessage) return;
    if (msg) {
      errorMessage.textContent = msg;
      errorAlert.classList.remove('hidden');
    } else {
      errorAlert.classList.add('hidden');
    }
  };

  // Helper to update pipeline visual steps
  const updatePipelineSteps = (isUploaded) => {
    if (isUploaded) {
      // Step 1: Upload Resume -> completed
      if (stepCard1 && stepBadge1 && stepStatus1) {
        stepCard1.className = "p-3.5 rounded-xl bg-primary-fixed/50 border border-primary-container flex flex-col items-center text-center gap-1.5 transition-all";
        stepBadge1.className = "w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-xs";
        stepBadge1.innerHTML = '<span class="material-symbols-outlined text-sm">check</span>';
        stepStatus1.textContent = "Completed";
        stepStatus1.className = "text-[10px] text-primary font-bold";
      }

      // Step 2: Resume Parser -> ready / processing
      if (stepCard2 && stepBadge2 && stepStatus2) {
        stepCard2.className = "p-3.5 rounded-xl bg-primary-fixed/30 border border-primary-container/40 ring-2 ring-primary/20 flex flex-col items-center text-center gap-1.5 transition-all";
        stepBadge2.className = "w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center animate-pulse";
        stepStatus2.textContent = "Ready for Next Stage";
        stepStatus2.className = "text-[10px] text-primary font-semibold";
      }
    } else {
      // Reset steps
      if (stepCard1 && stepBadge1 && stepStatus1) {
        stepCard1.className = "p-3.5 rounded-xl bg-primary-fixed/30 border border-primary-container/40 flex flex-col items-center text-center gap-1.5 transition-all";
        stepBadge1.className = "w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center";
        stepBadge1.textContent = "1";
        stepStatus1.textContent = "PDF / DOCX File";
        stepStatus1.className = "text-[10px] text-outline";
      }
      if (stepCard2 && stepBadge2 && stepStatus2) {
        stepCard2.className = "p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex flex-col items-center text-center gap-1.5 transition-all";
        stepBadge2.className = "w-8 h-8 rounded-full bg-surface-container-high text-on-surface text-xs font-bold flex items-center justify-center";
        stepStatus2.textContent = "Text Extraction";
        stepStatus2.className = "text-[10px] text-outline";
      }
    }
  };

  // Render UI dropzone states
  const renderDropzoneDefault = () => {
    if (!dropzoneContent) return;
    dropzoneContent.innerHTML = `
      <span class="material-symbols-outlined text-4xl text-primary mb-2">cloud_upload</span>
      <span class="text-xs font-bold text-on-surface">Click or drag resume file here to run pipeline</span>
      <span class="text-[10px] text-outline mt-1">Supported formats: PDF, DOC, DOCX (Max: 10 MB)</span>
    `;
  };

  const renderDropzoneUploading = (fileName, fileSizeStr) => {
    if (!dropzoneContent) return;
    dropzoneContent.innerHTML = `
      <div class="relative flex items-center justify-center mb-3">
        <span class="material-symbols-outlined text-4xl text-primary animate-spin">sync</span>
      </div>
      <span class="text-xs font-bold text-on-surface">Uploading resume...</span>
      <span class="text-[11px] text-primary font-semibold mt-1">${fileName} (${fileSizeStr})</span>
      <span class="text-[10px] text-outline mt-0.5">Uploading securely to Supabase Storage (resumes)</span>
    `;
  };

  const renderDropzoneSuccess = (fileName, fileSize, uploadDate) => {
    if (!dropzoneContent) return;
    const sizeStr = formatBytes(fileSize);
    dropzoneContent.innerHTML = `
      <span class="material-symbols-outlined text-4xl text-primary mb-2">task_alt</span>
      <span class="text-xs font-bold text-on-surface">Resume uploaded successfully</span>
      
      <div class="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-xl bg-white border border-surface-container shadow-2xs">
        <span class="material-symbols-outlined text-base text-primary">description</span>
        <span class="text-xs font-semibold text-on-surface truncate max-w-[200px]">${fileName}</span>
        <span class="text-[10px] text-outline font-medium">(${sizeStr})</span>
      </div>

      <div class="flex items-center gap-2 mt-3">
        <span class="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">
          Active in Supabase
        </span>
        <button 
          id="replaceResumeBtn" 
          type="button" 
          class="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-low transition-all shadow-xs hover:border-primary/40"
        >
          <span class="material-symbols-outlined text-sm text-primary">published_with_changes</span>
          <span>Replace Resume</span>
        </button>
      </div>
    `;

    // Show metadata card in right column
    if (metadataCard) {
      metadataCard.classList.remove('hidden');
      if (metaFileName) metaFileName.textContent = fileName;
      if (metaFileSize) metaFileSize.textContent = sizeStr;
      if (metaStoragePath) metaStoragePath.textContent = `resumes/${employeeId}/${fileName}`;
      if (metaUploadedAt) {
        const d = uploadDate ? new Date(uploadDate) : new Date();
        metaUploadedAt.textContent = d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    }

    // Bind replace resume button
    document.getElementById('replaceResumeBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput?.click();
    });
  };

  const renderDropzoneFailed = (errMsg) => {
    if (!dropzoneContent) return;
    dropzoneContent.innerHTML = `
      <span class="material-symbols-outlined text-4xl text-error mb-2">error</span>
      <span class="text-xs font-bold text-on-surface">Resume upload failed. Please try again.</span>
      <span class="text-[10px] text-error mt-1">${errMsg || 'Connection error with Supabase.'}</span>
      <button 
        id="retryUploadBtn" 
        type="button" 
        class="mt-3 px-3 py-1.5 rounded-lg bg-white border border-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-low transition-all shadow-xs"
      >
        Select File Again
      </button>
    `;

    document.getElementById('retryUploadBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput?.click();
    });
  };

  // 1. Initial Load: Check if employee already has a resume in employee_resumes
  try {
    const existing = await fetchEmployeeResume(employeeId);
    if (existing.success && existing.resume?.file_name) {
      renderDropzoneSuccess(
        existing.resume.file_name, 
        existing.resume.file_size, 
        existing.resume.uploaded_at
      );
      updatePipelineSteps(true);
    } else {
      renderDropzoneDefault();
      updatePipelineSteps(false);
    }
  } catch (err) {
    console.warn('Could not query existing resume on initial load:', err);
    renderDropzoneDefault();
  }

  // 2. Click to open file picker
  dropzone?.addEventListener('click', (e) => {
    if (e.target.closest('#replaceResumeBtn') || e.target.closest('#retryUploadBtn')) return;
    fileInput?.click();
  });

  // 3. Drag and drop interactions
  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone?.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('border-primary', 'bg-primary/15');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone?.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('border-primary', 'bg-primary/15');
    });
  });

  dropzone?.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const file = dt?.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  });

  // 4. File input change
  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  });

  // 5. File Upload Handler
  async function handleFileUpload(file) {
    showError(null);

    // Validation
    const validation = validateResumeFile(file);
    if (!validation.valid) {
      showError(validation.message);
      showToast(validation.message, 'warning');
      return;
    }

    // Requirement: Before uploading, log: Resume upload employee ID: EMP001
    console.log(`Resume upload employee ID: ${employeeId}`);

    const fileSizeStr = formatBytes(file.size);
    renderDropzoneUploading(file.name, fileSizeStr);

    try {
      const result = await uploadResumeToSupabase(file, employeeId);

      if (result.success && result.resume) {
        renderDropzoneSuccess(result.resume.file_name, result.resume.file_size, result.resume.uploaded_at);
        updatePipelineSteps(true);
        showToast(`Resume "${file.name}" uploaded to Supabase Storage & recorded!`, 'success');
      } else {
        const errorMsg = result.error || 'Resume upload failed. Please try again.';
        renderDropzoneFailed(errorMsg);
        showError(errorMsg);
        showToast(errorMsg, 'error');
        updatePipelineSteps(false);
      }
    } catch (err) {
      console.error('Fatal upload error:', err);
      const errorMsg = 'Resume upload failed. Please try again.';
      renderDropzoneFailed(errorMsg);
      showError(errorMsg);
      showToast(errorMsg, 'error');
      updatePipelineSteps(false);
    } finally {
      // Clear file input so re-selecting same file triggers change event
      if (fileInput) fileInput.value = '';
    }
  }
}
