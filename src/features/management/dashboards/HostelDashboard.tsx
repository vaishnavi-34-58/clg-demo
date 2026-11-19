import React, { useState } from 'react';
import {
  Home,
  Bed,
  Wrench,
  CheckCircle2,
  Users,
  ShieldCheck,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';
import { APP_ROUTES } from '../../../app/routes';

export const HostelDashboard: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { hostel, resolveHostelComplaint, allocateHostelRoom } = useErp();
  const { toast } = useToast();

  const [isAllotModalOpen, setIsAllotModalOpen] = useState(false);
  const [targetRoom, setTargetRoom] = useState(hostel.roomNumber);
  const [targetBed, setTargetBed] = useState(hostel.bedNumber);

  const handleResolve = (complaintId: string) => {
    resolveHostelComplaint(complaintId);
    toast(`Maintenance complaint #${complaintId} marked Resolved! Updated on student app.`, 'success');
  };

  const handleRoomAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    allocateHostelRoom('UTP-2023-4182', targetRoom, targetBed);
    setIsAllotModalOpen(false);
    toast(`Hostel Room updated to ${targetRoom} (${targetBed}) for Merna Vance!`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 rounded-2xl p-6 sm:p-7 text-white shadow-lg border border-amber-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            MARCUS BELLER • CHIEF WARDEN &amp; RESIDENTIAL LIFE
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mt-2">Hostel &amp; Residence Management</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Room allocations, warden inspections, resident curfew monitoring, biometric mess check-ins, and facility maintenance dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAllotModalOpen(true)}
            className="bg-amber-600 hover:bg-amber-500 text-xs font-semibold gap-1.5"
          >
            <Bed className="w-3.5 h-3.5" />
            <span>Allot / Reassign Room</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Total Capacity</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">1,200</span>
          <span className="text-[10px] text-slate-500 font-semibold block">North, South &amp; East Blocks</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Current Occupancy</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-600">1,084</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">90.3% Occupied (116 Vacant)</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Pending Complaints</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-rose-600">
            {hostel.complaints.filter((c) => c.status !== 'Resolved').length}
          </span>
          <span className="text-[10px] text-slate-500 font-semibold block">Active Maintenance</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Mess Quality Score</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">4.8 / 5.0</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">Food Safety Audited</span>
        </div>
      </div>

      {/* Maintenance & Room Directory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Maintenance Requests */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Resident Maintenance Requests</h2>
              <p className="text-xs text-slate-500">Resolving tickets here instantly notifies students in the Student Portal</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(APP_ROUTES.MANAGEMENT_HOSTEL)}
              className="text-xs text-amber-600 hover:text-amber-700 font-semibold gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">Ticket &amp; Issue</th>
                  <th className="py-2.5 px-3">Room</th>
                  <th className="py-2.5 px-3">Filed Date</th>
                  <th className="py-2.5 px-3">Status</th>
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
                    <td className="py-3 px-3 font-medium text-slate-700">{hostel.roomNumber}</td>
                    <td className="py-3 px-3 text-slate-500">{c.date}</td>
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
                          <CheckCircle2 className="w-3 h-3" />
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

        {/* Hostel Info Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Home className="w-4 h-4 text-amber-600" />
              <span>Block Assignment</span>
            </h2>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Residence Hall:</span>
                <span className="font-semibold text-slate-800">{hostel.blockName || hostel.block}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Student Room:</span>
                <span className="font-semibold text-amber-700">Room {hostel.roomNumber} ({hostel.bedNumber})</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Assigned Warden:</span>
                <span className="font-semibold text-slate-800">{hostel.wardenName}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Curfew Timing:</span>
                <span className="font-semibold text-slate-800">10:00 PM Daily</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => setIsAllotModalOpen(true)}
              className="text-xs font-semibold gap-1.5"
            >
              <Bed className="w-3.5 h-3.5 text-amber-600" />
              <span>Modify Room Allotment</span>
            </Button>
          </div>

          <div className="bg-amber-50/70 rounded-2xl border border-amber-200/80 p-5 space-y-2">
            <div className="flex items-center gap-2 text-amber-950 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Night Biometric Roll Call</span>
            </div>
            <p className="text-[11px] text-amber-900/80">
              North Wing 3rd Floor turnstiles logged 100% check-ins before 22:00. No unauthorized absent notices reported.
            </p>
          </div>
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
                placeholder="e.g. 304, 210, 401"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Bed Number</label>
              <select
                value={targetBed}
                onChange={(e) => setTargetBed(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
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
              <Button variant="primary" size="sm" type="submit" className="bg-amber-600 hover:bg-amber-700 text-white gap-1">
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
