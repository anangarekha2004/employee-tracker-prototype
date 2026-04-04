export type Department = 'ENGINEERING' | 'DESIGN' | 'OPERATIONS' | 'SECURITY' | 'RESEARCH';

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: Department;
  salary: number;
  joiningDate: string;
  rating: number;
  notes: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  status: 'PRESENT' | 'ABSENT';
}

export type View = 'DASHBOARD' | 'EMPLOYEES' | 'ATTENDANCE' | 'PROFILE';
