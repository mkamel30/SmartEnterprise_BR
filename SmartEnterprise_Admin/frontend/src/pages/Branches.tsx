import { useState, useEffect } from 'react';
import adminClient from '../api/adminClient';
import { Plus, RefreshCw, Building2, Key, Edit2, Trash2, X, Check, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Branches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', code: '', authorizedHWID: '' });

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const res = await adminClient.get('/branches');
      setBranches(res.data);
    } catch (error) {
      toast.error('Failed to fetch branches');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleOpenModal = (branch: any = null) => {
    if (branch) {
      setEditingBranch(branch);
      setFormData({ 
        name: branch.name, 
        code: branch.code, 
        authorizedHWID: branch.authorizedHWID || '' 
      });
    } else {
      setEditingBranch(null);
      setFormData({ name: '', code: '', authorizedHWID: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBranch) {
        await adminClient.put(`/branches/${editingBranch.id}`, formData);
        toast.success('Branch updated successfully');
      } else {
        await adminClient.post('/branches', formData);
        toast.success('Branch registered successfully');
      }
      setIsModalOpen(false);
      fetchBranches();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save branch');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this branch? All associated data will be lost.')) return;
    try {
      await adminClient.delete(`/branches/${id}`);
      toast.success('Branch deleted');
      fetchBranches();
    } catch (error) {
      toast.error('Failed to delete branch');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('API Key copied to clipboard');
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-brand-primary tracking-tighter uppercase italic">Branch Registry</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1 italic">Manage and monitor all connected enterprise branches.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={fetchBranches} className="h-14 w-14 flex items-center justify-center bg-white border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
            <RefreshCw size={22} className={`${loading ? 'animate-spin text-brand-primary' : 'text-slate-400'}`} />
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="smart-btn-primary !h-14 flex items-center gap-3 px-8 uppercase tracking-[0.2em] text-[11px]"
          >
            <Plus size={20} />
            <span>Add Branch</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {branches.length === 0 ? (
          <div className="col-span-full smart-card border-none bg-white p-20 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-cyan/20"></div>
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-primary/20 group-hover:scale-110 transition-transform">
              <Building2 size={48} />
            </div>
            <h3 className="font-black text-brand-primary text-3xl tracking-tighter uppercase mb-4">No branches registered</h3>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs max-w-sm mx-auto leading-relaxed">
              Connect your first branch to start receiving real-time data and managing parameters centrally.
            </p>
          </div>
        ) : (
          branches.map((branch: any) => (
            <div key={branch.id} className="smart-card group hover-lift border-none overflow-hidden bg-white">
               <div className={`h-2 w-full ${branch.status === 'ONLINE' ? 'bg-success' : 'bg-slate-200'}`}></div>
               <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                    <div className="bg-slate-50 p-5 rounded-3xl group-hover:bg-brand-primary/5 transition-colors">
                      <Building2 className="text-brand-primary" size={28} />
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <StatusBadge status={branch.status} />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{branch.code}</span>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="font-black text-2xl text-brand-primary tracking-tighter uppercase mb-2 leading-none">{branch.name}</h3>
                    <div className="flex items-center gap-3 py-3 px-4 bg-slate-50 rounded-xl border border-slate-100">
                      <Key size={14} className="text-brand-cyan" />
                      <code className="text-[10px] font-black text-brand-primary/60 truncate flex-1">{branch.apiKey}</code>
                      <button onClick={() => copyToClipboard(branch.apiKey)} className="text-brand-cyan hover:text-brand-primary transition-colors">
                         <Copy size={14} />
                      </button>
                    </div>
                </div>

                {branch.authorizedHWID && (
                  <div className="mb-8 p-5 bg-brand-primary/5 rounded-3xl border-2 border-brand-primary/5">
                      <p className="text-[9px] font-black text-brand-primary/40 uppercase tracking-[0.3em] mb-2">Authenticated PC HWID</p>
                      <p className="text-[10px] font-black text-brand-primary truncate">{branch.authorizedHWID}</p>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                    <div className="flex flex-col">
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Last Network Pulse</p>
                      <p className="text-[10px] font-black text-slate-500 uppercase">
                        {branch.lastSeen ? new Date(branch.lastSeen).toLocaleString() : 'Never Active'}
                      </p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                      <button 
                        onClick={() => handleOpenModal(branch)}
                        className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-brand-primary hover:bg-slate-50 rounded-xl transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(branch.id)}
                        className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-destructive hover:bg-destructive/5 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                </div>
               </div>
            </div>
          ))
        )}
      </div>

      {/* BRANCH MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-primary/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[3rem] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-white/20">
            <div className="relative p-12">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 text-slate-300 hover:text-brand-primary transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-10 text-center">
                <div className="w-20 h-20 bg-brand-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 size={36} className="text-brand-primary" />
                </div>
                <h3 className="font-black text-3xl text-brand-primary tracking-tighter uppercase italic">
                  {editingBranch ? 'Edit Branch' : 'New Branch'}
                </h3>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] mt-2">
                  Enterprise Infrastructure Node
                </p>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-primary/60 uppercase tracking-widest ml-4">Branch Identity</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="smart-input h-14 px-6 text-brand-primary font-black uppercase tracking-tight"
                    placeholder="e.g., Cairo Main Hub"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-primary/60 uppercase tracking-widest ml-4">Network Code</label>
                  <input 
                    type="text" 
                    required
                    value={formData.code}
                    onChange={e => setFormData({ ...formData, code: e.target.value })}
                    className="smart-input h-14 px-6 text-brand-primary font-black uppercase tracking-widest"
                    placeholder="e.g., BR001"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-primary/60 uppercase tracking-widest ml-4 flex justify-between">
                    <span>Authorized HWID</span>
                    <span className="text-brand-cyan lowercase normal-case opacity-60">Optional Security Layer</span>
                  </label>
                  <input 
                    type="text" 
                    value={formData.authorizedHWID}
                    onChange={e => setFormData({ ...formData, authorizedHWID: e.target.value })}
                    className="smart-input h-14 px-6 text-brand-primary font-bold"
                    placeholder="Hardware binding string"
                  />
                </div>

                <div className="pt-8 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 h-14 flex items-center justify-center font-black text-slate-400 rounded-2xl hover:bg-slate-50 transition-colors uppercase tracking-widest text-[10px]"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 h-14 bg-brand-primary text-white flex items-center justify-center gap-2 font-black rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-[10px]"
                  >
                    <Check size={18} />
                    {editingBranch ? 'Update Node' : 'Register Node'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    ONLINE: 'bg-green-100 text-green-700 border-green-200',
    OFFLINE: 'bg-slate-100 text-slate-600 border-slate-200',
    MAINTENANCE: 'bg-amber-100 text-amber-700 border-amber-200',
  };
  return (
    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter border ${styles[status as keyof typeof styles] || styles.OFFLINE}`}>
      {status}
    </span>
  );
}
