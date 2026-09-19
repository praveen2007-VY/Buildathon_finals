// Service for Employee Resume Upload & Supabase Storage / Database operations
import { supabase } from './supabaseClient.js';

export const RESUMES_BUCKET = 'resumes';
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export const DEFAULT_EMPLOYEE_ID = 'EMP001';
export const DEFAULT_EMPLOYEE_NAME = 'Alex Mercer';

export const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];
export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/octet-stream' // fallback on some Windows browsers for docx
];

/**
 * Standardize employee ID to always use EMP001 by default and never allow generated random IDs (e.g. EMP-xxxx)
 */
export function resolveEmployeeId(employeeId) {
  if (!employeeId || typeof employeeId !== 'string' || employeeId.startsWith('EMP-') || employeeId === 'undefined') {
    return DEFAULT_EMPLOYEE_ID;
  }
  return employeeId.trim();
}

/**
 * Validate resume file by extension and size
 */
export function validateResumeFile(file) {
  if (!file) {
    return { valid: false, message: 'Please select a resume file to upload.' };
  }

  const fileName = file.name.toLowerCase();
  const hasValidExt = ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(ext));
  
  if (!hasValidExt) {
    return {
      valid: false,
      message: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed.'
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      message: `File size (${sizeInMb} MB) exceeds the maximum allowed limit of 10 MB.`
    };
  }

  return { valid: true };
}

/**
 * Fetch existing resume metadata for an employee (default: EMP001)
 */
export async function fetchEmployeeResume(employeeId = DEFAULT_EMPLOYEE_ID) {
  const targetEmployeeId = resolveEmployeeId(employeeId);

  try {
    const { data, error } = await supabase
      .from('employee_resumes')
      .select('*')
      .eq('employee_id', targetEmployeeId)
      .order('uploaded_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching employee resume metadata:', error);
      return { success: false, error: error.message };
    }

    return { success: true, resume: data };
  } catch (err) {
    console.error('Unexpected error fetching employee resume:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Upload resume file to Supabase Storage and save metadata to employee_resumes
 */
export async function uploadResumeToSupabase(file, employeeId = DEFAULT_EMPLOYEE_ID) {
  // 1. Validate file
  const validation = validateResumeFile(file);
  if (!validation.valid) {
    return { success: false, error: validation.message };
  }

  const targetEmployeeId = resolveEmployeeId(employeeId);

  // Requirement: Before uploading, log: Resume upload employee ID: EMP001
  console.log(`Resume upload employee ID: ${targetEmployeeId}`);

  const storagePath = `${targetEmployeeId}/${file.name}`;

  try {
    // 2. Upload to Supabase Storage (resumes bucket) with upsert: true
    const { data: storageData, error: storageError } = await supabase
      .storage
      .from(RESUMES_BUCKET)
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type || 'application/pdf'
      });

    if (storageError) {
      console.error('Supabase Storage upload failed:', storageError);
      return {
        success: false,
        error: `Storage upload failed: ${storageError.message || 'Please check your connection.'}`
      };
    }

    // 3. Save or update metadata in employee_resumes table
    // Query existing record for targetEmployeeId (EMP001) to update, avoiding duplicate records
    const existing = await fetchEmployeeResume(targetEmployeeId);
    let dbResult;

    const payload = {
      employee_id: targetEmployeeId,
      file_name: file.name,
      file_path: storagePath,
      file_type: file.type || 'application/pdf',
      file_size: file.size,
      uploaded_at: new Date().toISOString()
    };

    if (existing.success && existing.resume?.id) {
      // Update existing record for EMP001
      dbResult = await supabase
        .from('employee_resumes')
        .update(payload)
        .eq('id', existing.resume.id)
        .select()
        .single();
    } else {
      // Insert new record for EMP001
      dbResult = await supabase
        .from('employee_resumes')
        .insert([payload])
        .select()
        .single();
    }

    if (dbResult.error) {
      console.error('Database metadata insert/update failed:', dbResult.error);
      return {
        success: false,
        error: `Database record failed: ${dbResult.error.message || 'Could not record resume metadata.'}`
      };
    }

    return {
      success: true,
      resume: dbResult.data,
      storagePath
    };

  } catch (err) {
    console.error('Unexpected error during resume upload process:', err);
    return {
      success: false,
      error: 'Resume upload failed. Please try again.'
    };
  }
}

/**
 * Format bytes to readable string (e.g. 1.2 MB)
 */
export function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
