import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Pill, 
  Plus, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Bell,
  Calendar,
  History,
  AlertTriangle,
  Package,
  Camera,
  Notebook
} from "lucide-react";
import { Medication } from "../types";
import { cn } from "../lib/utils";

export default function MedicationManager() {
  const [meds, setMeds] = useState<Medication[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [showJournal, setShowJournal] = useState<string | null>(null);
  const [newMed, setNewMed] = useState<Partial<Medication>>({
    name: "",
    dosage: "",
    frequency: "Daily",
    times: ["08:00"],
    active: true,
    stockCount: 30,
    refillReminder: true,
    sideEffects: [],
    history: []
  });

  const handleImageUpload = (id: string) => {
    // Simulation of image upload
    alert(`Scanning and uploading medication image for med ID: ${id}... Success!`);
  };

  const handleJournalEntry = (id: string) => {
    const entry = prompt("Log a side effect or observation for this medication:");
    if (entry) {
      const updated = meds.map(m => {
        if (m.id === id) {
          return { ...m, sideEffects: [...m.sideEffects, entry] };
        }
        return m;
      });
      setMeds(updated);
      localStorage.setItem("ra_meds", JSON.stringify(updated));
    }
  };

  useEffect(() => {
    const savedMeds = localStorage.getItem("ra_meds");
    if (savedMeds) {
      setMeds(JSON.parse(savedMeds));
    } else {
      // Mock initial data
      const initialMeds: Medication[] = [
        {
          id: "1",
          name: "Methotrexate",
          dosage: "15mg",
          frequency: "Weekly",
          times: ["08:00"],
          active: true,
          stockCount: 12,
          refillReminder: true,
          sideEffects: ["Nausea", "Fatigue"],
          history: [
            { date: "2026-08-01", taken: true },
            { date: "2026-07-25", taken: true }
          ]
        },
        {
          id: "2",
          name: "Folic Acid",
          dosage: "1mg",
          frequency: "Daily",
          times: ["09:00"],
          active: true,
          stockCount: 45,
          refillReminder: true,
          sideEffects: [],
          history: [
            { date: "2026-08-03", taken: true },
            { date: "2026-08-04", taken: true }
          ]
        }
      ];
      setMeds(initialMeds);
      localStorage.setItem("ra_meds", JSON.stringify(initialMeds));
    }
  }, []);

  const saveMed = () => {
    if (!newMed.name || !newMed.dosage) return;
    const med = { ...newMed, id: Date.now().toString() } as Medication;
    const updated = [...meds, med];
    setMeds(updated);
    localStorage.setItem("ra_meds", JSON.stringify(updated));
    setIsAdding(false);
    setNewMed({ 
      name: "", 
      dosage: "", 
      frequency: "Daily", 
      times: ["08:00"], 
      active: true, 
      stockCount: 30, 
      refillReminder: true, 
      sideEffects: [], 
      history: [] 
    });
  };

  const deleteMed = (id: string) => {
    const updated = meds.filter(m => m.id !== id);
    setMeds(updated);
    localStorage.setItem("ra_meds", JSON.stringify(updated));
  };

  const markAsTaken = (id: string) => {
    const updated = meds.map(m => {
      if (m.id === id) {
        const today = new Date().toISOString().split('T')[0];
        const alreadyTaken = m.history.some(h => h.date === today);
        if (alreadyTaken) return m;
        return {
          ...m,
          stockCount: Math.max(0, m.stockCount - 1),
          history: [{ date: today, taken: true }, ...m.history]
        };
      }
      return m;
    });
    setMeds(updated);
    localStorage.setItem("ra_meds", JSON.stringify(updated));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">💊 Medication & Pharmacy</h1>
          <p className="text-slate-500 font-medium">Smart reminders, adherence tracking, and supply management.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
        >
          <Plus className="w-5 h-5" />
          Add Medication
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white p-8 rounded-[2.5rem] border-2 border-indigo-100 shadow-2xl relative z-20"
          >
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-tight">
              <Plus className="w-5 h-5 text-indigo-600" />
              New Prescription
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Medication Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Methotrexate"
                  value={newMed.name}
                  onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                  className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Dosage</label>
                <input 
                  type="text" 
                  placeholder="e.g. 15mg"
                  value={newMed.dosage}
                  onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                  className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Frequency</label>
                <select 
                  value={newMed.frequency}
                  onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                  className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold appearance-none"
                >
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>As needed</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Reminder Time</label>
                <input 
                  type="time" 
                  value={newMed.times?.[0]}
                  onChange={(e) => setNewMed({ ...newMed, times: [e.target.value] })}
                  className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Initial Stock</label>
                <input 
                  type="number" 
                  value={newMed.stockCount}
                  onChange={(e) => setNewMed({ ...newMed, stockCount: parseInt(e.target.value) })}
                  className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button 
                onClick={saveMed}
                className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-100"
              >
                Save Medication
              </button>
              <button 
                onClick={() => setIsAdding(false)}
                className="px-12 py-5 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all uppercase tracking-widest text-sm"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {meds.length > 0 ? (
          meds.map((med) => (
            <motion.div 
              key={med.id}
              layout
              className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 shadow-sm">
                    <Pill className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{med.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{med.dosage}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-200" />
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{med.frequency}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleImageUpload(med.id)}
                    className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                    title="Upload Medication Image"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => deleteMed(med.id)}
                    className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Package className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Supply Left</span>
                  </div>
                  <p className={cn(
                    "text-xl font-black",
                    med.stockCount < 5 ? "text-rose-600" : "text-slate-800"
                  )}>
                    {med.stockCount} <span className="text-xs font-medium opacity-50 uppercase">units</span>
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Next Dose</span>
                  </div>
                  <p className="text-xl font-black text-slate-800">{med.times[0]}</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-100 relative z-10">
                <div className="flex flex-wrap gap-2">
                  {med.sideEffects.map((effect, idx) => (
                    <span key={idx} className="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-100 flex items-center gap-1.5">
                      <AlertTriangle className="w-3 h-3" />
                      {effect}
                    </span>
                  ))}
                  <button 
                    onClick={() => handleJournalEntry(med.id)}
                    className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-100 hover:bg-slate-100 transition-colors"
                  >
                    + Add Side Effect
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <button 
                    onClick={() => markAsTaken(med.id)}
                    className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-50"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Mark Taken
                  </button>
                  <button 
                    onClick={() => handleJournalEntry(med.id)}
                    className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-all border border-slate-100"
                    title="Side Effect Journal"
                  >
                    <Notebook className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700" />
            </motion.div>
          ))
        ) : (
          <div className="md:col-span-2 bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-20 text-center space-y-6">
            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto border border-slate-100 shadow-sm rotate-12">
              <Pill className="text-slate-300 w-12 h-12 -rotate-12" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900 uppercase">No Medications Found</h3>
              <p className="text-slate-500 font-medium max-w-xs mx-auto">
                Keep track of your RA prescriptions, dosage history, and stock levels in one place.
              </p>
            </div>
            <button 
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
            >
              <Plus className="w-5 h-5" />
              Add First Prescription
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 italic">Pharmacy Analytics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/20">
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-2">Weekly Adherence</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-black">98.2%</p>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/20">
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-2">Pending Refills</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-black">2</p>
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                </div>
              </div>
            </div>
            <p className="mt-8 text-indigo-100 text-sm font-medium leading-relaxed italic opacity-80">
              "Consistency is key. Your current streak is 14 days without missing a single dose. This significantly reduces the risk of inflammation flare-ups."
            </p>
          </div>
          <History className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 group-hover:rotate-12 transition-transform duration-1000" />
        </div>

        <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm space-y-6">
          <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-600" />
            Recent History
          </h4>
          <div className="space-y-4">
            {meds.slice(0, 3).flatMap(m => m.history.slice(0, 1).map((h, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{m.name}</p>
                    <p className="text-[10px] font-medium text-slate-500 uppercase">{h.date}</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-emerald-600 uppercase">Taken</span>
              </div>
            )))}
          </div>
          <button className="w-full py-4 text-xs font-black text-indigo-600 uppercase tracking-widest hover:bg-indigo-50 transition-colors border-t border-slate-100 mt-2">
            Full Medication Journal
          </button>
        </div>
      </div>
    </div>
  );
}

function TrendingUp({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}
