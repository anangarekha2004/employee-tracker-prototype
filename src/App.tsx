import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Users, ClipboardCheck, UserCircle } from 'lucide-react';
import { useDatabase } from './hooks/useDatabase';
import { Dashboard } from './components/Dashboard';
import { EmployeeList } from './components/EmployeeList';
import { Attendance } from './components/Attendance';
import { View } from './types';
import { cn } from './lib/utils';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('DASHBOARD');
  const { employees, attendance, loading, addEmployee, updateEmployee, deleteEmployee, markAttendance } = useDatabase();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50 text-slate-400">
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-lg font-medium"
        >
          Loading system data...
        </motion.div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'DASHBOARD':
        return <Dashboard employees={employees} attendance={attendance} />;
      case 'EMPLOYEES':
        return (
          <EmployeeList 
            employees={employees} 
            onAdd={addEmployee} 
            onUpdate={updateEmployee} 
            onDelete={deleteEmployee} 
          />
        );
      case 'ATTENDANCE':
        return (
          <Attendance 
            employees={employees} 
            attendance={attendance} 
            onMark={markAttendance} 
          />
        );
      case 'PROFILE':
        return <ProfileView />;
      default:
        return <Dashboard employees={employees} attendance={attendance} />;
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-50 flex flex-col">
      <header className="p-4 border-b border-slate-200 flex justify-between items-center bg-white shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            E
          </div>
          <span className="font-bold text-slate-800 tracking-tight">EmployeeTracker Pro</span>
        </div>
        <div className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded">
          v2.4.0 Stable
        </div>
      </header>

      <main className="flex-1 overflow-y-auto z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-2 flex justify-around items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <NavButton 
          active={currentView === 'DASHBOARD'} 
          onClick={() => setCurrentView('DASHBOARD')}
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
        />
        <NavButton 
          active={currentView === 'EMPLOYEES'} 
          onClick={() => setCurrentView('EMPLOYEES')}
          icon={<Users size={20} />}
          label="Employees"
        />
        <NavButton 
          active={currentView === 'ATTENDANCE'} 
          onClick={() => setCurrentView('ATTENDANCE')}
          icon={<ClipboardCheck size={20} />}
          label="Attendance"
        />
        <NavButton 
          active={currentView === 'PROFILE'} 
          onClick={() => setCurrentView('PROFILE')}
          icon={<UserCircle size={20} />}
          label="Profile"
        />
      </nav>
    </div>
  );
}

const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex flex-col items-center gap-1 transition-all duration-200 px-4 py-1 rounded-lg",
      active ? "text-blue-600 bg-blue-50" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
    )}
  >
    {icon}
    <span className="text-[10px] font-semibold">{label}</span>
  </button>
);

const ProfileView = () => (
  <div className="p-6 max-w-2xl mx-auto space-y-6">
    <h1 className="text-2xl font-bold text-slate-900">Administrator Profile</h1>
    
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 flex flex-col items-center text-center space-y-6">
      <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
        <UserCircle size={64} />
      </div>
      <div>
        <h2 className="text-xl font-bold text-slate-900">Admin User</h2>
        <p className="text-sm text-slate-500">System Administrator</p>
      </div>
      <div className="w-full space-y-3 text-sm text-left">
        <div className="flex justify-between border-b border-slate-100 pb-2">
          <span className="text-slate-500">Access Level:</span>
          <span className="font-semibold text-slate-900">Super Admin</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-2">
          <span className="text-slate-500">Session Uptime:</span>
          <span className="font-semibold text-slate-900">02:45:12</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-2">
          <span className="text-slate-500">Primary Office:</span>
          <span className="font-semibold text-slate-900">HQ - San Francisco</span>
        </div>
      </div>
      <button className="w-full bg-red-50 text-red-600 font-bold py-3 rounded-xl hover:bg-red-100 transition-all">
        Sign Out
      </button>
    </div>
  </div>
);
