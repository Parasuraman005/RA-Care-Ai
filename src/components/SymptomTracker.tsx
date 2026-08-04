import { useState } from "react";
import { motion } from "motion/react";
import { 
  Save, 
  Plus, 
  Thermometer, 
  Droplets, 
  Moon, 
  Smile,
  Activity,
  ClipboardList,
  Scale,
  Zap,
  Waves,
  MessageSquare
} from "lucide-react";
import { cn } from "../lib/utils";
import { SymptomLog } from "../types";

export default function SymptomTracker() {
  const [log, setLog] = useState<Partial<SymptomLog>>({
    date: new Date().toISOString().split('T')[0],
    painLevel: 2,
    swellingLevel: 1,
    stiffnessMinutes: 15,
    fatigueLevel: 3,
    mood: "Calm",
    sleepHours: 7,
    exerciseMinutes: 20,
    waterIntake: 6,
    notes: ""
  });

  const handleSave = () => {
    const newLog = { ...log, id: Date.now().toString() } as SymptomLog;
    const savedLogs = localStorage.getItem("ra_logs");
    const logs = savedLogs ? JSON.parse(savedLogs) : [];
    logs.push(newLog);
    localStorage.setItem("ra_logs", JSON.stringify(logs));
    alert("Daily Health Log saved successfully!");
  };

  const Slider = ({ label, value, onChange, max = 10, min = 0, unit = "", color = "bg-indigo-600" }: any) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{label}</label>
        <div className="flex items-baseline gap-1">
          <span className={cn("text-2xl font-black", color.replace('bg-', 'text-'))}>{value}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{unit}</span>
        </div>
      </div>
      <div className="relative h-6 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 italic uppercase">Daily Health Logger</h1>
          <p className="text-slate-500 font-medium max-w-lg">Track your symptoms, lifestyle metrics, and mental well-being for AI-powered progress analysis.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <ClipboardList className="w-5 h-5 text-indigo-600" />
          <input 
            type="date" 
            value={log.date}
            onChange={(e) => setLog({ ...log, date: e.target.value })}
            className="bg-transparent border-none focus:ring-0 font-black text-slate-700 uppercase tracking-widest text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Core RA Symptoms */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-10"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 border border-rose-100 shadow-sm">
                <Thermometer className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Symptom Intensity</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pain, Swelling & Stiffness</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <Slider 
                label="Pain Severity" 
                value={log.painLevel} 
                onChange={(val: number) => setLog({ ...log, painLevel: val })} 
                color="bg-rose-600"
                unit="/ 10"
              />
              <Slider 
                label="Joint Swelling" 
                value={log.swellingLevel} 
                onChange={(val: number) => setLog({ ...log, swellingLevel: val })} 
                color="bg-amber-600"
                unit="/ 10"
              />
              <Slider 
                label="Morning Stiffness" 
                value={log.stiffnessMinutes} 
                max={180}
                unit="min"
                onChange={(val: number) => setLog({ ...log, stiffnessMinutes: val })} 
                color="bg-indigo-600"
              />
              <Slider 
                label="Fatigue Level" 
                value={log.fatigueLevel} 
                onChange={(val: number) => setLog({ ...log, fatigueLevel: val })} 
                color="bg-violet-600"
                unit="/ 10"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 border border-sky-100 shadow-sm">
                <Smile className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Well-being & Lifestyle</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mood, Sleep & Hydration</p>
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Mood</label>
                <div className="flex flex-wrap gap-3">
                  {["Calm", "Energetic", "Tired", "Irritated", "Happy", "Sad", "Anxious"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setLog({ ...log, mood: m })}
                      className={cn(
                        "px-6 py-3 rounded-2xl text-xs font-bold border-2 transition-all active:scale-95",
                        log.mood === m 
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-100" 
                          : "bg-slate-50 text-slate-500 border-slate-50 hover:border-slate-200"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Slider 
                  label="Sleep" 
                  value={log.sleepHours} 
                  max={12}
                  unit="h"
                  onChange={(val: number) => setLog({ ...log, sleepHours: val })} 
                  color="bg-indigo-600"
                />
                <Slider 
                  label="Exercise" 
                  value={log.exerciseMinutes} 
                  max={120}
                  unit="m"
                  onChange={(val: number) => setLog({ ...log, exerciseMinutes: val })} 
                  color="bg-emerald-600"
                />
                <Slider 
                  label="Water" 
                  value={log.waterIntake} 
                  max={15}
                  unit="cups"
                  onChange={(val: number) => setLog({ ...log, waterIntake: val })} 
                  color="bg-sky-600"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl space-y-6"
          >
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-indigo-400" />
              <h3 className="text-lg font-black uppercase tracking-tight">AI Observation</h3>
            </div>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              Based on your previous logs, you often report higher stiffness after sleeping less than 6 hours. Consider maintaining a consistent sleep schedule to reduce inflammation.
            </p>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Flare Risk Score</p>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">Low Risk</span>
            </div>
          </motion.div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-indigo-600" />
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">Notes</h3>
            </div>
            <textarea
              placeholder="e.g. Flare in left wrist, reaction to diet changes, weather influence..."
              value={log.notes}
              onChange={(e) => setLog({ ...log, notes: e.target.value })}
              className="w-full h-40 p-5 bg-slate-50 border-none rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold placeholder:text-slate-300 text-sm"
            />
          </div>

          <div className="space-y-4">
            <button
              onClick={handleSave}
              className="w-full bg-indigo-600 text-white py-6 rounded-3xl font-black text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 flex items-center justify-center gap-3 active:scale-95 uppercase tracking-widest"
            >
              <Save className="w-6 h-6" />
              Log Activity
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full py-4 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
            >
              Cancel Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
