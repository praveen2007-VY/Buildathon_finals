// HR Module: Employee Management View (Add, List, Details, Edit, Deactivate)

import { employeeList } from '../../data.js';

export function renderHrEmployeeManagementView() {
  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="font-display text-2xl font-bold text-on-surface">Employee Management</h1>
          <p class="text-xs text-on-surface-variant">Add, manage, inspect, edit, or deactivate employee profiles across enterprise business units.</p>
        </div>
        <button id="addEmployeeBtn" class="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold shadow-xs hover:bg-primary/90">
          <span class="material-symbols-outlined text-base">person_add</span> Add New Employee
        </button>
      </div>

      <!-- Employee Directory Table -->
      <div class="bg-white p-6 rounded-2xl shadow-xs border border-surface-container flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-on-surface">Active Personnel List (${employeeList.length})</span>
          <input type="text" id="employeeSearchInput" placeholder="Search by name, ID, or department..." class="h-9 px-3 rounded-lg bg-surface-container-low text-xs text-on-surface focus:outline-none w-64"/>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="text-outline text-[11px] uppercase tracking-wider bg-surface-container-low">
                <th class="py-3 px-4 rounded-l-lg">Employee</th>
                <th class="py-3 px-4">Department & Location</th>
                <th class="py-3 px-4">Tenure</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 rounded-r-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-container" id="employeeTableBody">
              ${employeeList.map(e => `
                <tr class="hover:bg-surface-container-low/50 transition-colors">
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-3">
                      <img src="${e.avatar}" class="w-8 h-8 rounded-full object-cover"/>
                      <div class="flex flex-col">
                        <span class="text-xs font-bold text-on-surface">${e.name}</span>
                        <span class="text-[11px] text-outline">${e.role} • ${e.id}</span>
                      </div>
                    </div>
                  </td>
                  <td class="py-3.5 px-4">
                    <span class="text-xs text-on-surface font-medium">${e.department}</span>
                    <span class="text-[10px] text-outline block">${e.location}</span>
                  </td>
                  <td class="py-3.5 px-4 text-xs font-medium text-on-surface">${e.tenure}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">${e.status}</span>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button class="emp-edit-btn text-xs text-primary font-semibold hover:underline" data-id="${e.id}">Edit</button>
                      <button class="emp-deactivate-btn text-xs text-error font-semibold hover:underline" data-id="${e.id}">Deactivate</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
