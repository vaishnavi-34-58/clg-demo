import React, { useState } from 'react';
import {
  Bus,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  ArrowRight,
  Phone,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';
import { APP_ROUTES } from '../../../app/routes';

export const TransportDashboard: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
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
      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-950 via-slate-900 to-amber-950 rounded-2xl p-6 sm:p-7 text-white shadow-lg border border-orange-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
            CAPT. DANIEL VANCE • DIRECTOR OF FLEET &amp; LOGISTICS
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mt-2">Campus Fleet &amp; Transit Command</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Live GPS telemetry, student transit passes, shuttle dispatch scheduling, route stop optimization, and fleet maintenance inspections.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsRouteModalOpen(true)}
            className="bg-orange-600 hover:bg-orange-500 text-xs font-semibold gap-1.5"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Reassign Student Route</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Active Shuttle Fleet</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">28</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">26 Active, 2 Standby</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Daily Commuters</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-orange-600">1,840</span>
          <span className="text-[10px] text-slate-500 font-semibold block">Students &amp; Faculty</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">On-Time Performance</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">98.2%</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">Morning &amp; Evening Shifts</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">GPS Live Telemetry</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">100%</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">All Units Connected</span>
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fleet Route Roster */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Active Transit Routes &amp; Drivers</h2>
              <p className="text-xs text-slate-500">Live operational status across metropolitan corridors</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(APP_ROUTES.MANAGEMENT_TRANSPORT)}
              className="text-xs text-orange-600 hover:text-orange-700 font-semibold gap-1"
            >
              <span>Manage Fleet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">Route &amp; Bus</th>
                  <th className="py-2.5 px-3">Corridor</th>
                  <th className="py-2.5 px-3">Driver &amp; Contact</th>
                  <th className="py-2.5 px-3">Capacity</th>
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
                    <p className="text-[11px] text-slate-500">Stop: {transport.pickupPoint}</p>
                  </td>
                  <td className="py-3 px-3">
                    <p className="font-medium text-slate-800">{transport.driverName}</p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {transport.driverContact || transport.driverPhone}
                    </p>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-700">42 / 48 Seats</td>
                  <td className="py-3 px-3 text-right">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      On Route
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/60">
                  <td className="py-3 px-3">
                    <p className="font-bold text-slate-900">Route 04</p>
                    <p className="text-[11px] text-slate-400 font-mono">WB-2023-B04</p>
                  </td>
                  <td className="py-3 px-3">
                    <p className="font-medium text-slate-800">South City Central Station</p>
                    <p className="text-[11px] text-slate-500">Stop: Central Library Plaza</p>
                  </td>
                  <td className="py-3 px-3">
                    <p className="font-medium text-slate-800">Robert Vance</p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      +1 (555) 392-1084
                    </p>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-700">46 / 50 Seats</td>
                  <td className="py-3 px-3 text-right">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      On Route
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
                    <p className="text-[11px] text-slate-500">Stop: Gateway Square</p>
                  </td>
                  <td className="py-3 px-3">
                    <p className="font-medium text-slate-800">David Miller</p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      +1 (555) 819-2045
                    </p>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-700">38 / 45 Seats</td>
                  <td className="py-3 px-3 text-right">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      Depot Prep
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Assigned Student Transit Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Bus className="w-4 h-4 text-orange-600" />
              <span>Assigned Student Pass</span>
            </h2>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Student:</span>
                <span className="font-semibold text-slate-800">Merna Vance</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Route:</span>
                <span className="font-bold text-orange-600">{transport.routeNumber}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Boarding Point:</span>
                <span className="font-semibold text-slate-800">{transport.pickupPoint}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Morning Pickup:</span>
                <span className="font-semibold text-slate-800">{transport.pickupTime}</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => setIsRouteModalOpen(true)}
              className="text-xs font-semibold gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5 text-orange-600" />
              <span>Change Route / Stop</span>
            </Button>
          </div>

          <div className="bg-orange-50/70 rounded-2xl border border-orange-200/80 p-5 space-y-2">
            <div className="flex items-center gap-2 text-orange-950 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-orange-600" />
              <span>Safety &amp; Compliance Check</span>
            </div>
            <p className="text-[11px] text-orange-900/80">
              All 28 coaches have passed quarterly mechanical inspections and brake pad diagnostics as of this morning.
            </p>
          </div>
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold"
                placeholder="e.g. North Metro Station, Gate 2"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsRouteModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="bg-orange-600 hover:bg-orange-700 text-white gap-1">
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
