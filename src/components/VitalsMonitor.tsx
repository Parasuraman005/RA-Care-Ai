import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Bluetooth, 
  RefreshCcw, 
  Heart, 
  Zap, 
  Activity, 
  Moon, 
  Footprints,
  Droplets,
  AlertCircle,
  Thermometer,
  Stethoscope,
  Scale,
  Plus,
  Info
} from "lucide-react";
import { Vitals } from "../types";
import { cn } from "../lib/utils";

export default function VitalsMonitor() {
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [vitals, setVitals] = useState<Vitals | null>(null);

  // Simulate Bluetooth Connection and Data
  const connectDevice = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsSyncing(false);
      setVitals({
        heartRate: 72,
        pulseRate: 72,
        spo2: 98,
        temperature: 98.6,
        bloodPressure: "120/80",
        weight: 165,
        bmi: 23.4,
        steps: 4230,
        distance: 2.8,
        calories: 340,
        lastUpdated: new Date().toISOString()
      });
    }, 2000);
  };

  const VitalCard = ({ label, value, unit, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
      <div className="relative z-10 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-800">{value}</span>
            <span className="text-sm font-bold text-slate-400">{unit}</span>
          </div>
        </div>
        <div className={cn("p-3 rounded-2xl", color)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-slate-50 rounded-full group-hover:scale-150 transition-transform" />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="flex items-center gap-6">
          <div className={cn(
            "w-16 h-16 rounded-[2rem] flex items-center justify-center transition-all duration-500",
            isConnected ? "bg-emerald-600 shadow-lg shadow-emerald-100 rotate-12" : "bg-slate-100"
          )}>
            <Bluetooth className={cn("w-8 h-8", isConnected ? "text-white -rotate-12" : "text-slate-400")} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              {isConnected ? "Smartwatch Connected" : "Connect Wearable Device"}
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base">
              {isConnected ? "Real-time vitals being synchronized via Bluetooth" : "Link your device to automatically sync health metrics."}
            </p>
          </div>
        </div>
        <button
          onClick={connectDevice}
          disabled={isSyncing}
          className={cn(
            "px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-3 active:scale-95 shadow-lg whitespace-nowrap",
            isConnected 
              ? "bg-slate-900 text-white hover:bg-slate-800" 
              : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100"
          )}
        >
          {isSyncing ? (
            <RefreshCcw className="w-5 h-5 animate-spin" />
          ) : isConnected ? (
            <RefreshCcw className="w-5 h-5" />
          ) : (
            <Bluetooth className="w-5 h-5" />
          )}
          {isSyncing ? "Connecting..." : isConnected ? "Sync Now" : "Connect Device"}
        </button>
      </div>

      {!isConnected ? (
        <div className="bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-[3rem] py-24 text-center space-y-6">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-sm">
            <Bluetooth className="text-indigo-200 w-10 h-10" />
          </div>
          <div className="space-y-2 px-6">
            <h2 className="text-xl font-bold text-indigo-900">No Device Linked</h2>
            <p className="text-indigo-600/60 max-w-xs mx-auto font-medium">
              Pair your Fitbit, Apple Watch, or other Bluetooth wearables to see live health data.
            </p>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Primary Vitals */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <VitalCard 
              label="Heart Rate" 
              value={vitals?.heartRate} 
              unit="BPM" 
              icon={Heart} 
              color="bg-rose-50 text-rose-600" 
            />
            <VitalCard 
              label="Blood Oxygen" 
              value={vitals?.spo2} 
              unit="%" 
              icon={Droplets} 
              color="bg-sky-50 text-sky-600" 
            />
            <VitalCard 
              label="Temperature" 
              value={vitals?.temperature} 
              unit="°F" 
              icon={Thermometer} 
              color="bg-orange-50 text-orange-600" 
            />
            <VitalCard 
              label="Blood Pressure" 
              value={vitals?.bloodPressure} 
              unit="mmHg" 
              icon={Stethoscope} 
              color="bg-indigo-50 text-indigo-600" 
            />
          </div>

          {/* Activity & Body Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <Footprints className="w-8 h-8 text-emerald-400 mb-4" />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Daily Steps</p>
                    <p className="text-4xl font-black">{vitals?.steps.toLocaleString()}</p>
                  </div>
                  <div className="mt-8 space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500">
                      <span>Goal: 10,000</span>
                      <span>{Math.round((vitals?.steps || 0) / 100)}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400" style={{ width: `${(vitals?.steps || 0) / 100}%` }} />
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl" />
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <Scale className="w-8 h-8 text-slate-400 mb-4" />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Weight Tracking</p>
                    <p className="text-4xl font-black text-slate-800">{vitals?.weight} <span className="text-sm text-slate-400">lbs</span></p>
                  </div>
                  <button className="p-2 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <Plus className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calculated BMI</p>
                    <p className="text-lg font-black text-indigo-600">{vitals?.bmi}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase">Healthy</span>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100 space-y-6">
              <div className="flex items-center justify-between">
                <Moon className="w-7 h-7 text-indigo-200" />
                <span className="text-[10px] font-black uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">Sleep Monitor</span>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black">7h 42m</p>
                <p className="text-sm font-medium text-indigo-100">Deep sleep: 2h 15m</p>
              </div>
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-indigo-200" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-indigo-100">Quality Score</p>
                    <p className="text-lg font-black">88%</p>
                  </div>
                </div>
                <p className="text-xs text-indigo-100/70 leading-relaxed font-medium">
                  Your sleep duration is within the recommended range for RA recovery. Good rest helps reduce morning stiffness.
                </p>
              </div>
            </div>
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <Activity className="w-6 h-6 text-indigo-400 mb-4" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Exercise Duration</p>
              <p className="text-2xl font-black text-slate-800">45 <span className="text-sm font-medium">min</span></p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <Droplets className="w-6 h-6 text-sky-400 mb-4" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Water Intake</p>
              <p className="text-2xl font-black text-slate-800">1.8 <span className="text-sm font-medium">L</span></p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <Zap className="w-6 h-6 text-amber-400 mb-4" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calories Burned</p>
              <p className="text-2xl font-black text-slate-800">{vitals?.calories} <span className="text-sm font-medium">kcal</span></p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <Info className="w-6 h-6 text-slate-400 mb-4" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Distance</p>
              <p className="text-2xl font-black text-slate-800">{vitals?.distance} <span className="text-sm font-medium">km</span></p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-amber-50 border border-amber-100 flex gap-4">
            <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm text-amber-900 font-bold">Smart Health Insight</p>
              <p className="text-sm text-amber-800 leading-relaxed font-medium">
                Your pulse rate is slightly higher than your baseline today. Combined with your activity levels, this can sometimes be an early indicator of a systemic inflammatory response (RA flare). We recommend logging any joint stiffness in the Daily Tracker.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
