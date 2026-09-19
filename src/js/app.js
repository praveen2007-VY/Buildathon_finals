// Master Router & Event Controller - Supporting Login, HR AI Gap Analysis, n8n Integration & Supabase Realtime

import { store, loginUser, logoutUser, addJobRole, addEmployee, analyzeEmployeeGap, processResumePipeline, triggerN8nWebhook, loadSupabaseData } from './data.js';
import { subscribeToEmployeeChanges } from './services/supabaseService.js';
import { renderSidebar } from './components/sidebar.js';
import { renderHeader } from './components/header.js';
import { renderSearchModal, renderAiDrawerModal, showToast } from './components/modals.js';

// Login View
import { renderLoginView } from './views/loginView.js';

// Employee Module Views
import { renderOverviewView } from './views/overview.js';
import { renderEmpProfileView } from './views/employee/empProfile.js';
import { renderEmpResumePipelineView, initResumePipelineEvents } from './views/employee/empResumePipelineView.js';
import { renderEmpProfileView, initEmpProfileEvents } from './views/employee/empProfile.js';
import { renderEmpResumePipelineView } from './views/employee/empResumePipelineView.js';
import { renderAiSkillProfileView } from './views/aiSkillProfile.js';
import { renderEmpOpportunitiesView } from './views/employee/empOpportunities.js';
import { renderEmpSkillGapView, initEmpSkillGapEvents } from './views/employee/empSkillGap.js';
import { renderEmpLearningView } from './views/employee/empLearning.js';
import { renderAiCareerAssistantView, initAiCareerAssistantEvents } from './views/aiCareerAssistant.js';
import { renderEmpFeedbackView } from './views/employee/empFeedback.js';
import { renderEmpSettingsView } from './views/employee/empSettings.js';

// HR / Admin Module Views
import { renderHrDashboardView } from './views/hrDashboard.js';
import { renderHrEmployeeManagementView } from './views/hr/hrEmployeeManagement.js';
import { 
  renderHrAnalyzeView, 
  renderMultiAnalysisResultCards,
  renderN8nAnalysisReport,
  renderEmployeeChecklistItems
} from './views/hr/hrAnalyzeView.js';
import { 
  fetchRawEmployeesFromSupabase, 
  getCachedRawEmployees, 
  buildHrAnalysisPayload, 
  sendHrAnalysisToN8n 
} from '../services/hrAnalysisService.js';
import { renderHrRecruitmentView } from './views/hr/hrRecruitment.js';
import { renderHrLearningDevelopmentView } from './views/hr/hrLearningDevelopment.js';
import { renderHrPerformanceView } from './views/hr/hrPerformance.js';
import { renderHrAnalyticsView } from './views/hr/hrAnalytics.js';
import { renderHrReportsView } from './views/hr/hrReports.js';
import { renderHrSettingsView } from './views/hr/hrSettings.js';
import { renderTalentDiscoveryView } from './views/talentDiscovery.js';

class TalentPulseApp {
  constructor() {
    this.appContainer = document.getElementById('app');
    this.modalContainer = document.getElementById('modalContainer');
    
    // Parse route
    const hash = window.location.hash.slice(2);
    this.currentPath = hash || 'login';
    this.currentModule = store.auth?.role || (this.currentPath.startsWith('hr/') ? 'hr' : 'employee');

    this.currentAnalysis = null;
    this.hrDeptFilter = 'all';
    this.hrLocFilter = 'all';

    this.init();
  }

