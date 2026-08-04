import React, { useState } from "react";
import { motion } from "motion/react";
import { UserRole } from "../types";
import { Activity, ShieldCheck, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

export default function Login({ onLogin }: { onLogin: (role: UserRole) => void }) {
  const [role, setRole] = useState<UserRole>("Patient");

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-inter">
      <div className="max-w-md w-full space-y-12">
        {/* Logo Section */}
        <div className="text-center space-y-6">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-blue-600 rounded-[var(--radius-md3)] flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/20"
          >
            <Activity className="text-white w-12 h-12" />
          </motion.div>
          <div className="space-y-3">
            <h1 className="text-4xl font-poppins font-bold tracking-tight text-slate-900">RA Care AI</h1>
            <p className="text-slate-400 font-medium text-sm tracking-wide">Rheumatoid Arthritis Intelligence Portal</p>
          </div>
        </div>

        {/* Role Switcher */}
        <div className="flex bg-white p-1.5 rounded-[var(--radius-md3)] border border-slate-200/50 shadow-sm">
          {(["Patient", "Caretaker"] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={cn(
                "flex-1 py-3.5 rounded-[1.25rem] text-sm font-semibold tracking-tight transition-all",
                role === r ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:text-slate-900"
              )}
            >
              {r} Login
            </button>
          ))}
        </div>

        {/* Auth Form */}
        <div className="md3-card p-10 space-y-8 bg-white border border-slate-100 shadow-2xl shadow-blue-500/5">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="name@example.com"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-200 outline-none font-medium transition-all"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Password</label>
                <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">Forgot?</button>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-200 outline-none font-medium transition-all"
              />
            </div>
          </div>

          <button 
            onClick={() => onLogin(role)}
            className="md3-button-primary w-full py-5 text-base font-semibold"
          >
            Sign In
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 bg-white px-4">SECURE ACCESS</div>
          </div>

          <button className="w-full py-4 border border-slate-200 rounded-2xl flex items-center justify-center gap-3 font-semibold text-slate-600 hover:bg-slate-50 transition-all text-sm">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
            Continue with Google
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-slate-400">
            Don't have an account? <button className="text-blue-600 font-semibold hover:underline">Create Account</button>
          </p>
        </div>
      </div>
    </div>
  );
}
