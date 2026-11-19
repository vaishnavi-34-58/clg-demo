import React, { useState } from 'react';
import { Download, Printer, CheckCircle2, TrendingUp } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';
import { useErp } from '../../hooks/useErp';

export const GradeReportView: React.FC = () => {
  const { toast } = useToast();
  const { results } = useErp();
  const [selectedSemesterIndex, setSelectedSemesterIndex] = useState(2); // Default to Sem 3 (Current)
  const [showTranscriptModal, setShowTranscriptModal] = useState(false);

  const semesterResults = results;
  const currentResult = semesterResults[selectedSemesterIndex] || semesterResults[0];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Results &amp; Grade Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Semester grade point average (SGPA), cumulative CGPA and official transcript evaluations
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowTranscriptModal(true)}
          className="gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Official Transcript</span>
        </Button>
      </div>

      {/* Top Academic Standing Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Cumulative CGPA</span>
          <span className="text-3xl font-extrabold text-amber-500">3.84</span>
          <span className="text-[10px] text-emerald-600 font-semibold block flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Dean&apos;s Honor List
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Selected SGPA</span>
          <span className="text-3xl font-extrabold text-indigo-600">{currentResult.sgpa.toFixed(2)}</span>
          <span className="text-[10px] text-slate-400 block">{currentResult.semesterName}</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Total Credits Earned</span>
          <span className="text-3xl font-extrabold text-slate-900">59</span>
          <span className="text-[10px] text-slate-400 block">Out of 128 Required</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Standing Status</span>
          <span className="text-3xl font-extrabold text-emerald-600">PASS</span>
          <span className="text-[10px] text-emerald-600 font-medium block">All Clear • No Backlogs</span>
        </div>
      </div>

      {/* Semester Selector Pills */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-semibold">
        {semesterResults.map((res, idx) => (
          <button
            key={res.semesterNumber}
            onClick={() => setSelectedSemesterIndex(idx)}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              selectedSemesterIndex === idx
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {res.semesterName} (SGPA: {res.sgpa})
          </button>
        ))}
      </div>

      {/* Detailed Marks Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {currentResult.semesterName} Assessment Breakdown
            </h3>
            <p className="text-xs text-slate-500">Academic Year: {currentResult.academicYear} • Total Credits: {currentResult.totalCredits}</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
            Semester Status: Clear
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4">Subject Code</th>
                <th className="p-4">Subject Title</th>
                <th className="p-4 text-center">Credits</th>
                <th className="p-4 text-center">Internal (/40)</th>
                <th className="p-4 text-center">External (/60)</th>
                <th className="p-4 text-center">Total (/100)</th>
                <th className="p-4 text-center">Letter Grade</th>
                <th className="p-4 text-center">Grade Point</th>
                <th className="p-4 text-center">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentResult.subjects.map((sub) => (
                <tr key={sub.code} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-mono font-bold text-slate-800">{sub.code}</td>
                  <td className="p-4 font-semibold text-slate-900">{sub.name}</td>
                  <td className="p-4 text-center font-mono">{sub.credits}</td>
                  <td className="p-4 text-center font-mono">{sub.internalMarks}</td>
                  <td className="p-4 text-center font-mono">{sub.externalMarks}</td>
                  <td className="p-4 text-center font-mono font-bold text-slate-900">{sub.totalMarks}</td>
                  <td className="p-4 text-center">
                    <span className="px-2 py-0.5 rounded font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {sub.grade}
                    </span>
                  </td>
                  <td className="p-4 text-center font-mono font-bold text-slate-800">{sub.gradePoint.toFixed(1)}</td>
                  <td className="p-4 text-center">
                    <span className="text-emerald-600 font-bold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{sub.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Transcript Modal */}
      {showTranscriptModal && (
        <Modal
          isOpen={showTranscriptModal}
          onClose={() => setShowTranscriptModal(false)}
          title="Official Grade Transcript Preview"
          description="CampusOne University • Academic Registrar Records"
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase">
                    CAMPUSONE UNIVERSITY • OFFICIAL STUDENT GRADE TRANSCRIPT
                  </h3>
                  <p className="text-[10px] text-slate-500">Office of the University Registrar • Certified Academic Record</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-slate-800 block">CGPA: 3.84 / 4.00</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">First Class with Distinction</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-xl border border-slate-200 text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[10px]">Student Name</span>
                  <span className="font-bold text-slate-800">Merna Vance</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Registration Number</span>
                  <span className="font-mono font-bold text-slate-800">UTP-2023-4182</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Degree Program</span>
                  <span className="font-medium text-slate-800">B.Sc. Interactive Design</span>
                </div>
              </div>

              {/* Summary of all 3 semesters */}
              <div className="space-y-2">
                <span className="font-bold text-slate-900 block text-[11px]">Academic Performance Summary</span>
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-400 text-[10px] font-semibold border-b border-slate-100">
                      <tr>
                        <th className="p-2.5">Semester</th>
                        <th className="p-2.5">Academic Session</th>
                        <th className="p-2.5 text-center">Credits Earned</th>
                        <th className="p-2.5 text-center">SGPA</th>
                        <th className="p-2.5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {semesterResults.map((r) => (
                        <tr key={r.semesterNumber}>
                          <td className="p-2.5 font-bold text-slate-900">{r.semesterName}</td>
                          <td className="p-2.5 text-slate-600">{r.academicYear}</td>
                          <td className="p-2.5 text-center font-mono">{r.earnedCredits}</td>
                          <td className="p-2.5 text-center font-mono font-bold text-indigo-600">{r.sgpa.toFixed(2)}</td>
                          <td className="p-2.5 text-center font-semibold text-emerald-600">PASS</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTranscriptModal(false)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  toast('Downloading official certified transcript...', 'success');
                  window.print();
                }}
                className="gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Certified Transcript</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