  async init() {
    // Render Modals into DOM
    this.modalContainer.innerHTML = renderSearchModal() + renderAiDrawerModal();

    // Fetch live Supabase employees in background for HR views
    this.loadSupabaseEmployees();

    // Initial render
    this.render();

    // Subscribe to real-time database changes from Supabase
    subscribeToEmployeeChanges(async (payload) => {
      console.log('Database change detected, refreshing dataset from Supabase...');
      await loadSupabaseData();
      this.render();
      showToast('Live database record updated from Supabase', 'info');
    });

    // Hash change listener
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(2);
      this.currentPath = hash || 'login';
      if (this.currentPath.startsWith('hr/')) {
        this.currentModule = 'hr';
      } else if (this.currentPath.startsWith('employee/')) {
        this.currentModule = 'employee';
      }
      this.render();
      if (this.currentPath === 'hr/analyze' || this.currentPath === 'hr/talent-management') {
        this.loadSupabaseEmployees();
      }
      window.scrollTo(0, 0);
    });

    // Global events
    this.setupGlobalEvents();
  }

  async loadSupabaseEmployees() {
    try {
      const emps = await fetchRawEmployeesFromSupabase();
      if (emps && emps.length > 0) {
        this.updateHrAnalyzePersonnel(emps);
      }
    } catch (e) {
      console.error('Could not load Supabase raw employees:', e);
    }
  }

  updateHrAnalyzePersonnel(emps) {
    const container = document.getElementById('empChecklistContainer');
    if (container) {
      container.innerHTML = renderEmployeeChecklistItems(emps);
    }
    const title = document.getElementById('databasePersonnelTitle');
    if (title) {
      title.textContent = `Database Personnel (${emps.length})`;
    }
    const badge = document.getElementById('personnelConnectedBadge');
    if (badge) {
      badge.innerHTML = `
        <span class="material-symbols-outlined text-sm">database</span> 
        <span>${emps.length} Personnel Connected</span>
      `;
    }
  }

  render() {
    // Render Login Page if route is 'login'
    if (this.currentPath === 'login') {
      this.appContainer.innerHTML = renderLoginView();
      this.bindLoginEvents();
      return;
    }

    // Determine active view content
    let viewContent = '';

    if (this.currentModule === 'employee') {
      switch (this.currentPath) {
        case 'employee/dashboard':
        case 'overview':
          viewContent = renderOverviewView();
          break;
        case 'employee/profile':
        case 'my-profile':
          viewContent = renderEmpProfileView();
          break;
        case 'employee/resume':
        case 'my-resume':
          viewContent = renderEmpResumePipelineView();
          break;
        case 'employee/ai-skill-profile':
        case 'ai-skill-profile':
          viewContent = renderAiSkillProfileView();
          break;
        case 'employee/opportunities':
        case 'internal-opportunities':
          viewContent = renderEmpOpportunitiesView();
          break;
        case 'employee/skill-gap':
        case 'skill-gap-analysis':
          viewContent = renderEmpSkillGapView();
          break;
        case 'employee/learning':
        case 'learning':
          viewContent = renderEmpLearningView();
          break;
        case 'employee/ai-career-assistant':
        case 'ai-career-assistant':
          viewContent = renderAiCareerAssistantView();
          break;
        case 'employee/feedback':
          viewContent = renderEmpFeedbackView();
          break;
        case 'employee/settings':
          viewContent = renderEmpSettingsView();
          break;
        default:
          viewContent = renderOverviewView();
          break;
      }
    } else {
      // HR / Admin Module
      switch (this.currentPath) {
        case 'hr/dashboard':
        case 'hr-dashboard':
          viewContent = renderHrDashboardView(this.hrDeptFilter, this.hrLocFilter);
          break;
        case 'hr/employee-management':
          viewContent = renderHrEmployeeManagementView();
          break;
        case 'hr/talent-management':
        case 'hr/analyze':
          viewContent = renderHrAnalyzeView();
          break;
        case 'hr/recruitment':
        case 'role-matching':
          viewContent = renderHrRecruitmentView();
          break;
        case 'hr/learning-development':
          viewContent = renderHrLearningDevelopmentView();
          break;
        case 'hr/performance':
        case 'performance':
          viewContent = renderHrPerformanceView();
          break;
        case 'hr/analytics':
        case 'workforce-analytics':
          viewContent = renderHrAnalyticsView();
          break;
        case 'hr/reports':
          viewContent = renderHrReportsView();
          break;
        case 'hr/settings':
          viewContent = renderHrSettingsView();
          break;
        default:
          viewContent = renderHrDashboardView(this.hrDeptFilter, this.hrLocFilter);
          break;
      }
    }

    // Assemble persistent App Shell
    this.appContainer.innerHTML = `
      ${renderSidebar(this.currentPath, this.currentModule)}
      <div class="pl-60">
        ${renderHeader(this.currentModule)}
        <main class="relative pt-20 bg-surface min-h-screen px-6 py-6 w-full max-w-[1680px] mx-auto">
          ${viewContent}
        </main>
      </div>
    `;

    // Re-bind view events
    this.bindViewEvents();
  }

  bindLoginEvents() {
    const loginEmpBtn = document.getElementById('loginAsEmployeeBtn');
    const loginHrBtn = document.getElementById('loginAsHrBtn');
    const empSelect = document.getElementById('empLoginSelect');

    if (empSelect) {
      empSelect.addEventListener('change', () => {
        const selectedId = empSelect.value;
        const selectedEmp = store.employees.find(e => e.id === selectedId);
        const emailInput = document.getElementById('empEmailInput');
        if (selectedEmp && emailInput) {
          emailInput.value = selectedEmp.email;
        }
      });
    }

    if (loginEmpBtn) {
      loginEmpBtn.addEventListener('click', () => {
        const empSelect = document.getElementById('empLoginSelect');
        const selectedId = empSelect?.value || 'EMP001';
        const selectedEmp = store.employees.find(e => e.id === selectedId) || store.employees[0];
        const email = document.getElementById('empEmailInput')?.value || selectedEmp?.email;

        loginUser('employee', selectedEmp?.name, email);
        if (store.auth.user && selectedEmp) {
          store.auth.user.id = selectedEmp.id || 'EMP001';
          store.auth.user.role = selectedEmp.role;
          store.auth.user.department = selectedEmp.department;
        }

        this.currentModule = 'employee';
        window.location.hash = '#/employee/dashboard';
        showToast(`Logged in as Employee (${selectedEmp?.name}) from Supabase`, 'success');
      });
    }

    if (loginHrBtn) {
      loginHrBtn.addEventListener('click', () => {
        const name = document.getElementById('hrNameInput')?.value || 'Dr. Priya Patel (HR Lead)';
        loginUser('hr', name, 'hr@enterprise.ai');
        this.currentModule = 'hr';
        window.location.hash = '#/hr/analyze';
        showToast(`Logged in to HR Intelligence OS (${name})`, 'success');
      });
    }
  }

  setupGlobalEvents() {
    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggleSearchModal(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        this.toggleAiDrawer(true);
      }
      if (e.key === 'Escape') {
        this.toggleSearchModal(false);
        this.toggleAiDrawer(false);
      }
    });

    // Header Module Switcher
    document.addEventListener('click', (e) => {
      if (e.target.closest('#switchToEmployeeBtn')) {
        this.currentModule = 'employee';
        window.location.hash = '#/employee/dashboard';
        showToast('Switched to Employee Portal', 'info');
      }
      if (e.target.closest('#switchToHrBtn')) {
        this.currentModule = 'hr';
        window.location.hash = '#/hr/analyze';
        showToast('Switched to HR / Admin Intelligence OS', 'info');
      }
      if (e.target.closest('#userProfileBtn')) {
        window.location.hash = '#/login';
        showToast('Navigated to Login Portal', 'info');
      }
    });
  }

  toggleSearchModal(show) {
    const modal = document.getElementById('searchModal');
    if (!modal) return;
    if (show) modal.classList.remove('hidden');
    else modal.classList.add('hidden');
  }

  toggleAiDrawer(show) {
    const drawer = document.getElementById('aiDrawerModal');
    if (!drawer) return;
    if (show) drawer.classList.remove('translate-x-full');
    else drawer.classList.add('translate-x-full');
  }

  bindViewEvents() {
    // HR Dashboard Filter dropdowns
    const hrDeptSelect = document.getElementById('hrDeptFilterSelect');
    const hrLocSelect = document.getElementById('hrLocFilterSelect');

    if (hrDeptSelect) {
      hrDeptSelect.addEventListener('change', (e) => {
        this.hrDeptFilter = e.target.value;
        this.render();
        showToast(`Filtered HR Dashboard by Department: ${this.hrDeptFilter}`, 'info');
      });
    }

    if (hrLocSelect) {
      hrLocSelect.addEventListener('change', (e) => {
        this.hrLocFilter = e.target.value;
        this.render();
        showToast(`Filtered HR Dashboard by Location: ${this.hrLocFilter}`, 'info');
      });
    }

    // 1. HR Create Job Post Form
    const roleForm = document.getElementById('hrAddRoleForm');
    if (roleForm) {
      roleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('roleTitleInput')?.value;
        const dept = document.getElementById('roleDeptInput')?.value;
        const skills = document.getElementById('roleSkillsInput')?.value;
        const band = document.getElementById('roleBandInput')?.value;
        const comp = document.getElementById('roleCompInput')?.value;

        if (title && skills) {
          const newRole = addJobRole(title, dept, skills, band, comp, 'Hybrid');
          showToast(`Job Post "${newRole.title}" created successfully!`, 'success');
          this.render();
        }
      });
    }

    // 2. Select All Employees Toggle
    const selectAllBtn = document.getElementById('selectAllEmpsBtn');
    if (selectAllBtn) {
      selectAllBtn.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.emp-select-checkbox');
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        checkboxes.forEach(cb => cb.checked = !allChecked);
        showToast(allChecked ? 'Deselected all employees' : 'Selected all database employees', 'info');
      });
    }

    // Target Job Post Selector change listener (syncs form fields)
    const selectRoleEl = document.getElementById('selectRoleAnalysis');
    if (selectRoleEl) {
      selectRoleEl.addEventListener('change', () => {
        const found = store.jobRoles.find(r => r.id === selectRoleEl.value);
        if (found) {
          const titleInput = document.getElementById('roleTitleInput');
          const deptInput = document.getElementById('roleDeptInput');
          const skillsInput = document.getElementById('roleSkillsInput');
          const bandInput = document.getElementById('roleBandInput');
          const compInput = document.getElementById('roleCompInput');

          if (titleInput) titleInput.value = found.title || '';
          if (deptInput) deptInput.value = found.department || '';
          if (skillsInput) skillsInput.value = Array.isArray(found.skills) ? found.skills.join(', ') : (found.skills || '');
          if (bandInput) bandInput.value = found.band || 'L6 (Staff)';
          if (compInput) compInput.value = found.compensation || '$185k - $225k';
        }
      });
    }

    // 3. HR Run Multi-Employee AI Skill Gap Analysis & Skill Assignment with n8n
    const runAnalysisBtn = document.getElementById('runAnalysisBtn');
    if (runAnalysisBtn) {
      runAnalysisBtn.addEventListener('click', async () => {
        // Step 1: Read input values
        let jobRoleTitle = document.getElementById('roleTitleInput')?.value?.trim();
        let department = document.getElementById('roleDeptInput')?.value?.trim();
        let requiredSkills = document.getElementById('roleSkillsInput')?.value?.trim();
        const bandLevel = document.getElementById('roleBandInput')?.value?.trim() || 'L5';
        const compensationRange = document.getElementById('roleCompInput')?.value?.trim() || '';

        // If inputs were empty, fallback to currently selected target role in dropdown
        const roleId = document.getElementById('selectRoleAnalysis')?.value;
        const targetRole = store.jobRoles.find(r => r.id === roleId);
        if (!jobRoleTitle && targetRole) jobRoleTitle = targetRole.title;
        if (!department && targetRole) department = targetRole.department;
        if (!requiredSkills && targetRole) {
          requiredSkills = Array.isArray(targetRole.skills) ? targetRole.skills.join(', ') : targetRole.skills;
        }

        // STEP 1 — VALIDATE INPUT
        if (!jobRoleTitle) {
          showToast('Job Role Title must not be empty.', 'warning');
          return;
        }
        if (!department) {
          showToast('Department must not be empty.', 'warning');
          return;
        }
        if (!requiredSkills) {
          showToast('Required Skills must not be empty.', 'warning');
          return;
        }

        const checkedCbs = document.querySelectorAll('.emp-select-checkbox:checked');
        const selectedEmpIds = Array.from(checkedCbs).map(cb => cb.value);

        if (selectedEmpIds.length === 0) {
          showToast('At least one employee must be selected.', 'warning');
          return;
        }

        // Retrieve the complete selected Supabase records
        const cachedEmps = getCachedRawEmployees();
        const selectedEmployees = selectedEmpIds.map(id => {
          const found = cachedEmps.find(e => (e.Employee_ID === id || e.id === id));
          return found || { Employee_ID: id };
        });

        // STEP 2 — BUILD EXACT JSON PAYLOAD
        const payload = buildHrAnalysisPayload({
          jobRoleTitle,
          department,
          requiredSkills,
          bandLevel,
          compensationRange
        }, selectedEmployees);

        // STEP 4 — LOADING STATE
        const originalBtnHtml = runAnalysisBtn.innerHTML;
        runAnalysisBtn.disabled = true;
        runAnalysisBtn.innerHTML = `
          <span class="material-symbols-outlined text-base animate-spin">sync</span>
          <span>Analyzing Employees...</span>
        `;

        try {
          // STEP 3 — POST TO N8N
          const result = await sendHrAnalysisToN8n(payload);

          const container = document.getElementById('analysisResultContainer');

          if (result.success && result.report) {
            // STEP 6 — DISPLAY FINAL REPORT
            if (container) {
              container.innerHTML = renderN8nAnalysisReport(result.report, payload.job);
              container.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            showToast(`AI Analysis complete! ${payload.selected_employee_count} employees evaluated by n8n.`, 'success');
          } else if (result.empty || (result.error && result.error.includes('No analysis report'))) {
            // STEP 7 — ERROR HANDLING: No report
            showToast('No analysis report was returned from the AI workflow.', 'warning');
            if (container) {
              container.innerHTML = `
                <div class="bg-white p-6 rounded-2xl border border-warning/30 bg-warning/5 flex items-start gap-3">
                  <span class="material-symbols-outlined text-warning text-xl">info</span>
                  <div class="flex flex-col text-xs text-on-surface">
                    <span class="font-bold">No Analysis Report Returned</span>
                    <p class="text-on-surface-variant mt-1">No analysis report was returned from the AI workflow. Please ensure your n8n workflow returns a report object.</p>
                  </div>
                </div>
              `;
            }
          } else {
            // STEP 7 — ERROR HANDLING: Request failure
            showToast('AI analysis failed. Please try again.', 'error');
            if (container) {
              container.innerHTML = `
                <div class="bg-white p-6 rounded-2xl border border-error/30 bg-error/5 flex items-start gap-3">
                  <span class="material-symbols-outlined text-error text-xl">error</span>
                  <div class="flex flex-col text-xs text-on-surface">
                    <span class="font-bold">AI Analysis Failed</span>
                    <p class="text-on-surface-variant mt-1">Could not complete AI analysis via n8n. Please check your n8n workflow and webhook status.</p>
                  </div>
                </div>
              `;
            }
          }
        } catch (err) {
          console.error('Fatal error during HR analysis execution:', err);
          showToast('AI analysis failed. Please try again.', 'error');
        } finally {
          runAnalysisBtn.disabled = false;
          runAnalysisBtn.innerHTML = originalBtnHtml;
        }
      });
    }

    // 4. Employee Resume Upload Pipeline (Supabase Storage & Database Sync)
    if (this.currentPath.includes('resume')) {
      initResumePipelineEvents();
    }

    // 5. AI Career Assistant Interactive Events
    if (this.currentPath.includes('ai-career-assistant')) {
      initAiCareerAssistantEvents();
    }

    // 6. Employee Profile View Sub-Tabs & Switcher
    if (this.currentPath.includes('profile')) {
      initEmpProfileEvents(() => {
        this.render();
      });
    }

    // 7. Employee Skill Gap Analysis Events
    if (this.currentPath.includes('skill-gap')) {
      initEmpSkillGapEvents(() => {
        this.render();
      });
    }
  }
}

// Bootstrap application on DOMReady
document.addEventListener('DOMContentLoaded', () => {
  new TalentPulseApp();
});
