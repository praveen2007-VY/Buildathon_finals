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
 * Supports both strict JSON structures and n8n AI Agent / prompt triggers
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

  // Build comprehensive prompt text for n8n AI Agent / Chat nodes
  const promptText = `Analyze ALL employee records and evaluate the ${selectedEmployees.length} selected employees for the target job:
Target Job Title: ${jobRoleTitle}
Department: ${department}
Required Skills: ${skillsArray.join(', ')}
Band Level: ${bandLevel}
Compensation: ${compensationRange}

Selected Employee Candidates (${selectedEmployees.length}):
${selectedEmployees.map((e, idx) => `Candidate #${idx + 1}:
- ID: ${e.Employee_ID || e.id}
- Name: ${e.Name || e.name}
- Current Role: ${e.Current_Role || e.role || 'N/A'}
- Department: ${e.Department || e.department || 'N/A'}
- Experience: ${e.Years_Experience || e.yearsExperience || 0} years
- Technical Skills: ${e.Technical_Skills || (Array.isArray(e.skills) ? e.skills.join('; ') : 'N/A')}
- Soft Skills: ${e.Soft_Skills || 'N/A'}
- Projects: ${e.Projects_Completed || 'N/A'}
- Performance Score: ${e.Performance_Score || 'N/A'}
- Education: ${e.Education || 'N/A'}
- Certifications: ${e.Certifications || 'N/A'}
- Career Interests: ${e.Career_Interests || 'N/A'}`).join('\n\n')}

Please provide a detailed Career Development & Skill Match Report for these candidates.`;

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
    timestamp: new Date().toISOString(),

    // n8n AI Agent & Webhook compatibility fields:
    message: promptText,
    chatInput: promptText,
    question: promptText,
    prompt: promptText,
    job_role_title: jobRoleTitle,
    department: department,
    required_skills: skillsArray.join(', ')
  };
}

/**
 * Parse n8n AI analysis response with flexible format support (JSON or Markdown text)
 */
export function parseN8nReport(responseData, rawText = '') {
  const input = responseData !== null && responseData !== undefined ? responseData : rawText;
  if (!input) return null;

  // Case 1: Plain string (either JSON string or Markdown text)
  if (typeof input === 'string') {
    const trimmed = input.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        return parseN8nReport(parsed, rawText);
      } catch (e) {
        // Fall through to markdown text handling
      }
    }

    return {
      isMarkdown: true,
      text: trimmed,
      overall_summary: trimmed,
      job_role: 'AI Career & Talent Analysis',
      department: 'HR Intelligence',
      employee_count: 1,
      employees: [],
      final_recommendations: []
    };
  }

  // Case 2: Array of results
  if (Array.isArray(input) && input.length > 0) {
    return parseN8nReport(input[0], rawText);
  }

  // Case 3: Object result
  if (typeof input === 'object') {
    // If n8n wrapped output in `response` field (e.g. {{ $json.response }})
    if (input.response) {
      if (typeof input.response === 'string') {
        const trimmed = input.response.trim();
        if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
          try {
            const parsed = JSON.parse(trimmed);
            return parseN8nReport(parsed, input.response);
          } catch (e) {
            // Not JSON, treat as text
          }
        }
        return {
          isMarkdown: true,
          text: trimmed,
          overall_summary: trimmed,
          job_role: input.job_role || 'AI Career & Talent Analysis',
          department: input.department || 'HR Intelligence',
          employee_count: input.employee_count || 1,
          employees: [],
          final_recommendations: []
        };
      } else if (typeof input.response === 'object') {
        return parseN8nReport(input.response, rawText);
      }
    }

    // If report is directly attached
    if (input.report && typeof input.report === 'object') {
      return normalizeReport(input.report);
    }
    if (input.output?.report && typeof input.output.report === 'object') {
      return normalizeReport(input.output.report);
    }

    // If text is in text or output fields
    if (input.text && typeof input.text === 'string') {
      return parseN8nReport(input.text, rawText);
    }
    if (input.output && typeof input.output === 'string') {
      return parseN8nReport(input.output, rawText);
    }

    // Direct report object
    if (input.employees || input.overall_summary || input.job_role || input.final_recommendations) {
      return normalizeReport(input);
    }
  }

  // Fallback if raw text exists
  if (rawText && typeof rawText === 'string' && rawText.trim()) {
    return {
      isMarkdown: true,
      text: rawText.trim(),
      overall_summary: rawText.trim(),
      job_role: 'AI Career & Talent Analysis',
      department: 'HR Intelligence',
      employee_count: 1,
      employees: [],
      final_recommendations: []
    };
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
    isMarkdown: false,
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
    'https://praveen2007.app.n8n.cloud/webhook-test/3567fe79-0933-43ba-a604-f5b554ca6242';

  console.log('n8n HR Multi-Employee Analysis Outgoing Payload:', payload);
  console.log('Posting to webhook URL:', webhookUrl);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
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

    console.log('n8n HR Multi-Employee Analysis Incoming Raw Response:', responseText);

    // Try JSON parse first, but safely fall back to plain text/markdown
    let responseData = null;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseErr) {
      console.log('n8n response is plain text/markdown (not JSON), processing as formatted report.');
      responseData = responseText;
    }

    const report = parseN8nReport(responseData, responseText);
    if (!report) {
      console.warn('Could not extract report from n8n response:', responseData);
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
