import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import adminClient from '../api/adminClient';
import { Shield, Lock, User, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await adminClient.post('/auth/login', { username, password });
      login(res.data.admin, res.data.token);
      toast.success('Welcome back, Admin');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-smart-purple flex items-center justify-center p-6 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-brand-cyan/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-brand-pink/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20">
          <div className="text-center mb-10">
            <img src="/logo.png" alt="Smart Enterprise" className="h-20 w-auto mx-auto mb-8 drop-shadow-md" />
            <h1 className="text-4xl font-black text-brand-primary tracking-tighter uppercase italic">
              Central Portal
            </h1>
            <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mt-3 opacity-60">
              Executive Authentication
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-primary uppercase tracking-widest ml-2">Access ID</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-primary/30" size={18} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl pl-14 pr-6 focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary outline-none transition-all font-bold text-brand-primary placeholder:text-slate-300" 
                  placeholder="Enter administrator ID"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-primary uppercase tracking-widest ml-2">Secure Key</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-primary/30" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl pl-14 pr-6 focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary outline-none transition-all font-bold text-brand-primary placeholder:text-slate-300" 
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-16 bg-gradient-smart-blue text-white font-black rounded-2xl shadow-2xl shadow-brand-primary/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group disabled:opacity-70 uppercase tracking-widest text-xs"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  <span>Authorize Access</span>
                  <Shield size={18} className="group-hover:rotate-12 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="mt-10 flex flex-col items-center gap-2">
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
            Protected by Enterprise Shield v2.0
          </p>
          <div className="h-1 w-12 bg-brand-cyan/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
