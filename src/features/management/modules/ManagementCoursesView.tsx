import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Clock,
  MapPin,
  Plus,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';
import { EnrolledCourse } from '../../../types/course';

export const ManagementCoursesView: React.FC = () => {
  const { courses, studentsList } = useErp();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null);

  const filteredCourses = courses.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      (c.courseCode || c.code || '').toLowerCase().includes(q) ||
      (c.courseName || c.title || '').toLowerCase().includes(q) ||
      c.instructor.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase">
              <BookOpen className="w-4 h-4" />
              <span>Curriculum Management</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Course Catalog &amp; Assigned Syllabus</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Active semester course offerings, credit allocations, teaching studio rooms, and instructor schedules.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => toast('Course creation module synced with University Academic Senate.', 'info')}
              className="bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Course Offering</span>
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-5 flex items-center gap-3 pt-4 border-t border-slate-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search courses by course code, title, or assigned professor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {filteredCourses.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {c.courseCode || c.code}
                </span>
                <span className="text-xs font-semibold text-slate-500">{c.credits || 4} Credit Hours</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mt-3">{c.courseName || c.title}</h3>
              <p className="text-xs text-indigo-600 font-medium mt-0.5">Faculty: {c.instructor}</p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Schedule</span>
                  <div className="font-medium text-slate-800 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{c.scheduleDays || c.schedule}</span>
                  </div>
                  <span className="text-[11px] text-slate-500">{c.scheduleTime || c.time}</span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Location</span>
                  <div className="font-medium text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{c.location}</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Design Wing B</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-emerald-600 font-semibold">
                {c.enrolledStudentsCount || 32} Enrolled Students
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCourse(c)}
                className="text-xs font-semibold"
              >
                Inspect Syllabus
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Course Modal */}
      {selectedCourse && (
        <Modal
          isOpen={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
          title={`${selectedCourse.courseCode || selectedCourse.code} - ${selectedCourse.courseName || selectedCourse.title}`}
          description={`Instructor: ${selectedCourse.instructor} | Venue: ${selectedCourse.location}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Weekly Meeting:</span>
                <span className="font-semibold text-slate-800">{selectedCourse.scheduleDays || selectedCourse.schedule} ({selectedCourse.scheduleTime || selectedCourse.time})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Credits:</span>
                <span className="font-bold text-indigo-700">{selectedCourse.credits || 4} Semester Credits</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-800">Enrolled Student Cohort</span>
              <p className="text-slate-500 text-[11px]">
                Showing registered students attending this course in Semester III:
              </p>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {studentsList.map((stu) => (
                  <div key={stu.id} className="flex items-center justify-between p-2 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2">
                      <img src={stu.avatarUrl} alt={stu.name} className="w-6 h-6 rounded-full" />
                      <span className="font-semibold text-slate-800">{stu.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{stu.studentId}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setSelectedCourse(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
