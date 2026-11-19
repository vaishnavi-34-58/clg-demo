import React, { useState } from 'react';
import { Upload, CheckCircle2, Clock, Send, Check } from 'lucide-react';
import { MOCK_HOMEWORK_ITEMS } from '../../mock/homeworks.mock';
import { HomeworkItem, HomeworkStatus } from '../../types/assignment';
import { Badge, BadgeVariant } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';

interface AssignmentsViewProps {
  homeworks?: HomeworkItem[];
  onUpdateHomeworks?: (items: HomeworkItem[]) => void;
}

export const AssignmentsView: React.FC<AssignmentsViewProps> = ({
  homeworks = MOCK_HOMEWORK_ITEMS,
  onUpdateHomeworks,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');
  const [submittingItem, setSubmittingItem] = useState<HomeworkItem | null>(null);
  const [uploadFileName, setUploadFileName] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');

  const getStatusBadgeVariant = (status: HomeworkStatus): BadgeVariant => {
    switch (status) {
      case 'Completed':
        return 'completed';
      case 'In Progress':
        return 'inProgress';
      case 'Not Submitted':
        return 'notSubmitted';
      case 'Not Started':
        return 'notStarted';
      default:
        return 'default';
    }
  };

  const filteredHomeworks = homeworks.filter((item) => {
    if (activeTab === 'pending') return item.status !== 'Completed';
    if (activeTab === 'completed') return item.status === 'Completed';
    return true;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFileName(e.target.files[0].name);
    }
  };

  const handleCompleteSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittingItem) return;

    const updatedList = homeworks.map((hw) => {
      if (hw.id === submittingItem.id) {
        return {
          ...hw,
          status: 'Completed' as HomeworkStatus,
          submissionDate: 'Just now',
          score: 98,
        };
      }
      return hw;
    });

    onUpdateHomeworks?.(updatedList);
    toast(`Assignment "${submittingItem.assignmentTitle}" submitted successfully!`, 'success');
    setSubmittingItem(null);
    setUploadFileName('');
    setSubmissionNotes('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Assignments &amp; Homework Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Submit coursework, track submission deadlines, faculty marks and review evaluations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
            {homeworks.filter((h) => h.status !== 'Completed').length} Pending Submissions
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'all'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          All Tasks ({homeworks.length})
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'pending'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Due &amp; Pending ({homeworks.filter((h) => h.status !== 'Completed').length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'completed'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Submitted &amp; Graded ({homeworks.filter((h) => h.status === 'Completed').length})
        </button>
      </div>

      {/* Assignment Cards Grid */}
      <div className="space-y-4">
        {filteredHomeworks.map((hw) => {
          const isDone = hw.status === 'Completed';

          return (
            <div
              key={hw.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded bg-slate-100 text-slate-800">
                    {hw.courseCode}
                  </span>
                  <span className="text-xs font-bold text-slate-600">{hw.courseTitle}</span>
                  <Badge variant={getStatusBadgeVariant(hw.status)}>
                    {hw.status}
                  </Badge>
                </div>

                <h3 className="text-base font-bold text-slate-900">{hw.assignmentTitle}</h3>

                <p className="text-xs text-slate-500">
                  Deliverable: Comprehensive studio design portfolio prototype with heuristic annotations.
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Due Date: <strong className="text-slate-700 ml-1">{hw.dueDate}</strong>
                  </span>
                  <span>•</span>
                  <span>Total Worth: <strong className="text-slate-700">{hw.points || 100} Points</strong></span>
                  {hw.score && (
                    <>
                      <span>•</span>
                      <span className="text-emerald-600 font-bold">Graded: {hw.score} / {hw.points || 100}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                {isDone ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submitted &amp; Verified</span>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setSubmittingItem(hw);
                      setUploadFileName('');
                    }}
                    className="gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload &amp; Submit</span>
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload & Submit Modal */}
      {submittingItem && (
        <Modal
          isOpen={!!submittingItem}
          onClose={() => setSubmittingItem(null)}
          title={`Submit Assignment: ${submittingItem.assignmentTitle}`}
          description={`${submittingItem.courseCode} • Due by ${submittingItem.dueDate}`}
          maxWidth="lg"
        >
          <form onSubmit={handleCompleteSubmission} className="space-y-4 text-xs">
            {/* File Drag and Drop / Selector */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Attach Deliverable File (PDF, ZIP, Figma link, PNG)
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-slate-400 transition-colors bg-slate-50 cursor-pointer relative">
                <input
                  type="file"
                  required={!uploadFileName}
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                {uploadFileName ? (
                  <p className="font-bold text-emerald-600">{uploadFileName} (Ready for submission)</p>
                ) : (
                  <>
                    <p className="font-medium text-slate-700">Click to browse or drop assignment file here</p>
                    <p className="text-[11px] text-slate-400 mt-1">Maximum file size: 50MB</p>
                  </>
                )}
              </div>
            </div>

            {/* Submission Notes */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Remarks / Comments for Professor
              </label>
              <textarea
                rows={3}
                placeholder="Optional notes or design rationale..."
                value={submissionNotes}
                onChange={(e) => setSubmissionNotes(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>

            {/* Declaration */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>I certify that this submission represents my original independent academic work in accordance with CampusOne University Honor Code.</span>
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSubmittingItem(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Final Deliverable</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
