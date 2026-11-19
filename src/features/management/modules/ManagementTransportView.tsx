import React, { useState } from 'react';
import {
  Bus,
  Navigation,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';

export const ManagementTransportView: React.FC = () => {
  const { transport, updateTransportRoute } = useErp();
  const { toast } = useToast();

  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(transport.routeNumber);
  const [selectedStop, setSelectedStop] = useState(transport.pickupPoint);

  const handleUpdateTransit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTransportRoute('UTP-2023-4182', selectedRoute, selectedStop);
    setIsRouteModalOpen(false);
    toast(`Transit route updated to ${selectedRoute} (${selectedStop})! Synced to student pass.`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase">
              <Bus className="w-4 h-4" />
              <span>Campus Fleet &amp; Transit</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Bus Routes, Passes &amp; Logistics Command</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Live tracking, route allocation, shuttle schedule dispatch, and passenger transit pass management.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsRouteModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Reassign Student Transit Route</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Transit Pass Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Student Transit Pass</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active Verified
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Student:</span>
              <span className="font-semibold text-slate-800">Merna Vance (UTP-2023-4182)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Assigned Route:</span>
              <span className="font-bold text-indigo-600">{transport.routeNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Pickup Stop:</span>
              <span className="font-semibold text-slate-800">{transport.pickupPoint}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Morning Pickup:</span>
              <span className="font-medium text-slate-700">{transport.pickupTime}</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => setIsRouteModalOpen(true)}
            className="text-xs font-semibold"
          >
            Change Assigned Route
          </Button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
          <span className="text-xs font-bold text-slate-900 block">Assigned Shuttle Coach</span>
          <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Vehicle Registration:</span>
              <span className="font-mono font-bold text-slate-800">{transport.busNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Designated Driver:</span>
              <span className="font-semibold text-slate-800">{transport.driverName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Emergency Phone:</span>
              <span className="font-medium text-slate-700">{transport.driverContact || transport.driverPhone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Seating Capacity:</span>
              <span className="font-semibold text-emerald-600">48 Passenger Coach</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
          <span className="text-xs font-bold text-slate-900 block">Fleet Diagnostics</span>
          <div className="space-y-2 text-xs text-slate-600">
            <p className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Speed Governors set to 50 km/h campus limit.</span>
            </p>
            <p className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Real-time GPS ping every 10 seconds.</span>
            </p>
            <p className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Zero safety violations logged this quarter.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Fleet Routes Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Campus Metropolitan Transit Routes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold">
              <tr>
                <th className="py-2.5 px-3 rounded-l-lg">Route # &amp; Coach</th>
                <th className="py-2.5 px-3">Corridor &amp; Key Stops</th>
                <th className="py-2.5 px-3">Assigned Driver</th>
                <th className="py-2.5 px-3">Driver Contact</th>
                <th className="py-2.5 px-3 text-right rounded-r-lg">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/60">
                <td className="py-3 px-3">
                  <p className="font-bold text-slate-900">{transport.routeNumber}</p>
                  <p className="text-[11px] text-slate-400 font-mono">{transport.busNumber}</p>
                </td>
                <td className="py-3 px-3">
                  <p className="font-medium text-slate-800">North Metro Expressway</p>
                  <p className="text-[11px] text-slate-500">{transport.pickupPoint}</p>
                </td>
                <td className="py-3 px-3 font-medium text-slate-800">{transport.driverName}</td>
                <td className="py-3 px-3 text-slate-600 font-mono">{transport.driverContact || transport.driverPhone}</td>
                <td className="py-3 px-3 text-right">
                  <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active On-Route
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3 px-3">
                  <p className="font-bold text-slate-900">Route 04</p>
                  <p className="text-[11px] text-slate-400 font-mono">WB-2023-B04</p>
                </td>
                <td className="py-3 px-3">
                  <p className="font-medium text-slate-800">South Central Station Line</p>
                  <p className="text-[11px] text-slate-500">Central Library Plaza</p>
                </td>
                <td className="py-3 px-3 font-medium text-slate-800">Robert Vance</td>
                <td className="py-3 px-3 text-slate-600 font-mono">+1 (555) 392-1084</td>
                <td className="py-3 px-3 text-right">
                  <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active On-Route
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3 px-3">
                  <p className="font-bold text-slate-900">Route 07</p>
                  <p className="text-[11px] text-slate-400 font-mono">WB-2023-B07</p>
                </td>
                <td className="py-3 px-3">
                  <p className="font-medium text-slate-800">East Tech Park Corridor</p>
                  <p className="text-[11px] text-slate-500">Gateway Square</p>
                </td>
                <td className="py-3 px-3 font-medium text-slate-800">David Miller</td>
                <td className="py-3 px-3 text-slate-600 font-mono">+1 (555) 819-2045</td>
                <td className="py-3 px-3 text-right">
                  <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    Depot Standby
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Change Route Modal */}
      {isRouteModalOpen && (
        <Modal
          isOpen={isRouteModalOpen}
          onClose={() => setIsRouteModalOpen(false)}
          title="Update Student Transit Route"
          description="Update assigned transit shuttle route and boarding stop for Merna Vance. Updated instantly on the Student Portal."
          maxWidth="md"
        >
          <form onSubmit={handleUpdateTransit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Select Route</label>
              <select
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
              >
                <option value="Route 12">Route 12 - North Metro Express</option>
                <option value="Route 04">Route 04 - South Central City Line</option>
                <option value="Route 07">Route 07 - East Tech Park Corridor</option>
                <option value="Route 09">Route 09 - West Suburbs Circular</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Boarding / Pickup Stop</label>
              <input
                type="text"
                value={selectedStop}
                onChange={(e) => setSelectedStop(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
                placeholder="e.g. North Metro Station, Gate 2"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsRouteModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Save &amp; Update Student Pass</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
