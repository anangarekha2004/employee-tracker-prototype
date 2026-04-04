import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit2, X, Check, Star } from 'lucide-react';
import { Employee, Department } from '../types';
import { cn } from '../lib/utils';

interface EmployeeListProps {
  employees: Employee[];
  onAdd: (emp: Omit<Employee, 'id'>) => void;
  onUpdate: (id: string, emp: Partial<Employee>) => void;
  onDelete: (id: string) => void;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onAdd, onUpdate, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="p-6 pb-24 space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-slate-900"
        >
          Employee Directory
        </motion.h1>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm"
        >
          <Plus size={18} /> Add Employee
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <EmployeeForm 
            onClose={() => setIsAdding(false)} 
            onSubmit={(data) => {
              onAdd(data);
              setIsAdding(false);
            }} 
          />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {employees.map((emp) => (
          <motion.div 
            key={emp.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm relative group hover:border-blue-200 transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{emp.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{emp.role}</p>
                <p className="text-xs text-slate-400 mt-1">{emp.department}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => {}}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => onDelete(emp.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star 
                      key={s}
                      size={12}
                      className={cn(
                        s <= emp.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700">${emp.salary.toLocaleString()}</span>
              </div>
              <p className="text-xs mt-3 text-slate-500 line-clamp-2 italic">"{emp.notes}"</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const EmployeeForm = ({ onClose, onSubmit }: { onClose: () => void, onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: 'ENGINEERING' as Department,
    salary: 50000,
    joiningDate: new Date().toISOString().split('T')[0],
    rating: 3,
    notes: ''
  });

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl space-y-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">New Employee</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-all"><X size={20} /></button>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
            <input 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Jane Doe"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Role</label>
              <input 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-500 transition-all"
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
                placeholder="e.g. Developer"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Department</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-500 transition-all"
                value={formData.department}
                onChange={e => setFormData({...formData, department: e.target.value as Department})}
              >
                <option value="ENGINEERING">Engineering</option>
                <option value="DESIGN">Design</option>
                <option value="OPERATIONS">Operations</option>
                <option value="SECURITY">Security</option>
                <option value="RESEARCH">Research</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Salary</label>
              <input 
                type="number"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-500 transition-all"
                value={formData.salary}
                onChange={e => setFormData({...formData, salary: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rating (1-5)</label>
              <input 
                type="number" min="1" max="5"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-500 transition-all"
                value={formData.rating}
                onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Performance Notes</label>
            <textarea 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-500 transition-all h-24 resize-none"
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
              placeholder="Enter observations..."
            />
          </div>
        </div>

        <button 
          onClick={() => onSubmit(formData)}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
        >
          <Check size={20} /> Create Employee
        </button>
      </motion.div>
    </div>
  );
};
