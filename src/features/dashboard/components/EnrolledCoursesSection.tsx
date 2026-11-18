import React, { useState } from 'react';
import { User, Calendar, Clock, MapPin, Layers, ExternalLink } from 'lucide-react';
import { EnrolledCourse } from '../../../types/course';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';

interface EnrolledCoursesSectionProps {
  courses: EnrolledCourse[];
  onViewAll?: () => void;
}

export const EnrolledCoursesSection: React.FC<EnrolledCoursesSectionProps> = ({
  courses,
  onViewAll,
}) => {
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null);

  const colorVariants: Record<string, { headerBg: string; text: string; border: string; badge: string }> = {
    purple: {
      headerBg: 'bg-purple-100/90 text-purple-900',
      text: 'text-purple-700',
      border: 'border-purple-200 hover:border-purple-300',
      badge: 'bg-purple-200 text-purple-800',
    },
    yellow: {
      headerBg: 'bg-amber-100/90 text-amber-900',
      text: 'text-amber-700',
      border: 'border-amber-200 hover:border-amber-300',
      badge: 'bg-amber-200 text-amber-800',
    },
    cyan: {
      headerBg: 'bg-sky-100/90 text-sky-900',
      text: 'text-sky-700',
      border: 'border-sky-200 hover:border-sky-300',
      badge: 'bg-sky-200 text-sky-800',
    },
    mint: {
      headerBg: 'bg-emerald-100/90 text-emerald-900',
      text: 'text-emerald-700',
      border: 'border-emerald-200 hover:border-emerald-300',
      badge: 'bg-emerald-200 text-emerald-800',
    },
    orange: {
      headerBg: 'bg-orange-100/90 text-orange-900',
      text: 'text-orange-700',
      border: 'border-orange-200 hover:border-orange-300',
      badge: 'bg-orange-200 text-orange-800',
    },
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-700" />
          <h2 className="text-sm sm:text-base font-bold text-slate-900">Enrolled Courses</h2>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors cursor-pointer flex items-center gap-1"
        >
          <span>View all</span>
          <span>&gt;</span>
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {courses.map((course) => {
          const styling = colorVariants[course.colorVariant] || colorVariants.purple;

          return (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className={`rounded-2xl border ${styling.border} bg-white overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col group`}
            >
              {/* Card Header Band */}
              <div className={`p-4 ${styling.headerBg} border-b border-inherit`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${styling.badge}`}>
                    {course.courseCode}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {course.credits} Credits
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-900 transition-colors line-clamp-1">
                  {course.courseName}
                </h3>
              </div>

              {/* Card Details Body */}
              <div className="p-4 space-y-2 text-xs text-slate-600 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-medium text-slate-800 truncate">{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-600 truncate">{course.scheduleDays}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-600">{course.scheduleTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-600 truncate">{course.location}</span>
                  </div>
                </div>

                {/* Card Footer / Attendance Indicator */}
                {course.attendancePercentage && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Attendance</span>
                    <span className="font-bold text-emerald-600">
                      {course.attendancePercentage}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <Modal
          isOpen={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
          title={`${selectedCourse.courseName} (${selectedCourse.courseCode})`}
          description={`Instructor: ${selectedCourse.instructor} • ${selectedCourse.credits} Credit Hours`}
          maxWidth="lg"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Class Schedule</span>
                <span className="font-semibold text-slate-800">{selectedCourse.scheduleDays}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Timing</span>
                <span className="font-semibold text-slate-800">{selectedCourse.scheduleTime}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Location</span>
                <span className="font-semibold text-slate-800">{selectedCourse.location}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Attendance Status</span>
                <span className="font-bold text-emerald-600">{selectedCourse.attendancePercentage || 94}% (Good)</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Course Syllabus Highlights
              </h4>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Core principles, design systems, and visual hierarchy.</li>
                <li>Studio critiques, hands-on lab sessions, and digital asset rendering.</li>
                <li>Midterm interactive design project and final jury review.</li>
                <li>Digital portfolio assembly and industry presentation.</li>
              </ul>
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
                  setSelectedCourse(null);
                  onViewAll?.();
                }}
              >
                <span>View Full Course Syllabus</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
