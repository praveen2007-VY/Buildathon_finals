// TalentPulse AI Enterprise Platform - Data Engine & n8n Integration Store

// LocalStorage Persistence Keys
const STORAGE_KEY = 'TALENTPULSE_DATA_V3';

// Default initial state (clean and extensible)
const defaultData = {
  auth: {
    isLoggedIn: true,
    role: 'employee', // 'employee' | 'hr'
    user: {
      id: 'EMP001',
      name: 'Alex Mercer',
      email: 'alex.mercer@enterprise.ai',
      role: 'Principal Analyst',
      department: 'People Analytics & Strategy'
    }
  },
  n8nWebhookUrl: 'https://n8n.your-domain.com/webhook/talent-pulse-analyze',
  employees: [
    {
      id: 'EMP001',
      name: 'Alex Mercer',
      email: 'alex.mercer@enterprise.ai',
      role: 'Principal Analyst',
      department: 'People Analytics & Strategy',
      location: 'San Francisco, CA',
      skills: ['Python', 'SQL (PostgreSQL/BigQuery)', 'People Analytics', 'RAG Architecture', 'Distributed Systems'],
      proficiency: { 'Python': 96, 'SQL (PostgreSQL/BigQuery)': 94, 'People Analytics': 98, 'RAG Architecture': 90, 'Distributed Systems': 88 },
      experience: '8+ yrs data architecture & ML telemetry',
      resumeText: 'Alex Mercer - Principal Systems & Talent Analyst. Skilled in Python, SQL, LLM Orchestration, RAG, and Workforce Analytics.'
    },
    {
      id: 'EMP-8819',
      name: 'Sarah Johnson',
      email: 'sarah.j@enterprise.ai',
      role: 'Senior Product Analyst',
      department: 'Finance Engineering',
      location: 'New York (Hybrid)',
      skills: ['Python', 'Tableau Architecture', 'Workforce Forecasting', 'Financial Modeling'],
      proficiency: { 'Python': 92, 'Tableau Architecture': 95, 'Workforce Forecasting': 90, 'Financial Modeling': 94 },
      experience: '5 yrs fintech & product telemetry',
      resumeText: 'Sarah Johnson - Senior Product Analyst. Expert in Tableau, Python, Financial Modeling, and Analytics.'
    },
    {
      id: 'EMP-4402',
      name: 'Marcus Chen',
      email: 'marcus.c@enterprise.ai',
      role: 'Engineering Team Lead',
      department: 'Platform Architecture',
      location: 'San Francisco (HQ)',
      skills: ['Kubernetes', 'Golang Microservices', 'Distributed Systems', 'Engineering Leadership'],
      proficiency: { 'Kubernetes': 95, 'Golang Microservices': 92, 'Distributed Systems': 94, 'Engineering Leadership': 90 },
      experience: '10 yrs cloud infrastructure & devops',
      resumeText: 'Marcus Chen - Engineering Team Lead. Specialized in Kubernetes, Golang, Envoy, and Cloud Platforms.'
    }
  ],
  jobRoles: [
    {
      id: 'ROLE-9421',
      title: 'Staff AI Solutions Architect',
      department: 'Enterprise AI Platforms',
      requiredSkills: ['Python', 'RAG Architecture', 'Kubernetes', 'SOC2 Compliance Architecture', 'Distributed Systems'],
      band: 'L6 (Senior Staff Track)',
      compRange: '$180k – $220k Base',
      location: 'San Francisco (Hybrid)'
    },
    {
      id: 'ROLE-402',
      title: 'Lead Platform Engineer',
      department: 'Cloud Infrastructure',
      requiredSkills: ['Kubernetes', 'Golang Microservices', 'Distributed Systems', 'Cloud Security'],
      band: 'L6',
      compRange: '$170k – $200k Base',
      location: 'San Francisco'
    }
  ]
};

// Load or Initialize Store
function getStore() {
  if (typeof localStorage === 'undefined') return defaultData;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try { 
      const parsed = JSON.parse(saved);
      // Clean up legacy random IDs (e.g. EMP-7907, EMP-8842) so EMP001 is consistently used
      if (parsed.auth?.user && (parsed.auth.user.id?.startsWith('EMP-') || parsed.auth.user.id !== 'EMP001')) {
        parsed.auth.user.id = 'EMP001';
        parsed.auth.user.name = 'Alex Mercer';
      }
      return parsed;
    } catch (e) { console.error('Failed to parse store', e); }
  }
  return defaultData;
}

export function saveStore(data) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

export const store = getStore();

// Auth Helpers
export function loginUser(role, name, email) {
  store.auth.isLoggedIn = true;
  store.auth.role = role;
  store.auth.user = {
    id: role === 'employee' ? 'EMP001' : 'HR-101',
    name: name || (role === 'employee' ? 'Alex Mercer' : 'HR Administrator'),
    email: email || (role === 'employee' ? 'alex.mercer@enterprise.ai' : 'hr@enterprise.ai'),
    role: role === 'employee' ? 'Principal Analyst' : 'HR Director',
    department: role === 'employee' ? 'People Analytics' : 'Human Resources'
  };
  saveStore(store);
}

