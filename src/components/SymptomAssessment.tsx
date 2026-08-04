import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Stethoscope, 
  ChevronRight, 
  ChevronLeft, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  Loader2,
  FileText
} from "lucide-react";
import { cn, getRiskColor } from "../lib/utils";
import { AssessmentResult } from "../types";

const questions = [
  {
    id: "joint_pain",
    title: "Joint Pain & Symmetry",
    text: "Do you experience persistent pain in your joints? Is the pain symmetrical (e.g., both wrists or both knees)?",
    options: ["No pain", "Mild, one side", "Moderate, symmetrical", "Severe, symmetrical"]
  },
  {
    id: "stiffness",
    title: "Morning Stiffness",
    text: "How long does stiffness in your joints last after waking up in the morning?",
    options: ["None", "Less than 30 mins", "30 - 60 mins", "More than 60 mins"]
  },
  {
    id: "swelling",
    title: "Joint Swelling",
    text: "Do you notice visible swelling, redness, or warmth in three or more joints simultaneously?",
    options: ["Never", "Occasionally", "Frequently", "Constantly"]
  },
  {
    id: "fatigue",
    title: "Systemic Symptoms",
    text: "Are you experiencing unusual fatigue, low-grade fever, or unexplained weight loss?",
    options: ["None", "Mild fatigue", "Moderate fatigue", "Severe fatigue/fever"]
  }
];

export default function SymptomAssessment() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAssessing, setIsAssessing] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const handleNext = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else performAssessment();
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const performAssessment = async () => {
    setIsAssessing(true);
    try {
      const response = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: answers }),
      });
      const data = await response.json();
      setResult(data);
      
      // Save to localStorage
      const savedProfile = localStorage.getItem("ra_profile");
      const profile = savedProfile ? JSON.parse(savedProfile) : { onboarded: true, name: "Patient" };
      profile.lastAssessment = {
        date: new Date().toISOString(),
        riskLevel: data.riskLevel,
        score: data.score
      };
      localStorage.setItem("ra_profile", JSON.stringify(profile));
    } catch (error) {
      console.error("Assessment error:", error);
    } finally {
      setIsAssessing(false);
    }
  };

  const currentQuestion = questions[step];

  if (result) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="md3-card overflow-hidden">
          <div className={cn("p-12 text-center border-b border-outline", getRiskColor(result.riskLevel))}>
            <div className="w-20 h-20 bg-surface/50 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-outline">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-2">Assessment Results</h2>
            <p className="text-5xl font-black mb-4 text-on-surface">{result.riskLevel} Risk</p>
            <div className="max-w-md mx-auto">
              <p className="text-lg font-medium leading-relaxed text-on-surface-variant">{result.summary}</p>
            </div>
          </div>

          <div className="p-10 space-y-8">
            <div>
              <h3 className="text-lg font-poppins font-bold text-on-surface mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Educational Guidance
              </h3>
              <ul className="space-y-4">
                {result.recommendations.map((rec, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-outline"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <span className="text-on-surface-variant leading-relaxed font-medium">{rec}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 flex gap-4">
              <AlertCircle className="w-6 h-6 text-rose-500 shrink-0" />
              <div>
                <p className="text-sm font-bold text-rose-900 dark:text-rose-200 mb-1">Medical Disclaimer</p>
                <p className="text-sm text-rose-700 dark:text-rose-300 leading-relaxed">{result.disclaimer}</p>
              </div>
            </div>

            <button 
              onClick={() => { setResult(null); setStep(0); setAnswers({}); }}
              className="md3-button-primary w-full"
            >
              Start New Assessment
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-3">
        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Diagnostic Intelligence</p>
        <h1 className="text-3xl md:text-5xl font-poppins font-black tracking-tight text-on-surface">AI Symptom Assessment</h1>
        <p className="text-on-surface-variant text-lg font-medium">Assess your symptoms for Rheumatoid Arthritis awareness.</p>
      </div>

      <div className="md3-card overflow-hidden">
        {/* Progress Bar */}
        <div className="h-1.5 bg-slate-100 dark:bg-slate-800 w-full relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
            className="absolute h-full bg-primary shadow-[0_0_12px_rgba(37,99,235,0.4)]"
          />
        </div>

        <div className="p-8 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-widest">
                  Step {step + 1} of {questions.length}
                </span>
                <span className="text-outline">•</span>
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{currentQuestion.title}</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-poppins font-bold text-on-surface leading-tight">
                  {currentQuestion.text}
                </h2>
                <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium">
                  <Info className="w-4 h-4 text-primary" />
                  Select the option that best describes your experience.
                </div>
              </div>

              <div className="grid gap-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, [currentQuestion.id]: option })}
                    className={cn(
                      "w-full p-6 rounded-3xl border-2 text-left transition-all duration-300 flex items-center justify-between group",
                      answers[currentQuestion.id] === option
                        ? "border-primary bg-primary/5 shadow-xl shadow-primary/5"
                        : "border-outline hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-900"
                    )}
                  >
                    <span className={cn(
                      "font-bold text-lg transition-colors",
                      answers[currentQuestion.id] === option ? "text-primary" : "text-on-surface"
                    )}>
                      {option}
                    </span>
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                      answers[currentQuestion.id] === option 
                        ? "border-primary bg-primary scale-110" 
                        : "border-outline group-hover:border-primary/50"
                    )}>
                      {answers[currentQuestion.id] === option && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-12 pt-8 border-t border-outline">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className="md3-button-secondary"
              style={{ padding: '0.75rem 1.5rem' }}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!answers[currentQuestion.id] || isAssessing}
              className="md3-button-primary"
              style={{ padding: '0.75rem 2rem' }}
            >
              {isAssessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  {step === questions.length - 1 ? "Complete Assessment" : "Next Step"}
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 flex gap-4">
        <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
        <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
          <strong className="text-amber-600 dark:text-amber-400">Important:</strong> This assessment is for educational purposes only. RA Care AI uses Google Gemini to evaluate symptoms based on general clinical patterns, but it is not a medical diagnosis. Early detection is key—always consult a rheumatologist if you suspect RA.
        </p>
      </div>
    </div>
  );
}
