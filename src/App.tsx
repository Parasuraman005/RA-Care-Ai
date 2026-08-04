import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  Stethoscope, 
  ClipboardList, 
  Pill, 
  MessageCircle, 
  BookOpen, 
  BarChart3,
  Settings as SettingsIcon,
  Bell,
  Menu,
  X,
  Activity,
  Heart,
  ShieldAlert,
  Users,
  LogOut,
  Bluetooth,
  FileText,
  Home,
  User,
  ArrowRight,
  Search,
  Moon,
  Sun,
  Plus
} from "lucide-react";
import { cn } from "./lib/utils";
import { UserProfile, UserRole } from "./types";

// Components
import Dashboard from "./components/Dashboard";
import SymptomAssessment from "./components/SymptomAssessment";
import SymptomTracker from "./components/SymptomTracker";
import MedicationManager from "./components/MedicationManager";
import Analytics from "./components/Analytics";
import Chatbot from "./components/Chatbot";
import Education from "./components/Education";
import VitalsMonitor from "./components/VitalsMonitor";
import CaretakerPortal from "./components/CaretakerPortal";
import Login from "./components/Login";
import SplashScreen from "./components/SplashScreen";

import Settings from "./components/Settings";
import Profile from "./components/Profile";
import InstallPrompt from "./components/InstallPrompt";

// New placeholders
const Reports = () => <div className="p-20 text-center space-y-4">
  <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto border border-slate-100 shadow-sm">
    <FileText className="text-slate-200 w-12 h-12" />
  </div>
  <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs italic">Health Reports Engine</p>
</div>;

