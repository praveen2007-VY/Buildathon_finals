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
import { renderEmpResumePipelineView } from './views/employee/empResumePipelineView.js';
import { renderAiSkillProfileView } from './views/aiSkillProfile.js';
import { renderEmpOpportunitiesView } from './views/employee/empOpportunities.js';
import { renderEmpSkillGapView } from './views/employee/empSkillGap.js';
import { renderEmpLearningView } from './views/employee/empLearning.js';
import { renderAiCareerAssistantView, initAiCareerAssistantEvents } from './views/aiCareerAssistant.js';
import { renderEmpFeedbackView } from './views/employee/empFeedback.js';
import { renderEmpSettingsView } from './views/employee/empSettings.js';

// HR / Admin Module Views
import { renderHrDashboardView } from './views/hrDashboard.js';
import { renderHrEmployeeManagementView } from './views/hr/hrEmployeeManagement.js';
import { renderHrAnalyzeView, renderMultiAnalysisResultCards } from './views/hr/hrAnalyzeView.js';
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

    // Fetch initial dataset from Supabase
    await loadSupabaseData();

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
      window.scrollTo(0, 0);
    });

    // Global events
    this.setupGlobalEvents();
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
        const selectedId = empSelect?.value || 'EMP001';
        const selectedEmp = store.employees.find(e => e.id === selectedId) || store.employees[0];
        const email = document.getElementById('empEmailInput')?.value || selectedEmp?.email;

        loginUser('employee', selectedEmp?.name, email);
        if (store.auth.user && selectedEmp) {
          store.auth.user.id = selectedEmp.id;
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

    // 3. HR Run Multi-Employee AI Skill Gap Analysis & Skill Assignment
    const runAnalysisBtn = document.getElementById('runAnalysisBtn');
    if (runAnalysisBtn) {
      runAnalysisBtn.addEventListener('click', () => {
        const roleId = document.getElementById('selectRoleAnalysis')?.value;
        const checkedCbs = document.querySelectorAll('.emp-select-checkbox:checked');
        const selectedEmpIds = Array.from(checkedCbs).map(cb => cb.value);

        if (selectedEmpIds.length === 0) {
          showToast('Please select at least one employee to analyze.', 'warning');
          return;
        }

        const results = analyzeAndAssignEmployees(roleId, selectedEmpIds);
        this.lastAnalysisResults = results;

        const container = document.getElementById('analysisResultContainer');
        if (container && results) {
          container.innerHTML = renderMultiAnalysisResultCards(results);
          showToast(`AI Analysis complete! Missing skills assigned & feedback sent to ${results.length} employees.`, 'success');

          // Bind n8n trigger buttons for individual results
          document.querySelectorAll('.trigger-n8n-item-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
              try {
                const payload = JSON.parse(btn.dataset.payload);
                const res = await triggerN8nWebhook(payload);
                showToast(`n8n Webhook Triggered! ${res.message || 'Payload posted.'}`, 'success');
              } catch (err) {
                console.error('Failed to trigger n8n', err);
              }
            });
          });
        }
      });
    }

    // 4. Employee Resume Upload Pipeline
    const dropzone = document.getElementById('pipelineDropzone') || document.getElementById('resumeDropzone');
    const fileInput = document.getElementById('resumeFileInput');

    if (dropzone) {
      dropzone.addEventListener('click', () => {
        if (fileInput) fileInput.click();
        else {
          const result = processResumePipeline('Employee_Resume.pdf');
          showToast('Resume Parsed & AI Skills Extracted! Employee profile updated.', 'success');
          this.render();
        }
      });
    }

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const result = processResumePipeline(file.name);
          showToast(`Resume "${file.name}" Parsed! Extracted ${result.extractedSkills.length} verified skills.`, 'success');
          this.render();
        }
      });
    }

    // 5. AI Career Assistant Interactive Events
    if (this.currentPath.includes('ai-career-assistant')) {
      initAiCareerAssistantEvents();
    }
  }
}

// Bootstrap application on DOMReady
document.addEventListener('DOMContentLoaded', () => {
  new TalentPulseApp();
});
