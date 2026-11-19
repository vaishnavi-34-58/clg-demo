import React from 'react';
import { useErp } from '../../../hooks/useErp';
import { ManagementRole } from '../../../types/auth';

// 12 Role Dashboards
import { SuperAdminDashboard } from './SuperAdminDashboard';
import { PrincipalDashboard } from './PrincipalDashboard';
import { HodDashboard } from './HodDashboard';
import { FacultyDashboard } from './FacultyDashboard';
import { ExamControllerDashboard } from './ExamControllerDashboard';
import { AdmissionsDashboard } from './AdmissionsDashboard';
import { AccountsDashboard } from './AccountsDashboard';
import { HostelDashboard } from './HostelDashboard';
import { TransportDashboard } from './TransportDashboard';
import { LibraryDashboard } from './LibraryDashboard';
import { PlacementDashboard } from './PlacementDashboard';
import { StudentAffairsDashboard } from './StudentAffairsDashboard';

export const RoleDashboardRouter: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { currentUser } = useErp();
  const role = (currentUser?.role as ManagementRole) || 'SUPER_ADMIN';

  switch (role) {
    case 'SUPER_ADMIN':
      return <SuperAdminDashboard onNavigate={onNavigate} />;
    case 'PRINCIPAL':
      return <PrincipalDashboard onNavigate={onNavigate} />;
    case 'HOD':
      return <HodDashboard onNavigate={onNavigate} />;
    case 'FACULTY':
      return <FacultyDashboard onNavigate={onNavigate} />;
    case 'EXAM_CONTROLLER':
      return <ExamControllerDashboard onNavigate={onNavigate} />;
    case 'ADMISSION_MGMT':
      return <AdmissionsDashboard onNavigate={onNavigate} />;
    case 'ACCOUNTS_MGMT':
      return <AccountsDashboard onNavigate={onNavigate} />;
    case 'HOSTEL_MGMT':
      return <HostelDashboard onNavigate={onNavigate} />;
    case 'TRANSPORT_MGMT':
      return <TransportDashboard onNavigate={onNavigate} />;
    case 'LIBRARY_MGMT':
      return <LibraryDashboard onNavigate={onNavigate} />;
    case 'PLACEMENT_OFFICER':
      return <PlacementDashboard onNavigate={onNavigate} />;
    case 'STUDENT_AFFAIRS':
      return <StudentAffairsDashboard onNavigate={onNavigate} />;
    default:
      return <SuperAdminDashboard onNavigate={onNavigate} />;
  }
};