function Sidebar({ 
  role, 
  onLogout 
}: { 
  role: UserRole;
  onLogout: () => void;
}) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Health Monitor", path: "/vitals", icon: Activity },
    { name: "AI Assistant", path: "/chat", icon: MessageCircle },
    { name: "Medication", path: "/medications", icon: Pill },
    { name: "Reports", path: "/reports", icon: FileText },
    { name: "Caretaker", path: role === "Patient" ? "/access" : "/", icon: Users },
    { name: "Settings", path: "/settings", icon: SettingsIcon },
  ];

  return (
    <aside className={cn(
      "hidden lg:flex flex-col bg-surface dark:bg-slate-950 border-r border-outline h-screen sticky top-0 shrink-0 transition-all duration-400 z-40",
      isCollapsed ? "w-20" : "w-72"
    )}>
      <div className="p-6 flex items-center justify-between">
        <div className={cn("flex items-center gap-3 transition-all duration-300", isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100")}>
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Activity className="text-white w-5 h-5" />
          </div>
          <h1 className="font-poppins font-bold text-on-surface text-lg tracking-tight whitespace-nowrap">RA Care AI</h1>
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl text-on-surface-variant transition-colors"
        >
          {isCollapsed ? <ArrowRight className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-4 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group relative",
                isActive 
                  ? "bg-primary text-white shadow-xl shadow-primary/20" 
                  : "text-on-surface-variant hover:bg-primary/5 hover:text-primary"
              )}
            >
              <item.icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive ? "text-white" : "group-hover:text-primary")} />
              {!isCollapsed && <span className="text-sm font-semibold tracking-tight">{item.name}</span>}
              {isCollapsed && (
                <div className="absolute left-16 px-3 py-2 bg-on-surface text-surface text-[10px] font-bold rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button 
          onClick={onLogout}
          className={cn(
            "flex items-center gap-4 w-full px-4 py-3 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-2xl transition-colors font-semibold text-sm",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="w-6 h-6" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

function NavigationRail() {
  const location = useLocation();
  const navItems = [
    { icon: Home, path: "/", label: "Dashboard" },
    { icon: Activity, path: "/vitals", label: "Health" },
    { icon: MessageCircle, path: "/chat", label: "AI" },
    { icon: Pill, path: "/medications", label: "Medicine" },
    { icon: User, path: "/profile", label: "Profile" },
  ];

  return (
    <aside className="hidden md:flex lg:hidden flex-col w-20 bg-surface dark:bg-slate-950 border-r border-outline h-screen sticky top-0 shrink-0 py-6 items-center z-40 transition-colors">
      <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
        <Activity className="text-white w-5 h-5" />
      </div>
      <nav className="flex flex-col gap-4">
        {navItems.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all group relative",
              location.pathname === item.path 
                ? "bg-primary text-white shadow-xl shadow-primary/20" 
                : "text-on-surface-variant hover:bg-primary/5"
            )}
          >
            <item.icon className="w-5 h-5" />
            <div className="absolute left-14 px-2 py-1 bg-on-surface text-surface text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap z-50">
              {item.label}
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

function BottomNav() {
  const location = useLocation();
  const navItems = [
    { icon: Home, path: "/", label: "Home" },
    { icon: Activity, path: "/vitals", label: "Health" },
    { icon: MessageCircle, path: "/chat", label: "AI" },
    { icon: Pill, path: "/medications", label: "Medicine" },
    { icon: User, path: "/profile", label: "Profile" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/80 dark:bg-slate-950/80 backdrop-blur-xl border-t border-outline px-6 py-3 flex justify-between items-center z-[50] pb-safe shadow-2xl transition-colors">
      {navItems.map((item, i) => (
        <Link
          key={i}
          to={item.path}
          className={cn(
            "flex flex-col items-center gap-1 transition-all duration-300",
            location.pathname === item.path 
              ? "text-primary scale-110" 
              : "text-on-surface-variant/60"
          )}
        >
          <item.icon className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}


export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("ra_auth");
    return saved ? JSON.parse(saved) : null;
  });
  const [sosActive, setSosActive] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("ra_theme") as "light" | "dark") || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("ra_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const handleLogin = (role: UserRole) => {
    const newUser: UserProfile = {
      id: "1",
      name: role === "Patient" ? "Sarah Johnson" : "Caretaker Michael",
      email: "user@example.com",
      role: role,
      onboarded: true,
      patientId: role === "Caretaker" ? "82910" : undefined
    };
    setUser(newUser);
    localStorage.setItem("ra_auth", JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("ra_auth");
  };

  if (showSplash) return <SplashScreen onComplete={() => setShowSplash(false)} />;

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <Router>
      <div className={cn(
        "flex min-h-screen font-inter transition-colors duration-300",
        theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      )}>
        <Sidebar role={user.role} onLogout={handleLogout} />
        <NavigationRail />
        
        <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
          <InstallPrompt />
          {/* Top Navigation Bar */}
          <header className="h-16 md:h-24 glass sticky top-0 flex items-center justify-between px-4 md:px-12 z-30 transition-all border-b border-outline">
            <div className="flex items-center gap-3 md:gap-8 flex-1">
              <div className="lg:hidden w-10 h-10 md:w-12 md:h-12 bg-primary rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                <Activity className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h2 className="hidden sm:block text-xl md:text-3xl font-poppins font-bold text-on-surface tracking-tight leading-none mb-1">
                  {user.role} Portal
                </h2>
                <p className="hidden sm:block text-[10px] md:text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em]">Connected & Secure</p>
              </div>
              <h2 className="sm:hidden text-lg font-poppins font-bold text-on-surface tracking-tight">
                RA Care
              </h2>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-2.5 md:p-3.5 bg-surface dark:bg-slate-900 hover:bg-primary/5 dark:hover:bg-primary/10 rounded-xl md:rounded-2xl transition-all text-on-surface-variant border border-outline hover:border-primary group"
              >
                {theme === "light" 
                  ? <Moon className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" /> 
                  : <Sun className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-45 transition-transform" />
                }
              </button>

              <button className="p-2.5 md:p-3.5 relative bg-surface dark:bg-slate-900 hover:bg-primary/5 dark:hover:bg-primary/10 rounded-xl md:rounded-2xl transition-all text-on-surface-variant border border-outline hover:border-primary group">
                <Bell className="w-4 h-4 md:w-5 md:h-5 group-hover:shake transition-all" />
                <span className="absolute top-2 right-2 md:top-3 md:right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-surface shadow-sm" />
              </button>

              <div className="h-8 md:h-10 w-px bg-outline mx-1" />

              <Link to="/profile" className="flex items-center gap-3 pl-1 group">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-[22px] bg-primary flex items-center justify-center border-4 border-surface dark:border-slate-900 shadow-xl shadow-primary/20 overflow-hidden group-hover:scale-105 transition-transform">
                  <span className="text-white text-sm md:text-lg font-black uppercase">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </Link>
            </div>
          </header>

          {/* SOS Overlay */}
          <AnimatePresence>
            {sosActive && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-rose-600/95 backdrop-blur-md flex items-center justify-center p-6 text-white"
              >
                <div className="max-w-md w-full text-center space-y-8">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                    <ShieldAlert className="w-16 h-16 text-rose-600" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Emergency SOS Sent</h2>
                    <p className="text-rose-100 font-medium">
                      Your caretakers and emergency services have been notified of your location and health status.
                    </p>
                  </div>
                  <div className="p-6 bg-white/10 rounded-3xl border border-white/20 text-left">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Latest Health Snapshot
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div><p className="opacity-70">Heart Rate</p><p className="text-lg font-bold">112 BPM</p></div>
                      <div><p className="opacity-70">SpO2</p><p className="text-lg font-bold">96%</p></div>
                      <div className="col-span-2"><p className="opacity-70">Recent Symptoms</p><p className="font-bold">Severe Pain, High Fatigue</p></div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSosActive(false)}
                    className="w-full py-4 bg-white text-rose-600 rounded-2xl font-black uppercase tracking-widest hover:bg-rose-50 transition-all shadow-xl"
                  >
                    I am Safe Now
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-8 lg:p-12 pb-24 md:pb-8">
            <AnimatePresence mode="wait">
              <Routes>
                {user.role === "Patient" ? (
                  <>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/assessment" element={<SymptomAssessment />} />
                    <Route path="/tracker" element={<SymptomTracker />} />
                    <Route path="/vitals" element={<VitalsMonitor />} />
                    <Route path="/medications" element={<MedicationManager />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/chat" element={<Chatbot />} />
                    <Route path="/education" element={<Education />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings onLogout={handleLogout} />} />
                    <Route path="/profile" element={<Profile />} />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<CaretakerPortal />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/chat" element={<Chatbot />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings onLogout={handleLogout} />} />
                    <Route path="/profile" element={<Profile />} />
                  </>
                )}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </div>
          <BottomNav />
        </main>
      </div>
    </Router>
  );
}
