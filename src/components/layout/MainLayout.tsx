import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { RightSidebar } from './RightSidebar';
import { StudentProfile } from '../../types/student';
import { HomeworkItem } from '../../types/assignment';

export interface MainLayoutProps {
  student: StudentProfile;
  homeworks?: HomeworkItem[];
  currentPath?: string;
  onNavigate?: (path: string) => void;
  showRightSidebar?: boolean;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  student,
  homeworks = [],
  currentPath = '/dashboard',
  onNavigate,
  showRightSidebar,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Automatically show right sidebar on dashboard unless explicitly overridden
  const shouldShowRightSidebar = showRightSidebar !== undefined 
    ? showRightSidebar 
    : currentPath === '/dashboard';

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
      {/* Left Sidebar Navigation */}
      <Sidebar
        currentPath={currentPath}
        onNavigate={onNavigate}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Center + Header Application Column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header
          student={student}
          onNavigate={onNavigate}
          onMenuToggle={() => setMobileMenuOpen(true)}
        />

        {/* Inner Content Area & Optional Right Sidebar */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-thin">
            {children}
          </main>

          {/* Right Sidebar Widget Column (Reference Dashboard layout) */}
          {shouldShowRightSidebar && (
            <div className="hidden xl:block">
              <RightSidebar
                homeworks={homeworks}
                onViewAllHomeworks={() => onNavigate?.('/homeworks')}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
