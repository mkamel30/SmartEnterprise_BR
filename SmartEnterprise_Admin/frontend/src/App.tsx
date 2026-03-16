import { LayoutDashboard, Building2, Settings, Shield, Activity, LogOut } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Branches from './pages/Branches';
import Parameters from './pages/Parameters';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthWrapper />
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

function AuthWrapper() {
  const { admin, loading } = useAuth();

  if (loading) return null;
  if (!admin) return <Login />;

  return <MainLayout />;
}

function MainLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname === '/' ? 'dashboard' : location.pathname.split('/')[1];

  return (
    <div className="flex h-screen bg-background font-sans">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-smart-purple text-white flex flex-col shadow-2xl z-20">
        <div className="p-8 border-b border-white/10">
          <div className="flex flex-col items-center gap-4">
            <img src="/logo.png" alt="Smart Enterprise" className="h-16 w-auto drop-shadow-lg" />
            <div className="text-center">
              <h1 className="text-white font-black text-xl tracking-tighter uppercase">
                Admin Portal
              </h1>
              <div className="h-1 w-12 bg-brand-cyan mx-auto mt-2 rounded-full shadow-glow"></div>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-3 mt-4">
          <NavItem 
            icon={<LayoutDashboard size={22} />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => navigate('/')} 
          />
          <NavItem 
            icon={<Building2 size={22} />} 
            label="Branches" 
            active={activeTab === 'branches'} 
            onClick={() => navigate('/branches')} 
          />
          <NavItem 
            icon={<Settings size={22} />} 
            label="Parameters" 
            active={activeTab === 'parameters'} 
            onClick={() => navigate('/parameters')} 
          />
          <NavItem 
            icon={<Activity size={22} />} 
            label="System Health" 
            active={activeTab === 'health'} 
            onClick={() => {}} 
          />
        </nav>

        <div className="p-6 border-t border-white/10 bg-black/10">
          <button 
            onClick={logout}
            className="flex items-center gap-3 text-white/70 hover:text-white transition-all w-full px-4 py-3 rounded-xl hover:bg-white/5 font-black uppercase tracking-widest text-xs"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-border h-20 flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-8 bg-brand-primary rounded-full"></div>
            <h2 className="font-black text-2xl text-brand-primary tracking-tighter uppercase">{activeTab}</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
               <div className="smart-badge smart-badge-success uppercase tracking-widest text-[10px]">
                 <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                 System Online
               </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white font-black text-sm shadow-lg shadow-brand-primary/20">A</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/branches" element={<Branches />} />
              <Route path="/parameters" element={<Parameters />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-black uppercase tracking-widest text-[11px] ${
        active 
          ? 'bg-white text-brand-primary shadow-xl shadow-black/20 transform scale-[1.02]' 
          : 'text-white/60 hover:text-white hover:bg-white/10'
      }`}
    >
      <span className={active ? 'text-brand-primary' : 'text-brand-cyan'}>{icon}</span>
      <span>{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-primary"></div>}
    </button>
  );
}

export default App;
