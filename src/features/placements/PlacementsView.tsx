import React, { useState } from 'react';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { PlacementDrive } from '../../mock/placements.mock';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';
import { useErp } from '../../hooks/useErp';

export const PlacementsView: React.FC = () => {
  const { toast } = useToast();
  const { placements } = useErp();
  const drives = placements;

  const handleApplyToDrive = (id: string, company: string) => {
    const drive = drives.find((d) => d.id === id);
    if (drive) {
      drive.status = 'Applied';
    }
    toast(`Application for ${company} submitted to Career Center!`, 'success');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Career, Internships &amp; Placements Cell
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Campus recruitment drives, industry summer internships and portfolio reviews • Class of 2024
          </p>
        </div>

        <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
          Eligibility: Verified (CGPA 3.84 &gt; 3.50)
        </span>
      </div>

      {/* Placement Statistics Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Overall Placement Rate</span>
          <span className="text-3xl font-extrabold text-slate-900">94.8%</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">Design &amp; Tech Faculty</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Average Starting Package</span>
          <span className="text-3xl font-extrabold text-indigo-600">$78,500</span>
          <span className="text-[10px] text-slate-400 block">Per Annum (Design/UX)</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Active Hiring Partners</span>
          <span className="text-3xl font-extrabold text-slate-900">140+</span>
          <span className="text-[10px] text-slate-400 block">Global Tech &amp; Design Studios</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Your Application Status</span>
          <span className="text-3xl font-extrabold text-emerald-600">Shortlisted</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">Figma Systems Drive</span>
        </div>
      </div>

      {/* Active Drives Listing */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Upcoming Campus Hiring Drives</h3>

        <div className="space-y-3">
          {drives.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">{d.companyName}</span>
                  <span className="font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                    {d.role}
                  </span>
                  <span className="font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    {d.ctc}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-slate-500 text-[11px]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {d.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Drive Date: <strong>{d.driveDate}</strong>
                  </span>
                  <span>Min. CGPA Required: <strong>{d.minCgpa}</strong></span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span>Eligible Branches:</span>
                  <span className="text-slate-600 font-medium">{d.eligibleBranches.join(', ')}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                {d.status === 'Shortlisted' ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl font-bold border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Shortlisted for Interview ({d.interviewDate})</span>
                  </div>
                ) : d.status === 'Applied' ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-xl font-semibold border border-indigo-100">
                    <span>Application Under Review</span>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApplyToDrive(d.id, d.companyName)}
                  >
                    Apply for Drive
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
