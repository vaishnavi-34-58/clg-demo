import React, { useState } from 'react';
import {
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Lock,
  Mail,
  GraduationCap,
} from 'lucide-react';
import { MANAGEMENT_CREDENTIALS } from '../../constants/managementRoles';
import { ManagementRole } from '../../types/auth';
import { useErp } from '../../hooks/useErp';
import { useToast } from '../../hooks/useToast';
import { cn } from '../../utils/cn';

interface ManagementLoginViewProps {
  onSuccess: () => void;
  onGoToStudentPortal: () => void;
}

type RoleCategory = 'ACADEMIC' | 'OPERATIONS' | 'SERVICES';

export const ManagementLoginView: React.FC<ManagementLoginViewProps> = ({
  onSuccess,
  onGoToStudentPortal,
}) => {
  const { loginManagement, quickLogin } = useErp();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState<RoleCategory>('ACADEMIC');
  const [autofilledRole, setAutofilledRole] = useState<string | null>(null);

  // Manual submission handler
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your staff email and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const ok = loginManagement(email.trim(), password);
      setIsLoading(false);

      if (ok) {
        toast(`Signed in successfully as ${email}`, 'success');
        onSuccess();
      } else {
        setErrorMessage(
          'Invalid credentials. Please verify your staff email and password, or select a role from Demo Access below.'
        );
        toast('Authentication failed: Invalid credentials.', 'error');
      }
    }, 350);
  };

  // 1-Click Quick Login
  const handleQuickLogin = (role: ManagementRole, credEmail: string, credPass: string) => {
    setEmail(credEmail);
    setPassword(credPass);
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      quickLogin(role);
      setIsLoading(false);
      toast(`Signed in as ${role.replace('_', ' ')}`, 'success');
      onSuccess();
    }, 300);
  };

  // Autofill credentials without submitting immediately
  const handleAutofill = (role: ManagementRole, credEmail: string, credPass: string) => {
    setEmail(credEmail);
    setPassword(credPass);
    setErrorMessage('');
    setAutofilledRole(role);
    toast(`Populated credentials for ${credEmail}`, 'info');

    setTimeout(() => {
      setAutofilledRole(null);
    }, 2000);
  };

  // Group roles into 3 clean institutional categories
  const academicRoles: ManagementRole[] = [
    'SUPER_ADMIN',
    'PRINCIPAL',
    'HOD',
    'FACULTY',
    'EXAM_CONTROLLER',
  ];

  const operationsRoles: ManagementRole[] = [
    'ADMISSION_MGMT',
    'ACCOUNTS_MGMT',
    'PLACEMENT_OFFICER',
  ];

  const servicesRoles: ManagementRole[] = [
    'HOSTEL_MGMT',
    'TRANSPORT_MGMT',
    'LIBRARY_MGMT',
    'STUDENT_AFFAIRS',
  ];

  const currentRoleKeys =
    activeCategory === 'ACADEMIC'
      ? academicRoles
      : activeCategory === 'OPERATIONS'
      ? operationsRoles
      : servicesRoles;

  const currentRoleList = MANAGEMENT_CREDENTIALS.filter((c) =>
    currentRoleKeys.includes(c.role)
  );

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-800 flex flex-col justify-between selection:bg-slate-900 selection:text-white">
      {/* Top Institutional Header */}
      <header className="h-16 bg-white border-b border-slate-200/90 px-4 sm:px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-slate-900 flex items-center justify-center text-white text-xs font-bold font-mono tracking-wider">
            C1
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">
              CampusOne
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Management Portal
            </span>
          </div>
        </div>

        {/* Discreet Student Portal Navigation */}
        <button
          type="button"
          onClick={onGoToStudentPortal}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 py-1.5 px-3 rounded-md hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer"
        >
          <GraduationCap className="w-4 h-4 text-slate-500" />
          <span className="hidden sm:inline">Go to</span>
          <span>CampusOne Student Portal</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </header>

      {/* Main Focus: Institutional Sign-In Container */}
      <main className="flex-1 flex flex-col items-center justify-center py-8 sm:py-12 px-4 w-full">
        <div className="w-full max-w-xl bg-white border border-slate-200/90 rounded-xl shadow-xs overflow-hidden">
          
          {/* Section 1: Sign-In Form (Primary Focus) */}
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                Institutional Administration
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                Staff Authentication
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Enter your institutional staff email and password to access departmental controls.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-5 p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Credentials Autofilled Notification */}
            {autofilledRole && (
              <div className="mb-4 p-2.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in duration-150">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Credentials loaded for <strong>{email}</strong>. Ready to sign in.</span>
              </div>
            )}

            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Staff Email or ID
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@college.edu"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMessage('');
                    }}
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Format: Role@123
                  </span>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMessage('');
                    }}
                    className="w-full pl-9 pr-10 py-2.5 bg-white border border-slate-300 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>Authenticating...</span>
                    </span>
                  ) : (
                    <span>Sign In to Management Portal</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Section 2: Demo Access (Secondary, Compact & Structured) */}
          <div className="border-t border-slate-200 bg-slate-50/70 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Demo Access (12 Roles)
                </h2>
                <p className="text-[11px] text-slate-500">
                  Select an administrative role below to autofill or immediately sign in.
                </p>
              </div>
            </div>

            {/* Category Segmented Control */}
            <div className="grid grid-cols-3 p-1 bg-slate-200/70 rounded-lg text-xs font-medium text-slate-600 mb-3 gap-1">
              <button
                type="button"
                onClick={() => setActiveCategory('ACADEMIC')}
                className={cn(
                  'py-1.5 px-1 text-center rounded-md transition-all cursor-pointer text-[11px]',
                  activeCategory === 'ACADEMIC'
                    ? 'bg-white text-slate-900 font-bold shadow-2xs'
                    : 'hover:text-slate-900'
                )}
              >
                Academic (5)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('OPERATIONS')}
                className={cn(
                  'py-1.5 px-1 text-center rounded-md transition-all cursor-pointer text-[11px]',
                  activeCategory === 'OPERATIONS'
                    ? 'bg-white text-slate-900 font-bold shadow-2xs'
                    : 'hover:text-slate-900'
                )}
              >
                Admin &amp; Finance (3)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('SERVICES')}
                className={cn(
                  'py-1.5 px-1 text-center rounded-md transition-all cursor-pointer text-[11px]',
                  activeCategory === 'SERVICES'
                    ? 'bg-white text-slate-900 font-bold shadow-2xs'
                    : 'hover:text-slate-900'
                )}
              >
                Operations (4)
              </button>
            </div>

            {/* Compact Grouped Roles Table */}
            <div className="border border-slate-200 rounded-lg bg-white overflow-hidden divide-y divide-slate-100">
              {currentRoleList.map((cred) => (
                <div
                  key={cred.role}
                  className="px-3.5 py-2.5 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-900 truncate">
                        {cred.roleTitle}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 truncate mt-0.5">
                      {cred.email}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleAutofill(cred.role, cred.email, cred.password)}
                      className="text-[11px] font-medium text-slate-600 hover:text-slate-900 px-2 py-1 rounded border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
                      title={`Populate ${cred.email}`}
                    >
                      Autofill
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickLogin(cred.role, cred.email, cred.password)}
                      className="text-[11px] font-semibold text-white bg-slate-900 hover:bg-slate-800 px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1"
                      title={`Sign in as ${cred.roleTitle}`}
                    >
                      <span>Quick Login</span>
                      <ArrowRight className="w-3 h-3 text-slate-300" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>

      {/* Institutional Footer */}
      <footer className="h-14 border-t border-slate-200/90 bg-white px-6 flex items-center justify-center text-[11px] text-slate-500 text-center">
        <span>CampusOne Institutional ERP • Authorized Administrative Personnel Only</span>
      </footer>
    </div>
  );
};
