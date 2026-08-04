import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Moon, 
  Sun, 
  Languages, 
  Bell, 
  Bluetooth, 
  Shield, 
  Lock, 
  LogOut,
  ChevronRight,
  User,
  Smartphone
} from "lucide-react";
import { cn } from "../lib/utils";

export default function Settings({ onLogout }: { onLogout: () => void }) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);

  const SettingToggle = ({ icon: Icon, label, value, onChange, color = "text-blue-600", bg = "bg-blue-50" }: any) => (
    <div className="flex items-center justify-between p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", bg, color)}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{label}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{value ? "Enabled" : "Disabled"}</p>
        </div>
      </div>
      <button 
        onClick={() => onChange(!value)}
        className={cn(
          "w-14 h-8 rounded-full transition-all relative p-1",
          value ? "bg-blue-600" : "bg-slate-200"
        )}
      >
        <div className={cn(
          "w-6 h-6 bg-white rounded-full shadow-sm transition-all transform",
          value ? "translate-x-6" : "translate-x-0"
        )} />
      </button>
    </div>
  );

  const SettingLink = ({ icon: Icon, label, sublabel, color = "text-slate-600", bg = "bg-slate-50" }: any) => (
    <button className="w-full flex items-center justify-between p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:border-blue-200 transition-all group">
      <div className="flex items-center gap-4">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", bg, color)}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-left">
          <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{label}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sublabel}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-24 px-4">
      <div className="space-y-1">
        <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">Configuration</p>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 italic uppercase">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Preferences</h3>
          <SettingToggle 
            icon={darkMode ? Moon : Sun} 
            label="Dark Mode" 
            value={darkMode} 
            onChange={setDarkMode}
            color="text-indigo-600"
            bg="bg-indigo-50"
          />
          <SettingLink 
            icon={Languages} 
            label="Language" 
            sublabel="English (US)"
            color="text-emerald-600"
            bg="bg-emerald-50"
          />
        </section>

        <section className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Connectivity</h3>
          <SettingToggle 
            icon={Bell} 
            label="Notifications" 
            value={notifications} 
            onChange={setNotifications}
            color="text-rose-600"
            bg="bg-rose-50"
          />
          <SettingToggle 
            icon={Bluetooth} 
            label="Bluetooth" 
            value={bluetooth} 
            onChange={setBluetooth}
            color="text-blue-600"
            bg="bg-blue-50"
          />
        </section>

        <section className="space-y-4 md:col-span-2">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Security & Privacy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SettingLink 
              icon={Shield} 
              label="Privacy" 
              sublabel="Data Sharing & Permissions"
              color="text-amber-600"
              bg="bg-amber-50"
            />
            <SettingLink 
              icon={Lock} 
              label="Security" 
              sublabel="Password & Biometrics"
              color="text-violet-600"
              bg="bg-violet-50"
            />
          </div>
        </section>

        <section className="space-y-4 md:col-span-2 pt-6">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 p-6 bg-rose-50 text-rose-600 rounded-[2rem] border border-rose-100 font-black uppercase tracking-widest text-xs hover:bg-rose-600 hover:text-white transition-all active:scale-[0.98] shadow-xl shadow-rose-100/50"
          >
            <LogOut className="w-5 h-5" />
            Logout from Account
          </button>
        </section>
      </div>
    </div>
  );
}
