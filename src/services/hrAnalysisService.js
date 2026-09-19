// Service for HR Job Post Creation & Multi-Employee AI Analysis with Supabase & n8n
import { supabase } from './supabaseClient.js';

// Cache for raw employees from Supabase employee_dataset_raw
let cachedRawEmployees = [];

/**
 * Fetch all raw employee records directly from Supabase `employee_dataset_raw` table
 */
export async function fetchRawEmployeesFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('employee_dataset_raw')
      .select('*')
      .order('Employee_ID', { ascending: true });

    if (error) {
      console.error('Supabase error fetching employee_dataset_raw:', error);
      throw error;
    }

    if (data && data.length > 0) {
      cachedRawEmployees = data;
      return data;
    }

    return cachedRawEmployees;
  } catch (err) {
    console.error('Failed to load raw employees from Supabase:', err);
    return cachedRawEmployees;
  }
}

/**
 * Get currently cached raw employees
 */
export function getCachedRawEmployees() {
  return cachedRawEmployees;
}

/**
 * Build the exact JSON payload for n8n multi-employee analysis
 */
export function buildHrAnalysisPayload({
  jobRoleTitle,
  department,
  requiredSkills,
  bandLevel = 'L5',
  compensationRange = ''
}, selectedEmployees = []) {
  // Parse required skills to an array of trimmed non-empty strings
  let skillsArray = [];
  if (Array.isArray(requiredSkills)) {
    skillsArray = requiredSkills.map(s => String(s).trim()).filter(Boolean);
  } else if (typeof requiredSkills === 'string') {
    skillsArray = requiredSkills
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }

  return {
    request_type: 'hr_multi_employee_analysis',
    job: {
      job_role_title: jobRoleTitle,
      department: department,
      required_skills: skillsArray,
      band_level: bandLevel,
      compensation_range: compensationRange
    },
    selected_employees: selectedEmployees, // Complete selected Supabase records
    selected_employee_count: selectedEmployees.length,
    timestamp: new Date().toISOString()
  };
}

/**
 * Parse n8n AI analysis response with flexible format support
 */
export function parseN8nReport(responseData) {
  if (!responseData) return null;

  let data = responseData;
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      return null;
    }
  }

  // If response is an array, take the first item
  if (Array.isArray(data) && data.length > 0) {
    data = data[0];
  }

  // Case 1: Wrapped in report object: { success: true, report: { ... } } or { report: { ... } }
  if (data && typeof data === 'object') {
    if (data.report && typeof data.report === 'object') {
      return normalizeReport(data.report);
    }
    if (data.output?.report && typeof data.output.report === 'object') {
      return normalizeReport(data.output.report);
    }
    // Case 2: Direct report object
    if (data.employees || data.overall_summary || data.job_role || data.final_recommendations) {
      return normalizeReport(data);
    }
  }

  return null;
}

/**
 * Normalize report fields to ensure consistent rendering
 */
function normalizeReport(raw) {
  if (!raw) return null;

  const employeesRaw = raw.employees || raw.analyzed_employees || raw.selected_employees || [];
  const employees = employeesRaw.map((emp, index) => {
    return {
      Employee_ID: emp.Employee_ID || emp.employee_id || emp.id || `EMP${String(index + 1).padStart(3, '0')}`,
      Name: emp.Name || emp.name || emp.employee_name || 'Personnel',
      match_percentage: Number(emp.match_percentage ?? emp.matchPercentage ?? emp.match_score ?? 75),
      matched_skills: Array.isArray(emp.matched_skills) 
        ? emp.matched_skills 
        : (emp.matchedSkills ? (Array.isArray(emp.matchedSkills) ? emp.matchedSkills : [emp.matchedSkills]) : []),
      skill_gaps: Array.isArray(emp.skill_gaps) 
        ? emp.skill_gaps 
        : (emp.skillGaps || emp.missing_skills || emp.missingSkills || []),
      recommended_learning: Array.isArray(emp.recommended_learning) 
        ? emp.recommended_learning 
        : (emp.recommendedLearning || emp.upskilling || []),
      career_recommendation: emp.career_recommendation || emp.careerRecommendation || emp.recommendation || 'Continuous skill progression recommended.'
    };
  });

  let finalRecs = raw.final_recommendations || raw.finalRecommendations || raw.recommendations || [];
  if (typeof finalRecs === 'string') {
    finalRecs = [finalRecs];
  }

  return {
    job_role: raw.job_role || raw.job_role_title || raw.role || 'Target Role',
    department: raw.department || 'Engineering',
    employee_count: raw.employee_count || employees.length,
    overall_summary: raw.overall_summary || raw.summary || 'AI skill analysis complete across selected personnel.',
    employees,
    final_recommendations: finalRecs
  };
}

/**
 * Post HR analysis payload to n8n webhook
 */
export async function sendHrAnalysisToN8n(payload) {
  const webhookUrl = 
    import.meta.env?.VITE_N8N_HR_ANALYSIS_WEBHOOK_URL || 
    'https://praveen2007.app.n8n.cloud/webhook-test/career-assistant';

  // Requirement 4: The browser console shows the outgoing payload for debugging
  console.log('n8n HR Multi-Employee Analysis Outgoing Payload:', payload);
  console.log('Posting to webhook URL:', webhookUrl);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error(`n8n HTTP error! Status: ${response.status}`, errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText.slice(0, 100)}`);
    }

    const responseText = await response.text();
    if (!responseText || !responseText.trim()) {
      console.warn('n8n returned empty response text');
      return {
        success: false,
        error: 'No analysis report was returned from the AI workflow.',
        empty: true
      };
    }

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseErr) {
      console.error('Failed to parse n8n JSON response:', parseErr, responseText);
      throw new Error('Invalid JSON received from n8n webhook');
    }

    console.log('n8n HR Multi-Employee Analysis Incoming Response:', responseData);

    const report = parseN8nReport(responseData);
    if (!report) {
      console.warn('Could not extract structured report from response:', responseData);
      return {
        success: false,
        raw: responseData,
        error: 'No analysis report was returned from the AI workflow.'
      };
    }

    return {
      success: true,
      report,
      raw: responseData
    };

  } catch (err) {
    console.error('n8n Request Failed:', err);
    return {
      success: false,
      error: 'AI analysis failed. Please try again.',
      details: err.message
    };
  }
}