export function logoutUser() {
  store.auth.isLoggedIn = false;
  store.auth.user = null;
  saveStore(store);
}

// HR Actions: Add Job Role
export function addJobRole(title, department, requiredSkills, band, compRange, location) {
  const newRole = {
    id: 'ROLE-' + Math.floor(1000 + Math.random() * 9000),
    title,
    department,
    requiredSkills: typeof requiredSkills === 'string' ? requiredSkills.split(',').map(s => s.trim()) : requiredSkills,
    band: band || 'L6',
    compRange: compRange || '$180k - $220k',
    location: location || 'Hybrid'
  };
  store.jobRoles.push(newRole);
  saveStore(store);
  return newRole;
}

// HR Actions: Add Employee
export function addEmployee(name, email, role, department, location, skills) {
  const newEmp = {
    id: 'EMP-' + Math.floor(1000 + Math.random() * 9000),
    name,
    email,
    role,
    department,
    location: location || 'Remote',
    skills: typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : skills,
    proficiency: {},
    experience: 'New Enterprise Employee',
    resumeText: `${name} - ${role}. Skills: ${skills}`
  };
  
  newEmp.skills.forEach(sk => {
    newEmp.proficiency[sk] = Math.floor(75 + Math.random() * 20);
  });

  store.employees.push(newEmp);
  saveStore(store);
  return newEmp;
}

// AI Matching & Skill Gap Analysis Calculation Engine
export function analyzeEmployeeGap(employeeId, roleId) {
  const emp = store.employees.find(e => e.id === employeeId) || store.employees[0];
  const role = store.jobRoles.find(r => r.id === roleId) || store.jobRoles[0];

  if (!emp || !role) return null;

  const results = analyzeAndAssignEmployees(role.id, [emp.id]);
  return results[0] || null;
}

// Multi-Employee AI Analysis, Skill Assignment & Feedback Dispatcher Engine
export function analyzeAndAssignEmployees(roleId, employeeIds = []) {
  const role = store.jobRoles.find(r => r.id === roleId) || store.jobRoles[0];
  if (!role) return [];

  const targetEmployees = employeeIds.length > 0 
    ? store.employees.filter(e => employeeIds.includes(e.id))
    : store.employees;

  const results = targetEmployees.map(emp => {
    const empSkills = emp.skills || [];
    const reqSkills = role.requiredSkills || [];

    const matchedSkills = [];
    const missingSkills = [];

    reqSkills.forEach(req => {
      const hasSkill = empSkills.some(es => es.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(es.toLowerCase()));
      if (hasSkill) {
        matchedSkills.push(req);
      } else {
        missingSkills.push(req);
      }
    });

    const matchPercentage = Math.round((matchedSkills.length / Math.max(reqSkills.length, 1)) * 100);

    // Initialize arrays on employee if missing
    if (!emp.assignedSkills) emp.assignedSkills = [];
    if (!emp.assignedDevelopmentPlans) emp.assignedDevelopmentPlans = [];
    if (!emp.receivedFeedback) emp.receivedFeedback = [];

    // Assign missing skills to employee uniquely
    missingSkills.forEach(sk => {
      if (!emp.assignedSkills.includes(sk)) {
        emp.assignedSkills.push(sk);
      }
    });

    // Create development plan item for each missing skill
    const devPlan = missingSkills.map(sk => ({
      id: 'PLAN-' + Math.floor(1000 + Math.random() * 9000),
      targetRole: role.title,
      skill: sk,
      courseName: `Accelerated ${sk} Enterprise Certification`,
      provider: 'Enterprise AI Academy & DeepLearning.AI',
      assignedBy: 'HR Intelligence OS',
      assignedDate: new Date().toLocaleDateString(),
      status: 'Assigned'
    }));

    devPlan.forEach(plan => {
      if (!emp.assignedDevelopmentPlans.some(dp => dp.skill === plan.skill && dp.targetRole === plan.targetRole)) {
        emp.assignedDevelopmentPlans.push(plan);
      }
    });

    // Dispatch direct feedback to this particular employee
    const feedbackMsg = {
      id: 'FB-' + Math.floor(1000 + Math.random() * 9000),
      roleTitle: role.title,
      author: 'HR Intelligence OS',
      date: new Date().toLocaleDateString(),
      matchPercentage,
      matchedSkills,
      missingSkills,
      message: `Evaluation for ${role.title}: You have a ${matchPercentage}% skills match. Target missing skill(s) [${missingSkills.join(', ') || 'None'}] have been assigned to your employee learning plan.`
    };

    emp.receivedFeedback.unshift(feedbackMsg);

    return {
      employee: emp,
      jobRole: role,
      matchPercentage,
      matchedSkills,
      missingSkills,
      assignedDevPlans: devPlan,
      feedback: feedbackMsg,
      n8nPayload: {
        event: 'HR_EMPLOYEE_AI_GAP_ANALYSIS',
        timestamp: new Date().toISOString(),
        employeeId: emp.id,
        employeeName: emp.name,
        employeeEmail: emp.email,
        targetRoleId: role.id,
        targetRoleTitle: role.title,
        matchPercentage,
        matchedSkills,
        assignedMissingSkills: missingSkills,
        feedbackSent: feedbackMsg.message
      }
    };
  });

  saveStore(store);
  return results;
}


