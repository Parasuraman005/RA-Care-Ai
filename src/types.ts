export type UserRole = "Patient" | "Caretaker";
export type RiskLevel = "Low" | "Moderate" | "High" | "Unknown";

export interface Vitals {
  heartRate: number;
  pulseRate: number;
  spo2: number;
  temperature: number;
  bloodPressure: string;
  weight: number;
  bmi: number;
  steps: number;
  distance: number;
  calories: number;
  lastUpdated: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  onboarded: boolean;
  patientId?: string;
  connectedCaretakers?: string[];
  lastAssessment?: {
    date: string;
    riskLevel: RiskLevel;
    score: number;
  };
  vitals?: Vitals;
}

export interface SymptomLog {
  id: string;
  date: string;
  painLevel: number;
  swellingLevel: number;
  stiffnessMinutes: number;
  fatigueLevel: number;
  mood: string;
  sleepHours: number;
  exerciseMinutes: number;
  waterIntake: number;
  notes: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  active: boolean;
  stockCount: number;
  refillReminder: boolean;
  sideEffects: string[];
  history: { date: string; taken: boolean }[];
}

export interface AssessmentResult {
  riskLevel: RiskLevel;
  score: number;
  summary: string;
  recommendations: string[];
  disclaimer: string;
}
