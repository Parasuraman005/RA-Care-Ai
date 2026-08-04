import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, Zap } from "lucide-react";
import { cn } from "../lib/utils";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center overflow-hidden transition-colors duration-700">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-24 md:w-32 md:h-32 bg-primary rounded-[2.5rem] md:rounded-[3.5rem] flex items-center justify-center shadow-2xl shadow-primary/30 mb-10 rotate-6"
        >
          <Activity className="text-white w-12 h-12 md:w-16 md:h-16 -rotate-6" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-poppins font-black tracking-tight text-on-surface">
            RA Care AI
          </h1>
          <div className="space-y-4">
            <p className="text-xl md:text-3xl font-poppins font-bold text-on-surface tracking-tight leading-tight">
              Empowering Early Detection.<br className="hidden md:block" /> Enabling Better Care.
            </p>
            <p className="text-sm md:text-base text-on-surface-variant font-medium leading-relaxed max-w-md mx-auto">
              AI-powered Rheumatoid Arthritis monitoring, personalized insights, and continuous care at your fingertips.
            </p>
          </div>
        </motion.div>

        {/* Loading Indicator */}
        <div className="mt-20 w-48 md:w-64 h-1 bg-outline rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-on-surface rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="text-surface w-4 h-4" />
          </div>
          <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.4em]">
            Developed by Team Hack&Walk
          </span>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-outline animate-bounce" style={{ animationDelay: '0s' }} />
           <div className="w-1.5 h-1.5 rounded-full bg-outline animate-bounce" style={{ animationDelay: '0.2s' }} />
           <div className="w-1.5 h-1.5 rounded-full bg-outline animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </motion.footer>
    </div>
  );
}
