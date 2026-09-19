// Centralized Supabase Client for TalentPulse AI Enterprise Platform
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 
  import.meta.env?.VITE_SUPABASE_URL || 
  'https://yhskpilxfkzzmmamvcaa.supabase.co';

const SUPABASE_ANON_KEY = 
  import.meta.env?.VITE_SUPABASE_ANON_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inloc2twaWx4Zmt6em1tYW12Y2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3NzQ4NjMsImV4cCI6MjEwNTM1MDg2M30.0b63I8b2mPLQkaDA3mXW4tqvQOy4zyKi5aB43zbSZDw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
