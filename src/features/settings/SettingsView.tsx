import React, { useState } from 'react';
import { Lock, Save, Smartphone, Laptop } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export const SettingsView: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'security' | 'notifications' | 'sessions'>('security');

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notification toggles
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    examScheduleUpdates: true,
    assignmentDeadlines: true,
    feeReminders: true,
    clubNewsletters: false,
  });

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast('New passwords do not match. Please verify.', 'error');
      return;
    }
    toast('Account password updated securely!', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSaveNotifications = () => {
    toast('Notification preferences saved and synced!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Account Settings &amp; Security Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Manage authentication credentials, notification preferences and active campus ERP sessions
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'security'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Password &amp; Security
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'notifications'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Notification Preferences
        </button>
        <button
          onClick={() => setActiveTab('sessions')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'sessions'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Active Sessions &amp; Devices
        </button>
      </div>

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6 text-xs">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Change Portal Password</h3>
            <p className="text-slate-500 text-[11px] mt-0.5">
              Choose a strong, unique passphrase with at least 8 characters.
            </p>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Current Password</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">New Password</label>
              <input
                type="password"
                required
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Update Password</span>
            </Button>
          </form>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6 text-xs">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">ERP Notification Preferences</h3>
            <p className="text-slate-500 text-[11px] mt-0.5">
              Control automated SMS and email alerts for student activities.
            </p>
          </div>

          <div className="space-y-4 max-w-xl divide-y divide-slate-100">
            {[
              { key: 'emailAlerts', title: 'Official Email Notifications', desc: 'Receive grade publications, administrative notices and announcements.' },
              { key: 'assignmentDeadlines', title: 'Assignment Due Date Reminders', desc: 'Alerts 48 hours and 24 hours prior to submission cutoffs.' },
              { key: 'examScheduleUpdates', title: 'Examination Schedule & Hall Ticket Alerts', desc: 'Instant alerts on exam room assignments or date adjustments.' },
              { key: 'feeReminders', title: 'Fee Payment & Due Date Reminders', desc: 'Notices before semester billing deadlines to prevent late fees.' },
              { key: 'smsAlerts', title: 'Urgent SMS Alerts', desc: 'Emergency weather closures or immediate campus alerts.' },
              { key: 'clubNewsletters', title: 'Student Club Weekly Digest', desc: 'Summary of weekend workshops, music jams, and hackathons.' },
            ].map((item) => {
              const checked = notifications[item.key as keyof typeof notifications];

              return (
                <div key={item.key} className="pt-3 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{item.title}</h4>
                    <p className="text-slate-500 text-[11px]">{item.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setNotifications({ ...notifications, [item.key]: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveNotifications}
              className="gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Notification Preferences</span>
            </Button>
          </div>
        </div>
      )}

      {/* Sessions Tab */}
      {activeTab === 'sessions' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Active ERP Sign-in Sessions
          </h3>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Laptop className="w-5 h-5 text-indigo-600" />
                <div>
                  <h4 className="font-bold text-slate-900">Chrome on macOS / Windows (This Device)</h4>
                  <p className="text-slate-400 text-[11px]">Campus Wi-Fi 6 • IP: 172.16.48.102 • Active Now</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                Current Session
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-slate-500" />
                <div>
                  <h4 className="font-bold text-slate-900">CampusOne Mobile App on iPhone 15 Pro</h4>
                  <p className="text-slate-400 text-[11px]">Cellular LTE • Last active: Yesterday, 09:20 PM</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast('Session logged out successfully', 'info')}
                className="text-[11px]"
              >
                Revoke Session
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
