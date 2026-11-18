import React, { useState } from 'react';
import { FileText, MoreVertical, Calendar, Clock, MapPin, Printer } from 'lucide-react';
import { ExamRecord } from '../../../types/examination';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';

interface ExamBoardSectionProps {
  exams: ExamRecord[];
  onViewAll?: () => void;
}

export const ExamBoardSection: React.FC<ExamBoardSectionProps> = ({
  exams,
  onViewAll,
}) => {
  const [selectedExam, setSelectedExam] = useState<ExamRecord | null>(null);
  const [showHallTicket, setShowHallTicket] = useState(false);

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-slate-700" />
          <h2 className="text-sm sm:text-base font-bold text-slate-900">Exam Board</h2>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors cursor-pointer flex items-center gap-1"
        >
          <span>View all</span>
          <span>&gt;</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4 font-medium">Exam Name</th>
                <th className="py-3.5 px-4 font-medium">Course</th>
                <th className="py-3.5 px-4 font-medium">Date</th>
                <th className="py-3.5 px-4 font-medium">Time</th>
                <th className="py-3.5 px-4 font-medium">Location</th>
                <th className="py-3.5 px-4 font-medium">Status</th>
                <th className="py-3.5 px-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {exams.map((exam) => {
                const isCompleted = exam.status === 'Completed';

                return (
                  <tr
                    key={exam.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => setSelectedExam(exam)}
                  >
                    <td className="py-3.5 px-4 font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {exam.examName}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                      {exam.courseCode}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {exam.date}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {exam.time}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {exam.location}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={isCompleted ? 'completed' : 'upcoming'}>
                        {exam.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedExam(exam);
                          setShowHallTicket(true);
                        }}
                        title="View details & Hall Ticket"
                        className="p-1 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4 mx-auto" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Exam Details / Hall Ticket Modal */}
      {selectedExam && (
        <Modal
          isOpen={!!selectedExam}
          onClose={() => {
            setSelectedExam(null);
            setShowHallTicket(false);
          }}
          title={showHallTicket ? 'Official Examination Hall Ticket' : 'Examination Details'}
          description={`${selectedExam.examName} (${selectedExam.courseCode})`}
          maxWidth="lg"
        >
          <div className="space-y-5">
            {/* Hall Ticket Printable Preview */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold font-mono text-sm">
                    U
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase">
                      UTOPIA UNIVERSITY – OFFICE OF CONTROLLER OF EXAMINATIONS
                    </h4>
                    <p className="text-[10px] text-slate-500">Admit Card / Exam Verification Pass • Spring 2024</p>
                  </div>
                </div>
                <Badge variant={selectedExam.status === 'Completed' ? 'completed' : 'upcoming'}>
                  {selectedExam.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Candidate Name</span>
                  <span className="font-bold text-slate-800">Merna Vance</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Student ID / Roll No</span>
                  <span className="font-mono font-bold text-slate-800">UTP-2023-4182</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Program</span>
                  <span className="font-medium text-slate-800">B.Sc. Interactive Design</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Date of Exam</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {selectedExam.date}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Reporting Time</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {selectedExam.time}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Hall / Room</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {selectedExam.location}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <span className="font-semibold text-slate-800 block">Instructions for Candidate:</span>
                <p>1. Candidate must bring this Hall Ticket along with physical Student ID Card.</p>
                <p>2. Electronic gadgets, smart watches, and unauthorized material are strictly prohibited.</p>
                <p>3. Gates will close 15 minutes prior to the commencement of the examination.</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedExam(null);
                  setShowHallTicket(false);
                }}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.print()}
                className="gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Hall Ticket</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
