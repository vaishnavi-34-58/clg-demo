import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { ToastProvider } from './context/ToastContext';
import { ErpProvider } from './context/ErpContext';
import { useErp } from './hooks/useErp';
import { useToast } from './hooks/useToast';
import { APP_ROUTES } from './app/routes';

// Student Feature Views
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

// Management Feature Views
import { ManagementLoginView } from './features/management/ManagementLoginView';
import { ManagementLayout } from './components/layout/ManagementLayout';
import { RoleDashboardRouter } from './features/management/dashboards/RoleDashboardRouter';
import { ManagementStudentsView } from './features/management/modules/ManagementStudentsView';
import { ManagementFacultyView } from './features/management/modules/ManagementFacultyView';
import { ManagementDepartmentsView } from './features/management/modules/ManagementDepartmentsView';
import { ManagementCoursesView } from './features/management/modules/ManagementCoursesView';
import { ManagementAttendanceView } from './features/management/modules/ManagementAttendanceView';
import { ManagementAssignmentsView } from './features/management/modules/ManagementAssignmentsView';
import { ManagementExaminationsView } from './features/management/modules/ManagementExaminationsView';
import { ManagementAdmissionsView } from './features/management/modules/ManagementAdmissionsView';
import { ManagementFinanceView } from './features/management/modules/ManagementFinanceView';
import { ManagementHostelView } from './features/management/modules/ManagementHostelView';
import { ManagementTransportView } from './features/management/modules/ManagementTransportView';
import { ManagementLibraryView } from './features/management/modules/ManagementLibraryView';
import { ManagementPlacementsView } from './features/management/modules/ManagementPlacementsView';
import { ManagementStudentAffairsView } from './features/management/modules/ManagementStudentAffairsView';
import { ManagementAuditLogsView } from './features/management/modules/ManagementAuditLogsView';
import { ManagementSettingsView } from './features/management/modules/ManagementSettingsView';

const STORAGE_KEYS = {
  CURRENT_ROUTE: 'utopia_erp_route',
};

