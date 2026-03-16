import { LayoutDashboard, Users, Package, CreditCard, Activity, ArrowUpRight } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-brand-primary tracking-tighter uppercase italic">Executive Overview</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">Real-time consolidated data across the entire enterprise network.</p>
        </div>
        <div className="flex gap-2">
           <div className="h-1.5 w-8 bg-brand-cyan rounded-full"></div>
           <div className="h-1.5 w-4 bg-brand-primary/10 rounded-full"></div>
           <div className="h-1.5 w-4 bg-brand-primary/10 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricCard icon={<Activity className="text-brand-cyan" size={24} />} label="Online Branches" value="0/0" trend="+0" color="bg-brand-primary" />
        <MetricCard icon={<Package className="text-white" size={24} />} label="Total Inventory" value="0" trend="+0%" color="bg-brand-purple" />
        <MetricCard icon={<Users className="text-white" size={24} />} label="Avg. Productivity" value="0%" trend="-0%" color="bg-brand-orange" />
        <MetricCard icon={<CreditCard className="text-white" size={24} />} label="Monthly Rev" value="$0k" trend="+0%" color="bg-brand-green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 smart-card overflow-hidden">
           <div className="bg-slate-50 border-b border-border p-6 flex justify-between items-center">
              <h3 className="font-black text-lg text-brand-primary tracking-tighter uppercase">Performance Comparison</h3>
              <select className="smart-select !w-auto h-10 text-[10px] font-black uppercase tracking-widest">
                <option>Last 30 Days</option>
              </select>
           </div>
           <div className="p-8">
              <div className="h-80 flex flex-col items-center justify-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-4 text-slate-300">
                    <Activity size={32} />
                 </div>
                 <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] text-center max-w-[200px]">
                    Chart visualization will appear here once branches are connected.
                 </p>
              </div>
           </div>
        </div>

        <div className="smart-card flex flex-col">
           <div className="bg-brand-primary text-white p-6">
              <h3 className="font-black text-lg tracking-tighter uppercase">Recent Activities</h3>
           </div>
           <div className="p-8 flex-1 space-y-6">
              <ActivityItem text="Portal initialized" time="Just now" color="bg-brand-cyan" />
              <ActivityItem text="Super admin created" time="Just now" color="bg-brand-pink" />
              <div className="mt-10 pt-6 border-t border-border">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">System Log v1.0</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, trend, color }: any) {
  return (
    <div className={`smart-card border-none hover-lift group overflow-hidden relative`}>
      <div className={`absolute top-0 left-0 w-1.5 h-full ${color}`}></div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className={`${color} p-4 rounded-2xl shadow-lg shadow-black/5 transform group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
          <div className="smart-badge smart-badge-primary uppercase tracking-widest text-[9px]">
            {trend}
            <ArrowUpRight size={10} className="ml-1" />
          </div>
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</p>
        <p className="text-4xl font-black text-brand-primary tracking-tighter">{value}</p>
      </div>
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-50 rounded-full opacity-50 group-hover:scale-150 transition-transform"></div>
    </div>
  );
}

function ActivityItem({ text, time, color }: any) {
  return (
    <div className="flex gap-5 group">
       <div className={`w-3 h-3 rounded-full ${color} mt-1.5 shrink-0 shadow-lg shadow-black/5 group-hover:scale-125 transition-transform`} />
       <div className="space-y-1">
         <p className="text-sm font-black text-brand-primary uppercase tracking-tight">{text}</p>
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{time}</p>
       </div>
    </div>
  );
}
