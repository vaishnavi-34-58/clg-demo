import React, { useState } from 'react';
import { MapPin, User, Printer } from 'lucide-react';
import { MOCK_TIMETABLE_SLOTS } from '../../mock/timetable.mock';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export const TimetableView: React.FC = () => {
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const filteredSlots = selectedDay === 'All'
    ? MOCK_TIMETABLE_SLOTS
    : MOCK_TIMETABLE_SLOTS.filter((s) => s.day === selectedDay);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Class Schedule &amp; Timetable
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Lecture halls, laboratory timings and weekly academic schedule • Spring 2024
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setViewMode(viewMode === 'daily' ? 'weekly' : 'daily');
            }}
          >
            {viewMode === 'daily' ? 'Switch to Weekly Grid' : 'Switch to Day View'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              toast('Printing official class timetable schedule...', 'info');
              window.print();
            }}
            className="gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Schedule</span>
          </Button>
        </div>
      </div>

      {/* Day Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => {
              setSelectedDay(day);
              setViewMode('daily');
            }}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              selectedDay === day && viewMode === 'daily'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Daily View Timeline */}
      {viewMode === 'daily' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            <span>{selectedDay}&apos;s Lectures ({filteredSlots.length} Classes)</span>
            <span className="text-emerald-600">Regular Semester Schedule</span>
          </div>

          {filteredSlots.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-xs">
              No academic classes scheduled on {selectedDay}.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredSlots.map((slot, idx) => (
                <div
                  key={slot.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Time Badge */}
                    <div className="p-3 bg-slate-100 rounded-xl text-center shrink-0 min-w-28">
                      <span className="text-xs font-bold font-mono text-slate-900 block">
                        {slot.startTime}
                      </span>
                      <span className="text-[10px] text-slate-400 block">to {slot.endTime}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {slot.courseCode}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{slot.courseName}</h3>
                        {idx === 0 && selectedDay === 'Monday' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold animate-pulse">
                            Next Up
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {slot.instructor}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {slot.room}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                      Studio / Lecture
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Weekly Grid View */}
      {viewMode === 'weekly' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-100">
                <tr>
                  <th className="p-4">Day</th>
                  <th className="p-4">Time Slot</th>
                  <th className="p-4">Course &amp; Code</th>
                  <th className="p-4">Faculty</th>
                  <th className="p-4">Room / Laboratory</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_TIMETABLE_SLOTS.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{s.day}</td>
                    <td className="p-4 font-mono text-slate-600">{s.startTime} - {s.endTime}</td>
                    <td className="p-4 font-semibold text-slate-800">
                      <span className="font-mono text-indigo-600 mr-1.5">[{s.courseCode}]</span>
                      {s.courseName}
                    </td>
                    <td className="p-4 text-slate-600">{s.instructor}</td>
                    <td className="p-4 text-slate-600">{s.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
