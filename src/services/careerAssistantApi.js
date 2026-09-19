// Centralized API Service for TalentPulse AI Career Assistant (n8n Integration)

export const CAREER_ASSISTANT_WEBHOOK_URL = 
  import.meta.env?.VITE_CAREER_ASSISTANT_WEBHOOK_URL || 
  'https://praveen2007.app.n8n.cloud/webhook-test/career-assistant';

/**
 * Parse and safely extract the AI response text from arbitrary n8n return structures.
 * Prioritizes: response -> message -> output -> answer -> text
 */
export function parseN8nResponse(data) {
  if (!data) {
    return null;
  }

  // If response is already a plain string
  if (typeof data === 'string') {
    const trimmed = data.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        return parseN8nResponse(parsed);
      } catch {
        return trimmed;
      }
    }
    return trimmed.length > 0 ? trimmed : null;
  }

  // If response is an array (common in n8n nodes), inspect the first element
  let target = data;
  if (Array.isArray(data)) {
    if (data.length === 0) return null;
    target = data[0];
  }

  if (typeof target === 'string') {
    return target.trim();
  }

  if (typeof target === 'object' && target !== null) {
    // Check if target wraps another json property (e.g. { json: { response: ... } })
    if (target.json && typeof target.json === 'object') {
      const extractedFromJson = parseN8nResponse(target.json);
      if (extractedFromJson) return extractedFromJson;
    }

    // Priority order: response, message, output, answer, text
    const priorityFields = ['response', 'message', 'output', 'answer', 'text'];
    for (const field of priorityFields) {
      if (target[field] !== undefined && target[field] !== null) {
        if (typeof target[field] === 'string' && target[field].trim().length > 0) {
          return target[field].trim();
        }
        if (typeof target[field] === 'object') {
          const nested = parseN8nResponse(target[field]);
          if (nested) return nested;
        }
      }
    }

    // Check for common AI Agent / LangChain fields in n8n
    if (target.content && typeof target.content === 'string') return target.content.trim();
    if (target.text && typeof target.text === 'string') return target.text.trim();
    if (target.result && typeof target.result === 'string') return target.result.trim();
    if (target.data && typeof target.data === 'string') return target.data.trim();
  }

  return null;
}

/**
 * Send chat message and employee context to n8n webhook
 */
export async function sendCareerAssistantMessage({
  message,
  employee = {},
  conversationId = 'career-assistant-session',
  conversationHistory = [],
  context = {},
  timeoutMs = 45000
}) {
  const requestPayload = {
    employee_id: employee.id || 'EMP001',
    employee_name: employee.name || 'Alex Mercer',
    message: message,
    conversation_id: conversationId,
    context: {
      page: 'ai-career-assistant',
      role: employee.role || 'Principal Analyst',
      department: employee.department || 'People Analytics & Strategy',
      ...context
    },
    conversation: conversationHistory.map(item => ({
      role: item.role,
      content: item.content
    }))
  };

  // Development logging
  console.log("Career Assistant Request:", requestPayload);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(CAREER_ASSISTANT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestPayload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`n8n webhook error response: HTTP ${response.status} ${response.statusText}`);
      return {
        success: false,
        error: `HTTP_${response.status}`,
        message: "I couldn't connect to TalentPulse AI right now. Please try again."
      };
    }

    const contentType = response.headers.get('content-type') || '';
    let responseData;

    if (contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      const textData = await response.text();
      try {
        responseData = JSON.parse(textData);
      } catch {
        responseData = textData;
      }
    }

    // Development logging
    console.log("Career Assistant Response:", responseData);

    const parsedText = parseN8nResponse(responseData);

    if (!parsedText) {
      console.warn("Unable to extract AI text from n8n response:", responseData);
      return {
        success: false,
        error: 'PARSE_ERROR',
        message: "Sorry, I couldn't understand the AI response. Please try again.",
        raw: responseData
      };
    }

    return {
      success: true,
      text: parsedText,
      raw: responseData
    };

  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      console.error("n8n request timed out after " + timeoutMs + "ms");
      return {
        success: false,
        error: 'TIMEOUT',
        message: "I couldn't connect to TalentPulse AI right now. Please try again."
      };
    }

    // Check for network or CORS error
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.error(
        "CORS or Network Error detected connecting to n8n webhook:",
        CAREER_ASSISTANT_WEBHOOK_URL,
        "\nEnsure n8n webhook workflow is active and allows requests from origin:",
        window.location.origin,
        error
      );
    } else {
      console.error("Error connecting to n8n webhook:", error);
    }

    return {
      success: false,
      error: 'NETWORK_ERROR',
      message: "I couldn't connect to TalentPulse AI right now. Please try again."
    };
  }
}
