import React, { useState } from 'react';
import {
  Building,
  Bed,
  Wrench,
  CheckCircle2,
  Users,
  ShieldCheck,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';

export const ManagementHostelView: React.FC = () => {
  const { hostel, resolveHostelComplaint, allocateHostelRoom } = useErp();
  const { toast } = useToast();

  const [isAllotModalOpen, setIsAllotModalOpen] = useState(false);
  const [targetRoom, setTargetRoom] = useState(hostel.roomNumber);
  const [targetBed, setTargetBed] = useState(hostel.bedNumber);

  const handleResolve = (complaintId: string) => {
    resolveHostelComplaint(complaintId);
    toast(`Complaint #${complaintId} marked Resolved! Updated on student portal.`, 'success');
  };

  const handleRoomAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    allocateHostelRoom('UTP-2023-4182', targetRoom, targetBed);
    setIsAllotModalOpen(false);
    toast(`Hostel room updated to ${targetRoom} (${targetBed}) for Merna Vance!`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase">
              <Building className="w-4 h-4" />
              <span>Campus Residential Life</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Hostels, Room Allotment &amp; Maintenance</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Hostel block occupancy, student room allocations, warden duty logs, and facilities work-order resolution.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAllotModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold gap-1.5"
            >
              <Bed className="w-3.5 h-3.5" />
              <span>Allot / Reassign Room</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Residence Hall Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Assigned Student Room</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              Live Synced
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Student:</span>
              <span className="font-semibold text-slate-800">Merna Vance (UTP-2023-4182)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Residence Block:</span>
              <span className="font-semibold text-slate-800">{hostel.blockName || hostel.block}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Allocated Room:</span>
              <span className="font-bold text-indigo-600">Room {hostel.roomNumber} ({hostel.bedNumber})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Floor Warden:</span>
              <span className="font-medium text-slate-700">{hostel.wardenName}</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => setIsAllotModalOpen(true)}
            className="text-xs font-semibold"
          >
            Modify Room Allocation
          </Button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
          <span className="text-xs font-bold text-slate-900 block">Hostel Occupancy &amp; Inventory</span>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
              <span className="text-slate-500">North Residence Hall:</span>
              <span className="font-bold text-slate-800">380 / 400 Beds (95%)</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
              <span className="text-slate-500">South Residence Hall:</span>
              <span className="font-bold text-slate-800">392 / 400 Beds (98%)</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
              <span className="text-slate-500">East Tower (Freshmen):</span>
              <span className="font-bold text-slate-800">312 / 400 Beds (78%)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
          <span className="text-xs font-bold text-slate-900 block">Resident Policies &amp; Welfare</span>
          <div className="space-y-2 text-xs text-slate-600">
            <p className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Biometric entry gates operational 24/7.</span>
            </p>
            <p className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Evening roll call mandatory at 22:00.</span>
            </p>
            <p className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>On-call resident physician available in Block B.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Maintenance Tickets Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Resident Maintenance Work Orders</h2>
            <p className="text-xs text-slate-500">Marking resolved updates the complaint status directly on the Student Portal</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold">
              <tr>
                <th className="py-2.5 px-3 rounded-l-lg">Ticket ID &amp; Issue</th>
                <th className="py-2.5 px-3">Room</th>
                <th className="py-2.5 px-3">Filed Date</th>
                <th className="py-2.5 px-3">Priority</th>
                <th className="py-2.5 px-3">Current Status</th>
                <th className="py-2.5 px-3 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hostel.complaints.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-3">
                    <p className="font-bold text-slate-900">{c.issue || c.category}</p>
                    <p className="text-[11px] text-slate-400 font-mono">#{c.id}</p>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-700">Room {hostel.roomNumber}</td>
                  <td className="py-3 px-3 text-slate-500">{c.date}</td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-slate-700">Normal</span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.status === 'Resolved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {c.status !== 'Resolved' ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleResolve(c.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] py-1 px-2.5 h-auto gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Resolved</span>
                      </Button>
                    ) : (
                      <span className="text-[11px] text-emerald-600 font-semibold">Resolved</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Room Allotment Modal */}
      {isAllotModalOpen && (
        <Modal
          isOpen={isAllotModalOpen}
          onClose={() => setIsAllotModalOpen(false)}
          title="Hostel Room Reallocation"
          description="Assign a room and bed number for student Merna Vance (UTP-2023-4182). This immediately updates their Student Portal Hostel details."
          maxWidth="md"
        >
          <form onSubmit={handleRoomAllocation} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Room Number</label>
              <input
                type="text"
                value={targetRoom}
                onChange={(e) => setTargetRoom(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
                placeholder="e.g. 304, 210, 401"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Bed Number</label>
              <select
                value={targetBed}
                onChange={(e) => setTargetBed(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Bed A">Bed A (Window side)</option>
                <option value="Bed B">Bed B (Aisle side)</option>
                <option value="Bed C">Bed C (Study alcove)</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsAllotModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Confirm Allotment &amp; Sync</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
