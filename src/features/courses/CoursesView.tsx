import React, { useState } from 'react';
import { Download, Search, CheckCircle2, Clock, MapPin, FileText } from 'lucide-react';
import { EnrolledCourse } from '../../types/course';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

interface CoursesViewProps {
  courses: EnrolledCourse[];
}

export const CoursesView: React.FC<CoursesViewProps> = ({ courses }) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'enrolled' | 'curriculum' | 'materials'>('enrolled');
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null);

  const filteredCourses = courses.filter((c) =>
    c.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const learningMaterials = [
    { id: 1, course: 'ART101', title: 'Typography & Layout Systems - Lecture Slides (PDF)', size: '4.2 MB', date: 'Jan 10, 2024' },
    { id: 2, course: 'ITD201', title: 'Responsive CSS Grid & Flexbox Masterclass Repo', size: '1.8 MB', date: 'Jan 08, 2024' },
    { id: 3, course: 'UXD301', title: 'Usability Testing Protocol & Heuristic Checklist', size: '890 KB', date: 'Jan 11, 2024' },
    { id: 4, course: 'ANI301', title: 'Maya 3D Character Rigging Starter Pack', size: '45.0 MB', date: 'Jan 05, 2024' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Academic Courses &amp; Curriculum
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Enrolled subjects, credit structures, syllabi and learning resources for Spring 2024
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search subjects or faculty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:outline-none"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('enrolled')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'enrolled'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Enrolled Subjects ({courses.length})
        </button>
        <button
          onClick={() => setActiveTab('curriculum')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'curriculum'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Degree Course Plan (8 Semesters)
        </button>
        <button
          onClick={() => setActiveTab('materials')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'materials'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Learning Materials &amp; Downloads
        </button>
      </div>

      {/* Enrolled Courses Tab */}
      {activeTab === 'enrolled' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-slate-100 text-slate-800">
                    {course.courseCode}
                  </span>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                    {course.credits} Credits
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{course.courseName}</h3>
                <p className="text-xs text-slate-500 font-medium">Instructor: {course.instructor}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{course.scheduleTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{course.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1 text-emerald-600 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{course.attendancePercentage || 92}% Attendance</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCourse(course)}
                  className="text-xs"
                >
                  View Syllabus
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Curriculum / Course Plan Tab */}
      {activeTab === 'curriculum' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">4-Year Degree Roadmap</h3>
              <p className="text-xs text-slate-500">Bachelor of Science in Interactive Design &amp; Digital Media</p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
              59 / 128 Credits Completed
            </span>
          </div>

          <div className="space-y-4">
            {[
              { sem: 'Semester 1', year: 'Year 1 - Fall', credits: 20, status: 'Completed (SGPA: 3.80)' },
              { sem: 'Semester 2', year: 'Year 1 - Spring', credits: 21, status: 'Completed (SGPA: 3.88)' },
              { sem: 'Semester 3', year: 'Year 2 - Fall (Current)', credits: 18, status: 'In Progress (4 Courses Active)' },
              { sem: 'Semester 4', year: 'Year 2 - Spring', credits: 18, status: 'Upcoming Registration' },
              { sem: 'Semester 5', year: 'Year 3 - Fall', credits: 16, status: 'Scheduled' },
              { sem: 'Semester 6', year: 'Year 3 - Spring', credits: 15, status: 'Scheduled' },
              { sem: 'Semester 7', year: 'Year 4 - Fall', credits: 10, status: 'Internship / Capstone' },
              { sem: 'Semester 8', year: 'Year 4 - Spring', credits: 10, status: 'Degree Project Jury' },
            ].map((s, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">{s.sem} – {s.year}</span>
                  <span className="text-slate-400">{s.credits} Credits Required</span>
                </div>
                <span className="font-semibold text-slate-700">{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Materials Tab */}
      {activeTab === 'materials' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Digital Course Materials &amp; Lecture Notes
          </h3>
          <div className="divide-y divide-slate-100">
            {learningMaterials.map((mat) => (
              <div key={mat.id} className="py-3.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">{mat.title}</span>
                    <span className="text-[11px] text-slate-400">{mat.course} • {mat.size} • Uploaded {mat.date}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast(`Downloading ${mat.title}...`, 'info')}
                  className="gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Course Syllabus Modal */}
      {selectedCourse && (
        <Modal
          isOpen={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
          title={`Syllabus & Course Outline: ${selectedCourse.courseName}`}
          description={`${selectedCourse.courseCode} • Department of Design • 3 Credit Units`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="font-bold text-slate-900 block">Course Description &amp; Objectives</span>
              <p className="text-slate-600 leading-relaxed">
                This comprehensive curriculum provides students with both theoretical depth and rigorous studio practice in modern visual communications, digital systems design, and creative design thinking.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-900 block">Grading Weight Distribution:</span>
              <div className="grid grid-cols-2 gap-2 text-slate-700">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="block text-slate-400 text-[10px]">Continuous Studio Assessment</span>
                  <span className="font-bold text-slate-900">30% (Homeworks &amp; Labs)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="block text-slate-400 text-[10px]">Mid-Term Project Jury</span>
                  <span className="font-bold text-slate-900">20% (Individual Prototype)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="block text-slate-400 text-[10px]">Final Capstone Submission</span>
                  <span className="font-bold text-slate-900">40% (End-Sem Evaluation)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="block text-slate-400 text-[10px]">Class Attendance &amp; Critique</span>
                  <span className="font-bold text-slate-900">10% (Active Participation)</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCourse(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  toast(`Downloading official syllabus for ${selectedCourse.courseCode}...`, 'info');
                  setSelectedCourse(null);
                }}
                className="gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Syllabus PDF</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