const AppContent: React.FC = () => {
  const { toast } = useToast();
  const {
    student,
    updateStudentProfile,
    homeworks,
    courses,
    exams,
    currentUser,
    logoutManagement,
  } = useErp();

  // Active route synchronized with URL pathname and history
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const urlPath = window.location.pathname;
    if (urlPath && urlPath !== '/' && urlPath !== '') {
      return urlPath;
    }
    return localStorage.getItem(STORAGE_KEYS.CURRENT_ROUTE) || APP_ROUTES.DASHBOARD;
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || APP_ROUTES.DASHBOARD);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Student Logout Modal
  const [isStudentLogoutModalOpen, setIsStudentLogoutModalOpen] = useState(false);

  // Navigate handler
  const handleNavigate = (path: string) => {
    if (path === '/logout' || path === APP_ROUTES.LOGOUT || path === APP_ROUTES.STUDENT_LOGOUT) {
      setIsStudentLogoutModalOpen(true);
      return;
    }

    if (path === '/management/logout' || path === APP_ROUTES.MANAGEMENT_LOGOUT) {
      logoutManagement();
      setCurrentPath(APP_ROUTES.MANAGEMENT_LOGIN);
      localStorage.setItem(STORAGE_KEYS.CURRENT_ROUTE, APP_ROUTES.MANAGEMENT_LOGIN);
      window.history.pushState(null, '', APP_ROUTES.MANAGEMENT_LOGIN);
      toast('Signed out from Management Portal.', 'info');
      return;
    }

    setCurrentPath(path);
    localStorage.setItem(STORAGE_KEYS.CURRENT_ROUTE, path);
    window.history.pushState(null, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Management Login Route
  if (currentPath === APP_ROUTES.MANAGEMENT_LOGIN) {
    return (
      <ManagementLoginView
        onSuccess={() => handleNavigate(APP_ROUTES.MANAGEMENT_DASHBOARD)}
        onGoToStudentPortal={() => handleNavigate(APP_ROUTES.DASHBOARD)}
      />
    );
  }

  // 2. Management Portal Routes
  if (currentPath.startsWith('/management')) {
    // If not authenticated, redirect to login
    if (!currentUser) {
      return (
        <ManagementLoginView
          onSuccess={() => handleNavigate(APP_ROUTES.MANAGEMENT_DASHBOARD)}
          onGoToStudentPortal={() => handleNavigate(APP_ROUTES.DASHBOARD)}
        />
      );
    }

    const renderManagementModule = () => {
      switch (currentPath) {
        case APP_ROUTES.MANAGEMENT_DASHBOARD:
          return <RoleDashboardRouter onNavigate={handleNavigate} />;
        case APP_ROUTES.MANAGEMENT_STUDENTS:
          return <ManagementStudentsView />;
        case APP_ROUTES.MANAGEMENT_FACULTY:
          return <ManagementFacultyView />;
        case APP_ROUTES.MANAGEMENT_DEPARTMENTS:
          return <ManagementDepartmentsView />;
        case APP_ROUTES.MANAGEMENT_COURSES:
          return <ManagementCoursesView />;
        case APP_ROUTES.MANAGEMENT_ATTENDANCE:
          return <ManagementAttendanceView />;
        case APP_ROUTES.MANAGEMENT_ASSIGNMENTS:
          return <ManagementAssignmentsView />;
        case APP_ROUTES.MANAGEMENT_EXAMINATIONS:
          return <ManagementExaminationsView />;
        case APP_ROUTES.MANAGEMENT_ADMISSIONS:
          return <ManagementAdmissionsView />;
        case APP_ROUTES.MANAGEMENT_FINANCE:
          return <ManagementFinanceView />;
        case APP_ROUTES.MANAGEMENT_HOSTEL:
          return <ManagementHostelView />;
        case APP_ROUTES.MANAGEMENT_TRANSPORT:
          return <ManagementTransportView />;
        case APP_ROUTES.MANAGEMENT_LIBRARY:
          return <ManagementLibraryView />;
        case APP_ROUTES.MANAGEMENT_PLACEMENTS:
          return <ManagementPlacementsView />;
        case APP_ROUTES.MANAGEMENT_STUDENT_AFFAIRS:
          return <ManagementStudentAffairsView />;
        case APP_ROUTES.MANAGEMENT_AUDIT_LOGS:
        case APP_ROUTES.MANAGEMENT_REPORTS:
          return <ManagementAuditLogsView />;
        case APP_ROUTES.MANAGEMENT_SETTINGS:
          return <ManagementSettingsView />;
        default:
          return <RoleDashboardRouter onNavigate={handleNavigate} />;
      }
    };

    return (
      <ManagementLayout
        currentUser={currentUser}
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onSwitchToStudentPortal={() => handleNavigate(APP_ROUTES.DASHBOARD)}
        onLogout={() => {
          logoutManagement();
          handleNavigate(APP_ROUTES.MANAGEMENT_LOGIN);
        }}
      >
        {renderManagementModule()}
      </ManagementLayout>
    );
  }

  // 3. Student Portal Routes
  const renderStudentView = () => {
    switch (currentPath) {
      case APP_ROUTES.DASHBOARD:
        return (
          <DashboardView
            courses={courses}
            exams={exams}
            onNavigate={handleNavigate}
          />
        );

      case APP_ROUTES.PROFILE:
        return (
          <ProfileView
            student={student}
            onUpdateStudent={updateStudentProfile}
          />
        );

      case APP_ROUTES.ENROLLED_COURSES:
      case APP_ROUTES.COURSE_PLAN:
        return <CoursesView courses={courses} />;

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
            courses={courses}
            exams={exams}
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
      {renderStudentView()}

      {/* Logout Modal */}
      {isStudentLogoutModalOpen && (
        <Modal
          isOpen={isStudentLogoutModalOpen}
          onClose={() => setIsStudentLogoutModalOpen(false)}
          title="Sign Out of CampusOne Portal"
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
                onClick={() => setIsStudentLogoutModalOpen(false)}
              >
                Stay Logged In
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setIsStudentLogoutModalOpen(false);
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
      <ErpProvider>
        <AppContent />
      </ErpProvider>
    </ToastProvider>
  );
};

export default App;
