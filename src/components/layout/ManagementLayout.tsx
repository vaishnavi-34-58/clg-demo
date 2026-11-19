import React, { useState } from 'react';
import { ManagementSidebar } from './ManagementSidebar';
import { ManagementHeader } from './ManagementHeader';
import { UserProfile, ManagementRole } from '../../types/auth';

export interface ManagementLayoutProps {
  currentUser: UserProfile;
  currentPath: string;
  onNavigate: (path: string) => void;
  onSwitchToStudentPortal: () => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const ManagementLayout: React.FC<ManagementLayoutProps> = ({
  currentUser,
  currentPath,
  onNavigate,
  onSwitchToStudentPortal,
  onLogout,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 font-sans text-slate-800">
      {/* Sidebar */}
      <ManagementSidebar
        role={currentUser.role as ManagementRole}
        userName={currentUser.name}
        department={currentUser.department}
        currentPath={currentPath}
        onNavigate={onNavigate}
        onSwitchToStudentPortal={onSwitchToStudentPortal}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Container Column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Header */}
        <ManagementHeader
          currentUser={currentUser}
          currentPath={currentPath}
          onMenuToggle={() => setMobileMenuOpen(true)}
          onSwitchToStudentPortal={onSwitchToStudentPortal}
          onLogout={onLogout}
        />

        {/* Scrollable Content Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
};
