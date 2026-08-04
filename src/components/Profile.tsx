import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  User, 
  Settings as SettingsIcon, 
  Bluetooth, 
  Droplets, 
  Phone, 
  Calendar, 
  ChevronRight,
  Scale,
  Ruler,
  ClipboardList,
  Camera,
  Heart
} from "lucide-react";
import { cn } from "../lib/utils";
import { UserProfile } from "../types";

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    age: "34",
    gender: "Female",
    height: "168",
    weight: "62",
    bloodGroup: "A+",
    emergencyContact: "+1 555-0192",
    medicalHistory: "Diagnosed with RA in 2021. History of inflammation in small joints. No known drug allergies. Active smoker: No."
  });
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ra_profile");
    const savedPhoto = localStorage.getItem("ra_profile_photo");
    if (saved) {
      const data = JSON.parse(saved);
      setProfile(data);
      setEditForm(prev => ({ ...prev, name: data.name || "" }));
    }
    if (savedPhoto) setPhoto(savedPhoto);
  }, []);

  const handleSave = () => {
    const updatedProfile = { ...profile, name: editForm.name } as UserProfile;
    setProfile(updatedProfile);
    localStorage.setItem("ra_profile", JSON.stringify(updatedProfile));
    localStorage.setItem("ra_profile_details", JSON.stringify(editForm)); // Saving extra details
    setIsEditing(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPhoto(base64);
        localStorage.setItem("ra_profile_photo", base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const ProfileField = ({ label, value, icon: Icon, color = "text-slate-400", fieldName }: any) => (
    <div className="md3-card p-4 flex items-center justify-between border-transparent">
      <div className="flex items-center gap-4 w-full">
        <div className={cn("w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0", color)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-inter">{label}</p>
          {isEditing ? (
            <input 
              type="text"
              value={editForm[fieldName as keyof typeof editForm]}
              onChange={(e) => setEditForm({ ...editForm, [fieldName]: e.target.value })}
              className="text-sm font-semibold text-slate-900 w-full bg-transparent border-none focus:ring-0 p-0 font-inter"
            />
          ) : (
            <p className="text-sm font-semibold text-slate-900 font-inter">{value || "Not Set"}</p>
          )}
        </div>
      </div>
      {!isEditing && <ChevronRight className="w-4 h-4 text-slate-200" />}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 pb-24 px-4 font-inter">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1 md:space-y-2">
          <p className="text-[10px] md:text-xs font-semibold text-blue-600 uppercase tracking-widest font-inter">User Profile</p>
          <h1 className="text-2xl md:text-4xl font-poppins font-bold tracking-tight text-slate-900">Patient Identity</h1>
        </div>
        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="md3-button-primary w-full md:w-auto py-3 text-sm"
        >
          {isEditing ? "Save Profile" : "Edit Details"}
        </button>
      </div>

      {/* Header / Photo */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md3-card p-6 md:p-10 flex flex-col items-center gap-6 md:gap-8 shadow-xl shadow-blue-500/5"
      >
        <div className="relative group">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-[var(--radius-md3)] bg-blue-50 border-4 border-white shadow-2xl flex items-center justify-center text-blue-600 overflow-hidden">
            {photo ? (
              <img src={photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 md:w-16 md:h-16" />
            )}
          </div>
          <label className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 p-2 md:p-3 bg-slate-900 text-white rounded-xl md:rounded-2xl shadow-lg hover:scale-110 transition-transform cursor-pointer">
            <Camera className="w-4 h-4 md:w-5 md:h-5" />
            <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
          </label>
        </div>
        <div className="text-center w-full max-w-sm space-y-0.5 md:space-y-1">
          {isEditing ? (
            <input 
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="text-xl md:text-2xl font-poppins font-bold text-slate-900 text-center w-full bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500/10 mb-1 md:mb-2 p-2"
              placeholder="Full Name"
            />
          ) : (
            <h2 className="text-xl md:text-2xl font-poppins font-bold text-slate-900">{editForm.name || profile?.name || "Sarah Johnson"}</h2>
          )}
          <p className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase tracking-widest">Rheumatoid Arthritis Patient</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {/* Personal Details */}
        <section className="space-y-3 md:space-y-4">
          <h3 className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase tracking-widest ml-4">Personal Info</h3>
          <div className="grid grid-cols-1 gap-3 md:gap-4">
            <ProfileField label="Full Name" value={editForm.name} icon={User} fieldName="name" />
            <ProfileField label="Age" value={editForm.age + " Years"} icon={Calendar} fieldName="age" />
            <ProfileField label="Gender" value={editForm.gender} icon={User} fieldName="gender" />
          </div>
        </section>

        {/* Biometrics */}
        <section className="space-y-3 md:space-y-4">
          <h3 className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase tracking-widest ml-4">Biometrics</h3>
          <div className="grid grid-cols-1 gap-3 md:gap-4">
            <ProfileField label="Height" value={editForm.height + " cm"} icon={Ruler} color="text-indigo-600" fieldName="height" />
            <ProfileField label="Weight" value={editForm.weight + " kg"} icon={Scale} color="text-emerald-600" fieldName="weight" />
            <ProfileField label="Blood Group" value={editForm.bloodGroup} icon={Droplets} color="text-rose-600" fieldName="bloodGroup" />
          </div>
        </section>

        {/* Medical History */}
        <section className="space-y-3 md:space-y-4 md:col-span-2">
          <h3 className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase tracking-widest ml-4">Clinical Data</h3>
          <div className="md3-card p-5 md:p-8 space-y-4 md:space-y-6">
            <div className="flex items-start gap-4 md:gap-6 p-4 md:p-6 bg-slate-50 rounded-[var(--radius-md3)]">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl text-indigo-600 shadow-sm flex items-center justify-center shrink-0">
                <ClipboardList className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 md:mb-2 font-inter">Medical History</p>
                {isEditing ? (
                  <textarea 
                    value={editForm.medicalHistory}
                    onChange={(e) => setEditForm({ ...editForm, medicalHistory: e.target.value })}
                    className="text-xs md:text-sm font-medium text-slate-700 leading-relaxed w-full bg-transparent border-none focus:ring-0 p-0 h-24 resize-none font-inter"
                  />
                ) : (
                  <p className="text-xs md:text-sm font-medium text-slate-700 leading-relaxed font-inter break-words">
                    {editForm.medicalHistory}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between p-4 md:p-6 bg-rose-50 rounded-[var(--radius-md3)] border border-rose-100 text-rose-600">
              <div className="flex items-center gap-3 md:gap-4 w-full">
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                <div className="flex-1">
                  <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest font-inter">Emergency Contact</p>
                  {isEditing ? (
                    <input 
                      type="text"
                      value={editForm.emergencyContact}
                      onChange={(e) => setEditForm({ ...editForm, emergencyContact: e.target.value })}
                      className="text-xs md:text-sm font-bold w-full bg-transparent border-none focus:ring-0 p-0 font-inter"
                    />
                  ) : (
                    <p className="text-xs md:text-sm font-bold font-inter">{editForm.emergencyContact}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Connectivity */}
        <section className="space-y-4 md:col-span-2">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Connectivity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Bluetooth className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Connected Device</p>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Smart Ring V4 • Active</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center">
                  <SettingsIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 uppercase tracking-tight">App Settings</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">v1.2.0 • Pro Member</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-200" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
