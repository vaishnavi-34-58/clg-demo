import React, { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { ToastProvider, useToast } from './context/ToastContext';
import { APP_ROUTES } from './app/routes';

// Mock Data
import { DEMO_STUDENT } from './mock/demoStudent';
import { MOCK_ENROLLED_COURSES } from './mock/courses.mock';
import { MOCK_EXAM_RECORDS } from './mock/examinations.mock';
import { MOCK_HOMEWORK_ITEMS } from './mock/homeworks.mock';
import { StudentProfile } from './types/student';
import { HomeworkItem } from './types/assignment';

// Feature Views
import { DashboardView } from './features/dashboard/DashboardView';
import { ProfileView } from './features/profile/ProfileView';
import { CoursesView } from './features/courses/CoursesView';
import { TimetableView } from './features/timetable/TimetableView';
import { AttendanceView } from './features/attendance/AttendanceView';
import { ExaminationsView } from './features/examinations/ExaminationsView';
import { GradeReportView } from './features/academics/GradeReportView';
import { AssignmentsView } from './features/assignments/AssignmentsView';
import { FinanceView } from './features/finance/FinanceView';
import { LibraryView } from './features/library/LibraryView';
import { AnnouncementsView } from './features/announcements/AnnouncementsView';
import { LeaveView } from './features/leave/LeaveView';
import { EventsView } from './features/events/EventsView';
import { HostelView } from './features/hostel/HostelView';
import { TransportView } from './features/transport/TransportView';
import { CertificatesView } from './features/certificates/CertificatesView';
import { GrievancesView } from './features/grievances/GrievancesView';
import { PlacementsView } from './features/placements/PlacementsView';
import { SettingsView } from './features/settings/SettingsView';
import { Modal } from './components/ui/Modal';
import { Button } from './components/ui/Button';

const STORAGE_KEYS = {
  STUDENT: 'utopia_erp_student',
  HOMEWORKS: 'utopia_erp_homeworks',
  CURRENT_ROUTE: 'utopia_erp_route',
};

const AppContent: React.FC = () => {
  const { toast } = useToast();

  // Load persisted student or fallback to DEMO_STUDENT
  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STUDENT);
    return saved ? JSON.parse(saved) : DEMO_STUDENT;
  });

  // Load persisted homeworks or fallback to MOCK_HOMEWORK_ITEMS
  const [homeworks, setHomeworks] = useState<HomeworkItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HOMEWORKS);
    return saved ? JSON.parse(saved) : MOCK_HOMEWORK_ITEMS;
  });

  // Current active route
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_ROUTE) || APP_ROUTES.DASHBOARD;
  });

  // Logout Confirmation Modal
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Sync route changes
  const handleNavigate = (path: string) => {
    if (path === '/logout') {
      setIsLogoutModalOpen(true);
      return;
    }
    setCurrentPath(path);
    localStorage.setItem(STORAGE_KEYS.CURRENT_ROUTE, path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update student profile and persist
  const handleUpdateStudent = (updated: StudentProfile) => {
    setStudent(updated);
    localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(updated));
  };

  // Update homework items and persist
  const handleUpdateHomeworks = (updated: HomeworkItem[]) => {
    setHomeworks(updated);
    localStorage.setItem(STORAGE_KEYS.HOMEWORKS, JSON.stringify(updated));
  };

  // Render active module view
  const renderCurrentView = () => {
    switch (currentPath) {
      case APP_ROUTES.DASHBOARD:
        return (
          <DashboardView
            courses={MOCK_ENROLLED_COURSES}
            exams={MOCK_EXAM_RECORDS}
            onNavigate={handleNavigate}
          />
        );

      case APP_ROUTES.PROFILE:
        return (
          <ProfileView
            student={student}
            onUpdateStudent={handleUpdateStudent}
          />
        );

      case APP_ROUTES.ENROLLED_COURSES:
      case APP_ROUTES.COURSE_PLAN:
        return <CoursesView courses={MOCK_ENROLLED_COURSES} />;

      case APP_ROUTES.SCHEDULE:
        return <TimetableView />;

      case APP_ROUTES.ATTENDANCE:
        return <AttendanceView />;

      case APP_ROUTES.EXAM_BOARD:
        return <ExaminationsView />;

      case APP_ROUTES.GRADE_REPORT:
        return <GradeReportView />;

      case APP_ROUTES.HOMEWORKS:
        return (
          <AssignmentsView
            homeworks={homeworks}
            onUpdateHomeworks={handleUpdateHomeworks}
          />
        );

      case APP_ROUTES.FINANCE:
        return <FinanceView />;

      case APP_ROUTES.LIBRARIES:
        return <LibraryView />;

      case APP_ROUTES.ANNOUNCEMENTS:
        return <AnnouncementsView />;

      case APP_ROUTES.LEAVE:
        return <LeaveView />;

      case APP_ROUTES.EVENTS:
        return <EventsView />;

      case APP_ROUTES.HOSTEL:
        return <HostelView />;

      case APP_ROUTES.TRANSPORT:
        return <TransportView />;

      case APP_ROUTES.CERTIFICATES:
        return <CertificatesView />;

      case APP_ROUTES.GRIEVANCES:
        return <GrievancesView />;

      case APP_ROUTES.PLACEMENTS:
        return <PlacementsView />;

      case APP_ROUTES.ACCOUNT_SETTINGS:
      case APP_ROUTES.NOTIFICATION_PREFERENCES:
        return <SettingsView />;

      default:
        return (
          <DashboardView
            courses={MOCK_ENROLLED_COURSES}
            exams={MOCK_EXAM_RECORDS}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <MainLayout
      student={student}
      homeworks={homeworks}
      currentPath={currentPath}
      onNavigate={handleNavigate}
    >
      {renderCurrentView()}

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <Modal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          title="Sign Out of Utopia ERP Portal"
          description="Are you sure you want to end your student session?"
          maxWidth="sm"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Your active session for <strong className="text-slate-900">{student.name} ({student.studentId})</strong> will be closed. In demo mode, your local changes remain safely preserved.
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLogoutModalOpen(false)}
              >
                Stay Logged In
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setIsLogoutModalOpen(false);
                  handleNavigate(APP_ROUTES.DASHBOARD);
                  toast('Demo session refreshed. Welcome back, Merna!', 'info');
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white"
              >
                Confirm Logout
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </MainLayout>
  );
};

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
};

export default App;
