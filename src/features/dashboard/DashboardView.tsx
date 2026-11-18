import React from 'react';
import { ClubBanner } from './components/ClubBanner';
import { QuickStats } from './components/QuickStats';
import { EnrolledCoursesSection } from './components/EnrolledCoursesSection';
import { ExamBoardSection } from './components/ExamBoardSection';
import { EnrolledCourse } from '../../types/course';
import { ExamRecord } from '../../types/examination';

interface DashboardViewProps {
  courses: EnrolledCourse[];
  exams: ExamRecord[];
  onNavigate?: (path: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  courses,
  exams,
  onNavigate,
}) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Top Quick Stats Row */}
      <QuickStats onNavigate={onNavigate} />

      {/* Hero Welcome / Club Banner (Directly from reference design) */}
      <ClubBanner onLearnMore={() => onNavigate?.('/events')} />

      {/* Enrolled Courses Grid (Directly from reference design) */}
      <EnrolledCoursesSection
        courses={courses}
        onViewAll={() => onNavigate?.('/enrolled-courses')}
      />

      {/* Exam Board Table (Directly from reference design) */}
      <ExamBoardSection
        exams={exams}
        onViewAll={() => onNavigate?.('/exam-board')}
      />
    </div>
  );
};
