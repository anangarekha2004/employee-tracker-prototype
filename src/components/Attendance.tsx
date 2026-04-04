import React from 'react';
import { motion } from 'motion/react';
import { Check, X, Calendar } from 'lucide-react';
import { Employee, AttendanceRecord } from '../types';
import { cn } from '../lib/utils';

interface AttendanceProps {
  employees: Employee[];
  attendance: AttendanceRecord[];
  onMark: (id: string, status: 'PRESENT' | 'ABSENT') => void;
}

export const Attendance: React.FC<AttendanceProps> = ({ employees, attendance, onMark }) => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const todayISO = new Date().toISOString().split('T')[0];

  return (
    <div className="p-6 pb-24 space-y-6 max-w-4xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold text-slate-900"
      >
        Attendance Tracking
      </motion.h1>

      <div className="flex items-center gap-3 text-sm font-medium text-slate-500 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
        <Calendar size={18} className="text-blue-600" />
        <span>Today: {today}</span>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {employees.map((emp) => {
            const record = attendance.find(r => r.employeeId === emp.id && r.date === todayISO);
            const status = record?.status;

            return (
              <motion.div 
                key={emp.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors"
              >
                <div>
                  <h3 className="font-bold text-slate-900">{emp.name}</h3>
                  <p className="text-xs text-slate-500">{emp.role} • {emp.department}</p>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => onMark(emp.id, 'PRESENT')}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                      status === 'PRESENT' 
                        ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20" 
                        : "bg-white text-slate-400 border-slate-200 hover:border-emerald-500 hover:text-emerald-500"
                    )}
                  >
                    Present
                  </button>
                  <button 
                    onClick={() => onMark(emp.id, 'ABSENT')}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                      status === 'ABSENT' 
                        ? "bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/20" 
                        : "bg-white text-slate-400 border-slate-200 hover:border-red-500 hover:text-red-500"
                    )}
                  >
                    Absent
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Recent Activity Log</h2>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 space-y-3">
          {attendance.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4 italic">No recent activity recorded.</p>
          ) : (
            attendance.slice(-6).reverse().map((record) => {
              const emp = employees.find(e => e.id === record.employeeId);
              return (
                <div key={record.id} className="text-xs flex justify-between items-center border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800">{emp?.name}</span>
                    <span className="text-[10px] text-slate-400">{record.date}</span>
                  </div>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                    record.status === 'PRESENT' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                  )}>
                    {record.status}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
