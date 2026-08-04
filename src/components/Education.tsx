import { motion } from "motion/react";
import { 
  BookOpen, 
  ExternalLink, 
  ShieldCheck, 
  Apple, 
  Flame, 
  LifeBuoy,
  ChevronRight,
  ArrowRight,
  AlertTriangle
} from "lucide-react";
import { cn } from "../lib/utils";

const resources = [
  {
    title: "Understanding Rheumatoid Arthritis",
    description: "Learn the basics of what RA is, how it differs from osteoarthritis, and why early diagnosis is critical.",
    icon: BookOpen,
    color: "bg-blue-50 text-blue-600 border-blue-100",
    link: "https://www.arthritis.org/diseases/rheumatoid-arthritis"
  },
  {
    title: "Joint Protection Strategies",
    description: "Practical tips for performing daily tasks while minimizing stress on your small joints.",
    icon: ShieldCheck,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    link: "https://www.hopkinsarthritis.org/patient-corner/disease-management/joint-protection-strategies/"
  },
  {
    title: "Anti-Inflammatory Diet",
    description: "Discover foods that help reduce inflammation and support overall joint health.",
    icon: Apple,
    color: "bg-rose-50 text-rose-600 border-rose-100",
    link: "https://www.healthline.com/nutrition/anti-inflammatory-diet-101"
  },
  {
    title: "Managing RA Flares",
    description: "How to recognize an upcoming flare and steps to take for immediate relief.",
    icon: Flame,
    color: "bg-amber-50 text-amber-600 border-amber-100",
    link: "https://www.webmd.com/rheumatoid-arthritis/ra-flares"
  }
];

export default function Education() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">Health Education Center</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Empower yourself with verified knowledge about Rheumatoid Arthritis and disease management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((res, i) => {
          const Icon = res.icon;
          return (
            <motion.a
              key={res.title}
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-xl hover:shadow-blue-50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border", res.color)}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {res.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-medium mb-8">
                  {res.description}
                </p>
              </div>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                Read Full Article
                <ExternalLink className="w-4 h-4" />
              </div>
            </motion.a>
          );
        })}
      </div>

      <div className="bg-slate-900 rounded-[40px] p-10 lg:p-16 text-white relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 px-4 py-2 rounded-full border border-rose-500/30">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">Emergency Guidance</span>
            </div>
            <h2 className="text-3xl font-bold leading-tight">When to see a Doctor Urgently?</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              While RA is a long-term condition, certain symptoms require immediate attention from a medical professional.
            </p>
            <ul className="space-y-4">
              {[
                "Sudden, severe joint pain or swelling",
                "High fever accompanying joint pain",
                "Inability to move a limb or bear weight",
                "Extreme fatigue or severe breathing issues"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-200 font-medium">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
            <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
              <LifeBuoy className="w-6 h-6 text-blue-400" />
              Support Resources
            </h4>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group">
                <span className="font-bold">Find a Rheumatologist</span>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group">
                <span className="font-bold">Patient Support Groups</span>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group">
                <span className="font-bold">Financial Assistance</span>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[160px] opacity-20 -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="text-center py-10">
        <p className="text-slate-400 text-sm font-medium italic">
          Disclaimer: All educational resources are for information purposes and do not replace professional medical advice.
        </p>
      </div>
    </div>
  );
}
