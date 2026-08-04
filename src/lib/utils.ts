import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMinutes(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

export function getRiskColor(level: string) {
  switch (level) {
    case "Low": return "text-emerald-700 bg-emerald-50 border-emerald-100 shadow-emerald-50/50";
    case "Moderate": return "text-amber-700 bg-amber-50 border-amber-100 shadow-amber-50/50";
    case "High": return "text-rose-700 bg-rose-50 border-rose-100 shadow-rose-50/50";
    default: return "text-slate-700 bg-slate-50 border-slate-100";
  }
}
