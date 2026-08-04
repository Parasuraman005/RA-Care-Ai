import { motion } from "motion/react";
import { 
  Activity, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Clock,
  Calendar as CalendarIcon,
  MessageCircle,
  ClipboardList,
  Sparkles,
  Heart,
  Droplets,
  Thermometer,
  Zap,
  ShieldCheck,
  ChevronRight,
  Moon,
  Footprints,
  GlassWater,
  Stethoscope,
  Smile,
  Pill
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn, getRiskColor } from "../lib/utils";
import { useState, useEffect } from "react";
import { UserProfile, SymptomLog, Vitals, Medication } from "../types";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function Dashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recentLogs, setRecentLogs] = useState<SymptomLog[]>([]);
  const [vitals, setVitals] = useState<Vitals | null>(null);
  const [meds, setMeds] = useState<Medication[]>([]);

  useEffect(() => {
    const savedProfile = localStorage.getItem("ra_profile");
    const savedLogs = localStorage.getItem("ra_logs");
    const savedMeds = localStorage.getItem("ra_meds");
    
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    
    if (savedLogs) {
      const logs = JSON.parse(savedLogs);
      setRecentLogs(logs.slice(-3).reverse());
    }

    if (savedMeds) {
      setMeds(JSON.parse(savedMeds));
    }

    // Mock Vitals for Dashboard
    setVitals({
      heartRate: 72,
      pulseRate: 72,
      spo2: 98,
      temperature: 98.6,
      bloodPressure: "120/80",
      weight: 165,
      bmi: 23.4,
      steps: 8432,
      distance: 5.2,
      calories: 450,
      lastUpdated: new Date().toISOString()
    });
  }, []);

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto space-y-4 md:space-y-8 p-4 md:p-8 pb-32"
    >
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 px-1 md:px-4">
        <div className="space-y-1 md:space-y-2">
          <p className="text-[10px] md:text-xs font-semibold text-primary uppercase tracking-widest font-inter">RA CARE AI OVERVIEW</p>
          <h1 className="text-2xl md:text-4xl font-poppins font-bold tracking-tight text-on-surface">
            Good Morning, {profile?.name?.split(' ')[0] || "Sarah"}
          </h1>
          <p className="text-sm md:text-lg text-on-surface-variant font-medium leading-relaxed">Your systemic health is stable today.</p>
        </div>
        <div className="flex">
          <Link 
            to="/assessment"
            className="md3-button-primary"
          >
            <Stethoscope className="w-4 h-4 md:w-5 md:h-5" />
            Quick Assessment
          </Link>
        </div>
      </div>

      {/* MD3 Health Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {/* Health Score - Large Donut Placeholder */}
        <motion.div variants={item} className="md3-card p-4 md:p-6 flex flex-col items-center justify-center text-center space-y-2 md:space-y-4 col-span-2 md:col-span-1">
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="64" cy="64" r="58" className="stroke-slate-100 dark:stroke-slate-800 fill-none" strokeWidth="12" />
              <circle cx="64" cy="64" r="58" className="stroke-primary fill-none" strokeWidth="12" strokeDasharray="364.4" strokeDashoffset="54.6" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl md:text-3xl font-poppins font-bold text-on-surface">85</span>
              <span className="text-[8px] md:text-[10px] font-bold text-on-surface-variant uppercase">Score</span>
            </div>
          </div>
          <p className="text-xs md:text-sm font-semibold text-on-surface font-inter">Excellent Health State</p>
        </motion.div>

        {/* Vital Stats Cards */}
        <div className="col-span-2 lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          <VitalCard icon={Heart} label="Heart Rate" value={vitals?.heartRate} unit="BPM" color="bg-rose-50 text-rose-600" />
          <VitalCard icon={Droplets} label="SpO2" value={vitals?.spo2} unit="%" color="bg-sky-50 text-sky-600" />
          <VitalCard icon={Thermometer} label="Temp" value={vitals?.temperature} unit="°F" color="bg-amber-50 text-amber-600" />
          <VitalCard icon={Footprints} label="Steps" value={vitals?.steps.toLocaleString()} unit="" color="bg-emerald-50 text-emerald-600" />
          <VitalCard icon={Moon} label="Sleep" value="7.5" unit="hrs" color="bg-indigo-50 text-indigo-600" />
          <VitalCard icon={GlassWater} label="Water" value="2.1" unit="L" color="bg-blue-50 text-blue-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          {/* AI Insights - Glassmorphism Accent */}
          <motion.div variants={item} className="md3-card p-5 md:p-8 bg-slate-950 text-white relative overflow-hidden group border-none">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start gap-4 md:gap-6">
              <div className="w-12 h-12 md:w-16 md:h-16 glass rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <div className="space-y-2 md:space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 md:px-3 md:py-1 bg-primary rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest">AI INSIGHT</span>
                  <span className="text-slate-400 text-[10px] md:text-xs">Generated 10m ago</span>
                </div>
                <h3 className="text-lg md:text-2xl font-poppins font-semibold leading-tight">
                  "Your activity levels are consistent with a <span className="text-primary">Low Flare Risk</span> profile today."
                </h3>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-xl">
                  Based on your sleep patterns and medication adherence, we predict stable joint mobility for the next 24 hours.
                </p>
                <button className="flex items-center gap-2 text-primary font-semibold text-xs md:text-sm hover:text-primary-hover transition-colors">
                  View Detailed Analysis
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions & Recent History */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <motion.div variants={item} className="md3-card p-5 md:p-6 space-y-4 md:space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm md:text-base font-poppins font-semibold text-on-surface">Current Pain Level</h3>
                <Smile className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <div 
                    key={n} 
                    className={cn(
                      "flex-1 h-10 md:h-12 rounded-lg flex items-center justify-center text-[10px] md:text-xs font-bold transition-all",
                      n === 2 
                        ? "bg-emerald-500 text-white scale-110 shadow-lg" 
                        : "bg-slate-50 dark:bg-slate-900 text-on-surface-variant"
                    )}
                  >
                    {n}
                  </div>
                ))}
              </div>
              <p className="text-[10px] md:text-xs text-on-surface-variant text-center font-medium">Mild discomfort in left wrist.</p>
            </motion.div>

            <motion.div variants={item} className="md3-card p-5 md:p-6 space-y-4 md:space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm md:text-base font-poppins font-semibold text-on-surface">Medication Status</h3>
                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center justify-between p-2 md:p-3 bg-primary/5 dark:bg-primary/10 rounded-xl">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Pill className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    <div>
                      <p className="text-xs md:text-sm font-semibold text-on-surface">Methotrexate</p>
                      <p className="text-[8px] md:text-[10px] text-on-surface-variant font-medium">Next: 8:00 PM</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Side Column */}
        <div className="space-y-6 md:space-y-8">
          {/* Upcoming Appointment */}
          <motion.div variants={item} className="md3-card p-5 md:p-6 space-y-4 md:space-y-6 bg-gradient-to-br from-surface to-primary/5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm md:text-base font-poppins font-semibold text-on-surface">Upcoming Visit</h3>
              <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </div>
            <div className="p-3 md:p-4 bg-surface rounded-2xl shadow-sm border border-outline/50">
              <p className="text-[8px] md:text-[10px] font-bold text-primary uppercase mb-1">RHEUMATOLOGIST</p>
              <p className="text-base md:text-lg font-poppins font-semibold text-on-surface leading-tight">Dr. Emily Thorne</p>
              <div className="flex items-center gap-2 mt-2 md:mt-3 text-xs md:text-sm text-on-surface-variant font-medium">
                <Clock className="w-3 h-3 md:w-4 md:h-4" />
                <span>Aug 12, 10:30 AM</span>
              </div>
            </div>
            <button className="md3-button-secondary w-full">Reschedule</button>
          </motion.div>

          {/* Quick Log Component */}
          <motion.div variants={item} className="md3-card p-5 md:p-6 space-y-4 md:space-y-6">
             <h3 className="text-sm md:text-base font-poppins font-semibold text-on-surface">Log Now</h3>
             <div className="grid grid-cols-2 gap-3 md:gap-4">
                <button className="flex flex-col items-center gap-1 md:gap-2 p-3 md:p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl hover:bg-primary/5 hover:text-primary transition-all group">
                   <ClipboardList className="w-5 h-5 md:w-6 md:h-6 text-on-surface-variant group-hover:text-primary" />
                   <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-tight">Symptoms</span>
                </button>
                <button className="flex flex-col items-center gap-1 md:gap-2 p-3 md:p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl hover:bg-primary/5 hover:text-primary transition-all group">
                   <Activity className="w-5 h-5 md:w-6 md:h-6 text-on-surface-variant group-hover:text-primary" />
                   <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-tight">Vitals</span>
                </button>
             </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function VitalCard({ icon: Icon, label, value, unit, color }: any) {
  return (
    <motion.div variants={item} className="md3-card p-5 space-y-3 group overflow-hidden relative border-none shadow-none bg-surface dark:bg-slate-900">
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6", color)}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="relative z-10">
        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-poppins font-bold text-on-surface">{value}</span>
          {unit && <span className="text-xs font-medium text-on-surface-variant">{unit}</span>}
        </div>
      </div>
      <div className={cn("absolute -bottom-6 -right-6 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity", color)} />
    </motion.div>
  );
}
