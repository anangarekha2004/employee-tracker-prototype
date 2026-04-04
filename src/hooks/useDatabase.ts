import { useState, useEffect } from 'react';
import { Employee, AttendanceRecord } from '../types';

const STORAGE_KEY_EMPLOYEES = 'neural_tracker_employees';
const STORAGE_KEY_ATTENDANCE = 'neural_tracker_attendance';

export function useDatabase() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedEmployees = localStorage.getItem(STORAGE_KEY_EMPLOYEES);
    const storedAttendance = localStorage.getItem(STORAGE_KEY_ATTENDANCE);

    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    } else {
      // Initial seed data
      const initialEmployees: Employee[] = [
        {
          id: '1',
          name: 'Sarah Jenkins',
          role: 'Senior Software Engineer',
          department: 'ENGINEERING',
          salary: 135000,
          joiningDate: '2023-05-12',
          rating: 5,
          notes: 'Exceptional technical lead on the cloud migration project.'
        },
        {
          id: '2',
          name: 'Michael Chen',
          role: 'Product Designer',
          department: 'DESIGN',
          salary: 110000,
          joiningDate: '2023-08-20',
          rating: 4,
          notes: 'Great eye for detail, improved user retention by 15%.'
        },
        {
          id: '3',
          name: 'Elena Rodriguez',
          role: 'Operations Manager',
          department: 'OPERATIONS',
          salary: 95000,
          joiningDate: '2024-01-15',
          rating: 4,
          notes: 'Streamlined internal procurement processes.'
        },
        {
          id: '4',
          name: 'David Smith',
          role: 'Security Analyst',
          department: 'SECURITY',
          salary: 105000,
          joiningDate: '2023-11-02',
          rating: 5,
          notes: 'Identified and patched 3 critical vulnerabilities.'
        },
        {
          id: '5',
          name: 'Aisha Khan',
          role: 'Data Scientist',
          department: 'RESEARCH',
          salary: 125000,
          joiningDate: '2024-02-28',
          rating: 3,
          notes: 'Developing new predictive models for market trends.'
        }
      ];
      setEmployees(initialEmployees);
      localStorage.setItem(STORAGE_KEY_EMPLOYEES, JSON.stringify(initialEmployees));
    }

    if (storedAttendance) {
      setAttendance(JSON.parse(storedAttendance));
    }

    setLoading(false);
  }, []);

  const saveEmployees = (newEmployees: Employee[]) => {
    setEmployees(newEmployees);
    localStorage.setItem(STORAGE_KEY_EMPLOYEES, JSON.stringify(newEmployees));
  };

  const saveAttendance = (newAttendance: AttendanceRecord[]) => {
    setAttendance(newAttendance);
    localStorage.setItem(STORAGE_KEY_ATTENDANCE, JSON.stringify(newAttendance));
  };

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee = { ...employee, id: crypto.randomUUID() };
    saveEmployees([...employees, newEmployee]);
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    saveEmployees(employees.map(emp => emp.id === id ? { ...emp, ...updates } : emp));
  };

  const deleteEmployee = (id: string) => {
    saveEmployees(employees.filter(emp => emp.id !== id));
    saveAttendance(attendance.filter(record => record.employeeId !== id));
  };

  const markAttendance = (employeeId: string, status: 'PRESENT' | 'ABSENT') => {
    const date = new Date().toISOString().split('T')[0];
    const existingIndex = attendance.findIndex(r => r.employeeId === employeeId && r.date === date);
    
    let newAttendance;
    if (existingIndex >= 0) {
      newAttendance = [...attendance];
      newAttendance[existingIndex] = { ...newAttendance[existingIndex], status };
    } else {
      newAttendance = [...attendance, { id: crypto.randomUUID(), employeeId, date, status }];
    }
    saveAttendance(newAttendance);
  };

  return {
    employees,
    attendance,
    loading,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    markAttendance
  };
}
