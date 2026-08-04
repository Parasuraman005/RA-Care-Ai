import { useState } from "react";
import { motion } from "motion/react";
import { 
  Activity, 
  ShieldCheck, 
  Users, 
  Plus, 
  Search, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Heart,
  Droplets,
  Calendar,
  MessageCircle,
  FileText,
  ChevronRight
} from "lucide-react";
import { cn } from "../lib/utils";

export default function CaretakerPortal() {
  const [activeTab, setActiveTab] = useState<"Monitoring" | "Access">("Monitoring");
  const [searchId, setSearchId] = useState("");

  const mockPatient = {
    name: "Sarah Johnson",
    id: "#82910",
    vitals: { hr: 72, pulse: 72, spo2: 98, steps: 4230 },
    lastLog: "2 hours ago",
    status: "Stable",
    medicationAdherence: "95%",
    recentSymptoms: "Moderate stiffness in wrists",
    emergencyContact: "Primary Caretaker (Active)"
  };

  const StatusPill = ({ label, type }: { label: string; type: "stable" | "alert" | "warning" }) => {
    const colors = {
      stable: "text-emerald-700 bg-emerald-50 border-emerald-100",
      alert: "text-rose-700 bg-rose-50 border-rose-100 animate-pulse",
      warning: "text-amber-700 bg-amber-50 border-amber-100"
    };
    return (
      <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border", colors[type])}>
        {label}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 italic uppercase">Caretaker Monitoring Hub</h1>
          <p className="text-slate-500 font-medium">Real-time health telemetry and remote patient assistance.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          {["Monitoring", "Access"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                activeTab === tab ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:text-slate-900"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Access" ? (
        <div className="bg-white p-12 rounded-[3rem] border border-slate-200 shadow-sm text-center space-y-8">
          <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto">
            <Users className="text-indigo-600 w-10 h-10" />
          </div>
          <div className="max-w-md mx-auto space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Request Patient Access</h2>
            <p className="text-slate-500 font-medium">
              Enter a unique Patient ID or scan their QR code. Access must be approved by the patient for secure data sharing.
            </p>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Enter Patient ID (e.g. #82910)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full p-5 pr-14 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold placeholder:font-medium transition-all"
              />
              <button className="absolute right-3 top-3 p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient Quick Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <StatusPill label="Stable" type="stable" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">{mockPatient.name}</h3>
                  <p className="text-indigo-400 font-bold text-xs uppercase tracking-widest">Patient ID: {mockPatient.id}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Heart Rate</p>
                    <p className="text-xl font-black">{mockPatient.vitals.hr} <span className="text-[10px] font-medium opacity-50 uppercase">bpm</span></p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">SpO2</p>
                    <p className="text-xl font-black">{mockPatient.vitals.spo2}%</p>
                  </div>
                </div>
                <button className="w-full py-4 bg-indigo-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-500 transition-all">
                  <MessageCircle className="w-4 h-4" />
                  Message Patient
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
              <h4 className="font-black text-slate-900 flex items-center gap-2 uppercase tracking-tight text-sm">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                Attention Required
              </h4>
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 items-start">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-amber-900">Missed Morning Dose</p>
                    <p className="text-[10px] font-medium text-amber-700">Methotrexate not logged today.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Monitoring Board */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">Daily Activity</h4>
                  <TrendingUp className="text-indigo-600 w-5 h-5" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-800">{mockPatient.vitals.steps.toLocaleString()}</span>
                  <span className="text-sm font-bold text-slate-400 uppercase">Steps</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 w-1/2" />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">42% of daily goal</p>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">Adherence Score</h4>
                  <ShieldCheck className="text-emerald-500 w-5 h-5" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-emerald-600">{mockPatient.medicationAdherence}</span>
                  <span className="text-sm font-bold text-slate-400 uppercase">Adherence</span>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                  Excellent consistency over the last 30 days. No significant gaps.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">Remote Health Timeline</h4>
                <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                </div>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { time: "10:30 AM", event: "Vitals Sync", detail: "HR: 74, SpO2: 98%", icon: Activity },
                  { time: "09:00 AM", event: "Symptom Log", detail: "Pain: 3/10, Stiffness: 20m", icon: FileText },
                  { time: "08:15 AM", event: "Wake Up", detail: "Sleep: 7h 20m, Quality: High", icon: Calendar },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{item.event}</p>
                        <p className="text-xs font-medium text-slate-500">{item.detail}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase">{item.time}</span>
                  </div>
                ))}
              </div>
              <button className="w-full p-4 text-xs font-black text-indigo-600 uppercase tracking-widest hover:bg-indigo-50 transition-colors border-t border-slate-100">
                View Full Detailed Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
