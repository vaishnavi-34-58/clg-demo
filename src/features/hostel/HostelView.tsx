import React, { useState } from 'react';
import { Building2, User, Phone, Wrench } from 'lucide-react';
import { MOCK_HOSTEL_DATA, HostelDetails } from '../../mock/hostel.mock';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';

export const HostelView: React.FC = () => {
  const { toast } = useToast();
  const [hostelData, setHostelData] = useState<HostelDetails>(MOCK_HOSTEL_DATA);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);

  // Form State
  const [complaintCategory, setComplaintCategory] = useState('Air Conditioning');
  const [complaintDescription, setComplaintDescription] = useState('');

  const handleFileComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    const newComplaint = {
      id: `CMP-2024-0${Math.floor(40 + Math.random() * 50)}`,
      category: complaintCategory,
      description: complaintDescription,
      date: 'Today',
      status: 'Pending' as const,
    };

    setHostelData({
      ...hostelData,
      complaints: [newComplaint, ...hostelData.complaints],
    });

    setIsComplaintModalOpen(false);
    setComplaintDescription('');
    toast('Hostel maintenance ticket created successfully!', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Hostel &amp; Residential Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Campus room allotment, roommate directory, warden assistance and room maintenance
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsComplaintModalOpen(true)}
          className="gap-1.5"
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>File Maintenance Request</span>
        </Button>
      </div>

      {/* Room Details Hero */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{hostelData.hostelName}</h2>
              <p className="text-xs text-slate-500">{hostelData.block} • {hostelData.roomType}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
              Fee Status: {hostelData.feeStatus} (${hostelData.feeAmount})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Allotted Room</span>
            <span className="text-sm font-bold text-slate-900">{hostelData.roomNumber}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Bed Number</span>
            <span className="text-sm font-bold text-slate-900">{hostelData.bedNumber}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Head Warden</span>
            <span className="text-sm font-bold text-slate-900">{hostelData.wardenName}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Emergency Hotline</span>
            <span className="text-sm font-bold text-slate-900">{hostelData.wardenPhone}</span>
          </div>
        </div>
      </div>

      {/* Roommates & Warden Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Roommates */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-slate-600" />
            <span>Assigned Roommate Directory</span>
          </h3>
          <div className="space-y-3">
            {hostelData.roommates.map((rm, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">{rm.name}</h4>
                  <p className="text-slate-500 text-[11px]">{rm.course}</p>
                </div>
                <span className="font-mono text-slate-500 font-medium">{rm.studentId}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Warden & Rules */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-600" />
            <span>Hostel Administration &amp; Curfew</span>
          </h3>
          <div className="space-y-2 text-slate-600">
            <p><strong>Campus Main Gate Curfew:</strong> 10:30 PM (Weekdays) / 11:30 PM (Weekends)</p>
            <p><strong>Quiet Study Hours:</strong> 10:00 PM – 06:00 AM Daily</p>
            <p><strong>Guest Visitation Hours:</strong> 04:00 PM – 07:30 PM in Ground Floor Common Lounge</p>
            <p><strong>Warden Office Hours:</strong> 08:30 AM – 06:00 PM (Room G-02, North Hall)</p>
          </div>
        </div>
      </div>

      {/* Maintenance Request Tickets */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Room Maintenance &amp; Repair History</h3>
          <span className="text-xs text-slate-400">{hostelData.complaints.length} Tickets</span>
        </div>

        <div className="divide-y divide-slate-100">
          {hostelData.complaints.map((c) => (
            <div key={c.id} className="p-4 flex items-center justify-between text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-800">{c.id}</span>
                  <span className="font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                    {c.category}
                  </span>
                  <span className="text-slate-400 text-[11px]">• Filed on {c.date}</span>
                </div>
                <p className="text-slate-600">{c.description}</p>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  c.status === 'Resolved'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Form Modal */}
      {isComplaintModalOpen && (
        <Modal
          isOpen={isComplaintModalOpen}
          onClose={() => setIsComplaintModalOpen(false)}
          title="File Room Maintenance Ticket"
          description={`Room 304 • ${hostelData.hostelName}`}
          maxWidth="md"
        >
          <form onSubmit={handleFileComplaint} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Issue Category</label>
              <select
                value={complaintCategory}
                onChange={(e) => setComplaintCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
              >
                <option value="Air Conditioning">Air Conditioning / Cooling Unit</option>
                <option value="Electrical">Electrical / Lighting / Sockets</option>
                <option value="Plumbing">Plumbing / Bathroom Fixture</option>
                <option value="Furniture">Furniture / Desk / Bed Frame</option>
                <option value="Door & Lock">Door Keycard / Lock Mechanism</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Problem Description</label>
              <textarea
                rows={3}
                required
                placeholder="Describe the issue requiring technician inspection..."
                value={complaintDescription}
                onChange={(e) => setComplaintDescription(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsComplaintModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
              >
                Submit Maintenance Ticket
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
