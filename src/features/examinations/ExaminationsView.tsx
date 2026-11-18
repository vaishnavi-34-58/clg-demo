import React, { useState } from 'react';
import { Printer, Download, AlertCircle } from 'lucide-react';
import { MOCK_EXAM_RECORDS } from '../../mock/examinations.mock';
import { ExamRecord } from '../../types/examination';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';

export const ExaminationsView: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [selectedExam, setSelectedExam] = useState<ExamRecord | null>(null);
  const [showFullHallTicketModal, setShowFullHallTicketModal] = useState(false);

  const filteredExams = MOCK_EXAM_RECORDS.filter((exam) => {
    if (activeTab === 'upcoming') return exam.status === 'Upcoming';
    if (activeTab === 'completed') return exam.status === 'Completed';
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Examinations &amp; Hall Tickets
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Mid-term and End-Semester examination schedule, seat allocations and hall tickets
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowFullHallTicketModal(true)}
          className="gap-1.5"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Download Consolidated Hall Ticket</span>
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'all'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          All Examinations ({MOCK_EXAM_RECORDS.length})
        </button>
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'upcoming'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Upcoming ({MOCK_EXAM_RECORDS.filter((e) => e.status === 'Upcoming').length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'completed'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Completed Records ({MOCK_EXAM_RECORDS.filter((e) => e.status === 'Completed').length})
        </button>
      </div>

      {/* Examinations Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4">Exam Subject</th>
                <th className="p-4">Course Code</th>
                <th className="p-4">Date</th>
                <th className="p-4">Timing</th>
                <th className="p-4">Examination Hall</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExams.map((exam) => (
                <tr
                  key={exam.id}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                  onClick={() => setSelectedExam(exam)}
                >
                  <td className="p-4 font-bold text-slate-900">{exam.examName}</td>
                  <td className="p-4 font-mono font-medium text-slate-700">{exam.courseCode}</td>
                  <td className="p-4">{exam.date}</td>
                  <td className="p-4 font-mono">{exam.time}</td>
                  <td className="p-4">{exam.location}</td>
                  <td className="p-4">
                    <Badge variant={exam.status === 'Completed' ? 'completed' : 'upcoming'}>
                      {exam.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedExam(exam);
                      }}
                      className="text-[11px] py-1 px-2.5"
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Individual Exam Modal */}
      {selectedExam && (
        <Modal
          isOpen={!!selectedExam}
          onClose={() => setSelectedExam(null)}
          title={`Examination Schedule: ${selectedExam.examName}`}
          description={`Course Code: ${selectedExam.courseCode} • Status: ${selectedExam.status}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 block text-[10px]">Date of Examination</span>
                  <span className="font-bold text-slate-800">{selectedExam.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Reporting Time</span>
                  <span className="font-bold text-slate-800">{selectedExam.time}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Hall / Room</span>
                  <span className="font-bold text-slate-800">{selectedExam.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Assigned Desk</span>
                  <span className="font-bold text-indigo-600 font-mono">Row C • Seat 14</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>Entry into examination room requires physical university badge and printed hall ticket pass.</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedExam(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  toast(`Generating pass for ${selectedExam.courseCode}...`, 'info');
                  window.print();
                }}
                className="gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Pass</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Full Consolidated Hall Ticket Modal */}
      {showFullHallTicketModal && (
        <Modal
          isOpen={showFullHallTicketModal}
          onClose={() => setShowFullHallTicketModal(false)}
          title="Official Consolidated Semester Hall Ticket"
          description="Spring 2024 End-Semester Theory & Practical Examinations"
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base font-mono">
                    U
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 uppercase">
                      UTOPIA UNIVERSITY • CONTROLLER OF EXAMINATIONS
                    </h3>
                    <p className="text-[10px] text-slate-500">Official Student Examination Admit Card</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
                  Verified &amp; Admitted
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 block">Candidate Name</span>
                  <span className="font-bold text-slate-900">Merna Vance</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Registration No</span>
                  <span className="font-mono font-bold text-slate-900">UTP-2023-4182</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Program</span>
                  <span className="font-semibold text-slate-900">B.Sc. Interactive Design</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Semester</span>
                  <span className="font-semibold text-slate-900">Semester 3 of 8</span>
                </div>
              </div>

              {/* Table of all upcoming exams */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-100">
                    <tr>
                      <th className="p-3">Course Code</th>
                      <th className="p-3">Subject Name</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Session</th>
                      <th className="p-3">Hall</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_EXAM_RECORDS.map((e) => (
                      <tr key={e.id}>
                        <td className="p-3 font-mono font-bold text-slate-800">{e.courseCode}</td>
                        <td className="p-3 font-medium text-slate-900">{e.examName}</td>
                        <td className="p-3 text-slate-600">{e.date}</td>
                        <td className="p-3 font-mono text-slate-600">{e.time}</td>
                        <td className="p-3 text-slate-600">{e.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFullHallTicketModal(false)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  toast('Downloading Hall Ticket PDF...', 'success');
                  window.print();
                }}
                className="gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print Official PDF</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
