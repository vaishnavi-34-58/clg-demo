import React, { useState } from 'react';
import { Mail, Phone, MapPin, Edit3, Save } from 'lucide-react';
import { StudentProfile } from '../../types/student';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';

interface ProfileViewProps {
  student: StudentProfile;
  onUpdateStudent: (updated: StudentProfile) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  student,
  onUpdateStudent,
}) => {
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'academic' | 'guardian' | 'address'>('personal');

  // Edit form state
  const [formData, setFormData] = useState({
    name: student.name,
    preferredName: student.preferredName,
    email: student.email,
    phone: student.phone || '+1 (555) 382-9912',
    emergencyContact: student.emergencyContact || '+1 (555) 902-1144',
    address: student.address || '42 Campus Way, North Hall, Room 304',
    bio: 'Undergraduate student specializing in UI/UX systems, interaction ergonomics, and 3D web graphics.',
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StudentProfile = {
      ...student,
      name: formData.name,
      preferredName: formData.preferredName,
      email: formData.email,
      phone: formData.phone,
      emergencyContact: formData.emergencyContact,
      address: formData.address,
    };
    onUpdateStudent(updated);
    setIsEditModalOpen(false);
    toast('Profile information updated and saved successfully!', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Student Profile Card Hero */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <div className="relative">
            <Avatar
              src={student.avatarUrl}
              alt={student.name}
              size="lg"
              className="w-24 h-24 sm:w-28 sm:h-28 ring-4 ring-slate-100 shadow-md"
            />
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="absolute bottom-1 right-1 p-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
              title="Edit Profile"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                  <span>{student.name}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                    Active Student
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {student.program} • {student.department}
                </p>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsEditModalOpen(true)}
                className="gap-1.5 self-center sm:self-start"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </Button>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2 text-xs">
              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg font-mono font-medium">
                ID: {student.studentId}
              </span>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-medium border border-indigo-100">
                Semester {student.currentSemester} of {student.totalSemesters}
              </span>
              <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg font-medium border border-amber-100">
                CGPA: {student.cgpa}
              </span>
              <span className="px-3 py-1 bg-sky-50 text-sky-700 rounded-lg font-medium border border-sky-100">
                Academic Year: {student.academicYear}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('personal')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'personal'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Personal Information
        </button>
        <button
          onClick={() => setActiveTab('academic')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'academic'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Academic &amp; Program Details
        </button>
        <button
          onClick={() => setActiveTab('guardian')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'guardian'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Guardian &amp; Emergency
        </button>
        <button
          onClick={() => setActiveTab('address')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'address'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Address &amp; Identification
        </button>
      </div>

      {/* Tab Panels */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        {activeTab === 'personal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                Identity &amp; Bio
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 block mb-0.5">Full Legal Name</span>
                  <span className="font-semibold text-slate-800">{student.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Preferred Calling Name</span>
                  <span className="font-semibold text-slate-800">{student.preferredName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Date of Birth</span>
                  <span className="font-semibold text-slate-800">October 14, 2003 (20 Years)</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Gender / Pronouns</span>
                  <span className="font-semibold text-slate-800">Female (She/Her)</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Blood Group</span>
                  <span className="font-semibold text-slate-800">O Positive (O+)</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Nationality</span>
                  <span className="font-semibold text-slate-800">United States</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                Contact Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Official University Email</span>
                    <span className="font-mono font-medium text-slate-800">{student.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Primary Phone</span>
                    <span className="font-semibold text-slate-800">{student.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Campus Residence</span>
                    <span className="font-medium text-slate-800">{student.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="space-y-6 text-xs">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              Academic Registration &amp; Mentorship
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Registration / Roll Number</span>
                <span className="text-sm font-bold font-mono text-slate-900">{student.studentId}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Assigned Faculty Advisor</span>
                <span className="text-sm font-bold text-slate-900">{student.advisorName}</span>
                <span className="text-[10px] text-slate-500 block">Senior Associate Dean of Arts</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Total Credits Earned</span>
                <span className="text-sm font-bold text-slate-900">59 / 128 Credits (46%)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guardian' && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              Parent &amp; Guardian Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-slate-400 block text-[11px]">Primary Guardian</span>
                <p className="font-bold text-sm text-slate-900">David Vance</p>
                <p className="text-slate-600">Relation: Father</p>
                <p className="text-slate-600">Contact: {student.emergencyContact}</p>
                <p className="text-slate-600">Email: d.vance@vancetech.com</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-slate-400 block text-[11px]">Secondary Contact</span>
                <p className="font-bold text-sm text-slate-900">Elena Vance</p>
                <p className="text-slate-600">Relation: Mother</p>
                <p className="text-slate-600">Contact: +1 (555) 902-1145</p>
                <p className="text-slate-600">Email: elena.vance@architects.org</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'address' && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              Permanent &amp; Mailing Addresses
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-400 block font-semibold text-[11px]">Campus Residence (Current)</span>
                <p className="text-slate-800 font-medium">Room 304, Wing B, North Residence Hall</p>
                <p className="text-slate-600">Utopia University Main Campus, CA 94107</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-400 block font-semibold text-[11px]">Permanent Home Address</span>
                <p className="text-slate-800 font-medium">742 Evergreen Terrace</p>
                <p className="text-slate-600">Seattle, WA 98101, USA</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Student Profile Details"
        description="Update your contact, emergency contact, and profile information."
        maxWidth="lg"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Full Legal Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Preferred Calling Name</label>
              <input
                type="text"
                required
                value={formData.preferredName}
                onChange={(e) => setFormData({ ...formData, preferredName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Primary Phone</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Emergency Contact Phone</label>
              <input
                type="text"
                required
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Mailing / Campus Address</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Personal Bio</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
