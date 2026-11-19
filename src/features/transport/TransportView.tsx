import React, { useState } from 'react';
import { Bus, QrCode, Printer } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';
import { useErp } from '../../hooks/useErp';

export const TransportView: React.FC = () => {
  const { toast } = useToast();
  const { transport } = useErp();
  const [showPassModal, setShowPassModal] = useState(false);
  const data = transport;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            University Transport &amp; Shuttle Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Designated bus routes, digital student transit passes and campus transit schedules
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowPassModal(true)}
          className="gap-1.5"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>View Digital Transit Pass</span>
        </Button>
      </div>

      {/* Route & Pass Hero */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded bg-slate-100 text-slate-800">
                  {data.routeNumber}
                </span>
                <h2 className="text-lg font-bold text-slate-900">{data.routeName}</h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Assigned Vehicle: <strong className="text-slate-800">{data.busNumber}</strong></p>
            </div>
          </div>

          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
            Transit Pass: Active ({data.validUntil})
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Your Pickup Stop</span>
            <span className="text-xs font-bold text-slate-900 line-clamp-1">{data.pickupPoint}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Morning Pickup Time</span>
            <span className="text-sm font-bold text-slate-900 font-mono">{data.pickupTime}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Evening Departure</span>
            <span className="text-sm font-bold text-slate-900 font-mono">{data.dropTime}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Designated Driver</span>
            <span className="text-xs font-bold text-slate-900">{data.driverName} ({data.driverPhone})</span>
          </div>
        </div>
      </div>

      {/* Route Stops Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          {data.routeNumber} Full Route Stop Timeline &amp; ETA
        </h3>

        <div className="space-y-4">
          {data.stops.map((st, idx) => (
            <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[11px]">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="font-bold text-slate-900">{st.stopName}</h4>
                  <p className="text-[11px] text-slate-400">Regular Designated Transit Halt</p>
                </div>
              </div>

              <div className="flex items-center gap-6 font-mono text-slate-700">
                <div>
                  <span className="text-[10px] text-slate-400 block">Morning ETA</span>
                  <span className="font-bold">{st.morningTime}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Evening ETA</span>
                  <span className="font-bold">{st.eveningTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Digital Transit Pass Modal */}
      {showPassModal && (
        <Modal
          isOpen={showPassModal}
          onClose={() => setShowPassModal(false)}
          title="Digital Student Bus Transit Pass"
          description="CampusOne University Transportation Authority"
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-xl space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-[10px] tracking-wider text-indigo-300 font-mono block">CAMPUSONE UNIVERSITY TRANSIT</span>
                  <h3 className="font-bold text-base text-white">Student Bus Pass</h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                  VALID 2024
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-white/60 block text-[10px]">Student Name</span>
                  <span className="font-bold text-white">Merna Vance</span>
                </div>
                <div>
                  <span className="text-white/60 block text-[10px]">Student ID</span>
                  <span className="font-mono font-bold text-white">UTP-2023-4182</span>
                </div>
                <div>
                  <span className="text-white/60 block text-[10px]">Assigned Route</span>
                  <span className="font-bold text-indigo-300">{data.routeNumber} ({data.busNumber})</span>
                </div>
                <div>
                  <span className="text-white/60 block text-[10px]">Boarding Point</span>
                  <span className="font-medium text-white truncate block">{data.pickupPoint}</span>
                </div>
              </div>

              {/* QR Mock */}
              <div className="p-4 bg-white rounded-xl text-slate-900 flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs">Scan for Bus Terminal Check-in</p>
                  <p className="text-[10px] text-slate-500">Tap card or scan QR with conductor tablet</p>
                </div>
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                  <QrCode className="w-8 h-8" />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPassModal(false)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  toast('Printing digital bus pass...', 'success');
                  window.print();
                }}
                className="gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Pass Card</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
