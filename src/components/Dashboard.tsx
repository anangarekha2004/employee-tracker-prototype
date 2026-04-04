import React from 'react';
import { motion } from 'motion/react';
import { Users, Activity, Star, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Employee, AttendanceRecord } from '../types';
import { cn } from '../lib/utils';

interface DashboardProps {
  employees: Employee[];
  attendance: AttendanceRecord[];
}

export const Dashboard: React.FC<DashboardProps> = ({ employees, attendance }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(r => r.date === today);
  const presentCount = todayAttendance.filter(r => r.status === 'PRESENT').length;
  
  const avgRating = employees.length > 0 
    ? (employees.reduce((acc, emp) => acc + emp.rating, 0) / employees.length).toFixed(1)
    : '0';

  const deptData = employees.reduce((acc: any[], emp) => {
    const existing = acc.find(d => d.name === emp.department);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: emp.department, count: 1 });
    }
    return acc;
  }, []);

  const COLORS = ['#3b82f6', '#6366f1', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6 p-6 pb-24 max-w-4xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold text-slate-900"
      >
        Dashboard Overview
      </motion.h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          icon={<Users className="w-5 h-5" />} 
          label="Total Employees" 
          value={employees.length.toString()} 
          color="blue"
        />
        <StatCard 
          icon={<Activity className="w-5 h-5" />} 
          label="Present Today" 
          value={`${presentCount}/${employees.length}`} 
          color="indigo"
        />
        <StatCard 
          icon={<Star className="w-5 h-5" />} 
          label="Avg Rating" 
          value={avgRating} 
          color="emerald"
        />
        <StatCard 
          icon={<TrendingUp className="w-5 h-5" />} 
          label="Growth Rate" 
          value="+12%" 
          color="amber"
        />
      </div>

      <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl">
        <h2 className="text-sm font-bold text-slate-500 mb-6 uppercase tracking-wider">Department Distribution</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deptData}>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {deptData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
  <motion.div 
    whileHover={{ y: -2 }}
    className="bg-white border border-slate-200 shadow-sm p-5 rounded-2xl flex flex-col"
  >
    <div className={cn(
      "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
      color === 'blue' ? "bg-blue-50 text-blue-600" :
      color === 'indigo' ? "bg-indigo-50 text-indigo-600" :
      color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
      "bg-amber-50 text-amber-600"
    )}>
      {icon}
    </div>
    <span className="text-xs font-medium text-slate-500 mb-1">{label}</span>
    <span className="text-2xl font-bold text-slate-900">{value}</span>
  </motion.div>
);
