import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, GraduationCap, Lock, Save, ShieldCheck } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import Button from './ui/Button';
import { Input } from './ui/Input';

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || 'Ajay Waghmare');
  const [email, setEmail] = useState(user?.email || 'student@university.edu');
  const [college, setCollege] = useState('University Institute of Technology');
  const [degree, setDegree] = useState('B.Tech Computer Science');
  const [semester, setSemester] = useState('Semester 6');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Profile & Account Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Manage your personal info, academic details, and security.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 rounded-[10px] bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2 font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* User Header Avatar Card */}
      <Card className="p-6 flex flex-col sm:flex-row items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center shadow-md shrink-0">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{name}</h2>
          <p className="text-xs text-slate-500">{email}</p>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 text-[11px] font-bold border border-blue-200/60 dark:border-blue-800/40 mt-1">
            Student Account
          </span>
        </div>
      </Card>

      {/* Form Sections */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Details */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your contact and user profile credentials</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              icon={User}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Academic Info */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>University and degree specification</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="College / Institution"
              icon={GraduationCap}
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            />
            <Input
              label="Degree / Major"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
            <Input
              label="Current Semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" icon={Save}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
