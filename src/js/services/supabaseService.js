import { supabase } from '../supabaseClient.js';

/**
 * Fetch all raw employee records from Supabase `employee_dataset_raw`
 */
export async function fetchRawEmployeeDataset() {
  try {
    const { data, error } = await supabase
      .from('employee_dataset_raw')
      .select('*')
      .order('Employee_ID', { ascending: true });

    if (error) {
      console.error('Supabase Error fetching employee_dataset_raw:', error);
      throw error;
    }
    return data || [];
  } catch (err) {
    console.error('Failed to fetch employee dataset from Supabase:', err);
    return [];
  }
}

/**
 * Fetch all daily report records from Supabase `employee_dailyreport`
 */
export async function fetchRawDailyReports() {
  try {
    const { data, error } = await supabase
      .from('employee_dailyreport')
      .select('*');

    if (error) {
      console.error('Supabase Error fetching employee_dailyreport:', error);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Failed to fetch daily reports from Supabase:', err);
    return [];
  }
}

/**
 * Set up real-time subscription for employee dataset changes
 */
export function subscribeToEmployeeChanges(onUpdate) {
  const channel = supabase
    .channel('public:employee_dataset_raw')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'employee_dataset_raw' },
      (payload) => {
        console.log('Real-time update received from Supabase employee_dataset_raw:', payload);
        if (typeof onUpdate === 'function') {
          onUpdate(payload);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