// Resume Parsing & Extraction Pipeline Simulator
export function processResumePipeline(fileName, fileText) {
  // Step 1: Uploaded (FileName)
  // Step 2: Resume Parser (Text extraction)
  // Step 3: AI Skill Extractor (Extract skills)
  const rawSkills = ['Python', 'RAG Architecture', 'LLM Prompting', 'Data Pipelines', 'Cloud Security', 'Kubernetes'];
  
  // Step 4: Skill Normalization
  const normalizedSkills = rawSkills.map(s => s.trim());
  
  // Step 5: Update Active Employee Profile
  const currentEmp = store.employees.find(e => e.id === store.auth.user?.id) || store.employees[0];
  if (currentEmp) {
    currentEmp.skills = Array.from(new Set([...currentEmp.skills, ...normalizedSkills]));
    normalizedSkills.forEach(s => {
      if (!currentEmp.proficiency[s]) {
        currentEmp.proficiency[s] = Math.floor(80 + Math.random() * 15);
      }
    });
    currentEmp.resumeText = fileText || `Parsed resume from file: ${fileName}`;
    saveStore(store);
  }

  return {
    fileName,
    parsedText: fileText || `Successfully extracted text from ${fileName}. Experience: 8+ years leading software systems and AI data pipelines.`,
    extractedSkills: normalizedSkills,
    updatedEmployee: currentEmp
  };
}

// n8n Webhook Trigger Simulator / HTTP Caller
export async function triggerN8nWebhook(payload) {
  const webhookUrl = store.n8nWebhookUrl;
  console.log('Sending payload to n8n Webhook:', webhookUrl, payload);
  
  if (!webhookUrl || webhookUrl.includes('your-domain')) {
    return {
      status: 'simulated',
      message: 'n8n Webhook Endpoint configured for testing. (Payload ready to post once live n8n URL is set in Settings)',
      payload
    };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return { status: 'success', statusCode: res.status, payload };
  } catch (err) {
    console.warn('n8n Webhook call failed (falling back to client simulation)', err);
    return { status: 'simulated', error: err.message, payload };
  }
}

// Export compatibility objects for sub-views
export const activeUser = {
  id: 'EMP001',
  name: 'Alex Mercer',
  email: 'alex.mercer@enterprise.ai',
  role: 'Principal Analyst',
  department: 'People Analytics & Strategy',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  grade: 'L6',
  location: 'San Francisco, CA'
};

export const userProfile = activeUser;

export const profileDetails = {
  phone: '+1 (555) 234-5678',
  bio: 'Systems Analyst & AI Engineer driving talent intelligence, RAG pipelines, and workforce optimization.'
};

export const skillsList = [
  'Python', 'SQL (PostgreSQL/BigQuery)', 'People Analytics', 'RAG Architecture', 'Distributed Systems', 'Kubernetes'
];

export const candidateMarketplace = store.employees;
export const employeeList = store.employees;
export const openRoles = store.jobRoles;
export const jobRequisitions = store.jobRoles;

export const targetOpportunity = store.jobRoles[0] || {
  id: 'ROLE-9421',
  title: 'Staff AI Solutions Architect',
  department: 'Enterprise AI Platforms'
};

export const feedbackList = [
  { id: 1, author: 'Elena Rostova (VP Product)', rating: 5, comment: 'Exceptional architectural foresight during the Q3 analytics infrastructure upgrade.' },
  { id: 2, author: 'Marcus Chen (Staff Engineer)', rating: 5, comment: 'Outstanding cross-functional mentor and AI pipeline innovator.' }
];

export const learningCatalog = [
  { id: 'COURSE-101', title: 'Advanced RAG & Vector Systems', provider: 'DeepLearning.AI', estHours: '16 hrs', status: 'In Progress', progress: 65 },
  { id: 'COURSE-102', title: 'Kubernetes Cluster Architecture for Enterprise AI', provider: 'Cloud Native Foundation', estHours: '20 hrs', status: 'Recommended', progress: 0 }
];

export const opportunities = store.jobRoles;

export const performanceGoals = [
  { id: 1, title: 'Deploy Talent AI Matcher Engine', category: 'Strategic Innovation', targetQuarter: 'Q4', status: 'On Track' },
  { id: 2, title: 'Achieve 95% Skill Gap Analysis Accuracy', category: 'Quality & Telemetry', targetQuarter: 'Q4', status: 'On Track' }
];

