import React, { createContext, useState, useEffect, useCallback } from 'react';
import { ManagementRole, UserProfile } from '../types/auth';
import { StudentProfile } from '../types/student';
import { EnrolledCourse } from '../types/course';
import { ExamRecord } from '../types/examination';
import { HomeworkItem } from '../types/assignment';
import { AttendanceRecord } from '../types/attendance';
import { FeeItem } from '../types/finance';
import { LibraryBook } from '../types/library';
import { Announcement } from '../types/announcement';
import { LeaveRequest } from '../types/leave';
import { HostelDetails } from '../mock/hostel.mock';
import { TransportDetails } from '../mock/transport.mock';
import { CertificateRequest } from '../mock/certificates.mock';
import { GrievanceTicket } from '../mock/grievances.mock';
import { PlacementDrive } from '../mock/placements.mock';
import { SemesterResult } from '../mock/results.mock';
import { Applicant, AuditLogEntry, Department, FacultyMember } from '../types/management';

// Default mock initial states
import { DEMO_STUDENT } from '../mock/demoStudent';
import { MOCK_ENROLLED_COURSES } from '../mock/courses.mock';
import { MOCK_EXAM_RECORDS } from '../mock/examinations.mock';
import { MOCK_HOMEWORK_ITEMS } from '../mock/homeworks.mock';
import { MOCK_ATTENDANCE_RECORDS } from '../mock/attendance.mock';
import { MOCK_FEE_ITEMS } from '../mock/finance.mock';
import { MOCK_LIBRARY_BOOKS } from '../mock/library.mock';
import { MOCK_ANNOUNCEMENTS } from '../mock/announcements.mock';
import { MOCK_HOSTEL_DATA } from '../mock/hostel.mock';
import { MOCK_TRANSPORT_DATA } from '../mock/transport.mock';
import { MOCK_CERTIFICATE_REQUESTS } from '../mock/certificates.mock';
import { MOCK_GRIEVANCES } from '../mock/grievances.mock';
import { MOCK_PLACEMENT_DRIVES } from '../mock/placements.mock';
import { MOCK_SEMESTER_RESULTS } from '../mock/results.mock';
import { MOCK_DEPARTMENTS, MOCK_FACULTY_MEMBERS, MOCK_APPLICANTS, MOCK_AUDIT_LOGS } from '../mock/management.mock';
import { MANAGEMENT_CREDENTIALS } from '../constants/managementRoles';

const STORAGE_KEY = 'utopia_erp_unified_state_v1';

const getSavedState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error loading stored ERP state:', e);
  }
  return null;
};

export interface ErpContextType {
  // Portal & Session State
  currentPortal: 'STUDENT' | 'MANAGEMENT';
  setCurrentPortal: (portal: 'STUDENT' | 'MANAGEMENT') => void;
  currentUser: UserProfile | null;
  managementRole: ManagementRole | null;
  loginManagement: (email: string, pass: string) => boolean;
  quickLogin: (role: ManagementRole) => void;
  logoutManagement: () => void;

  // Interconnected ERP Entities
  student: StudentProfile;
  studentsList: StudentProfile[];
  updateStudentProfile: (updated: StudentProfile) => void;
  courses: EnrolledCourse[];
  attendance: AttendanceRecord[];
  homeworks: HomeworkItem[];
  exams: ExamRecord[];
  results: SemesterResult[];
  finance: FeeItem[];
  hostel: HostelDetails;
  transport: TransportDetails;
  library: LibraryBook[];
  announcements: Announcement[];
  leaves: LeaveRequest[];
  certificates: CertificateRequest[];
  grievances: GrievanceTicket[];
  placements: PlacementDrive[];
  admissions: Applicant[];
  departments: Department[];
  facultyMembers: FacultyMember[];
  auditLogs: AuditLogEntry[];

  // Cross-Portal Interconnected Operations
  markAttendance: (courseCode: string, studentId: string, status: 'Present' | 'Absent') => void;
  createAssignment: (assignment: { courseCode: string; courseTitle: string; assignmentTitle: string; dueDate: string; points: number }) => void;
  gradeHomework: (homeworkId: string, score: number) => void;
  updateInternalMarks: (semesterNum: number, courseCode: string, newInternalMarks: number) => void;
  recordFeePayment: (feeId: string, amount: number, paymentMode: string) => void;
  resolveHostelComplaint: (complaintId: string) => void;
  allocateHostelRoom: (studentId: string, roomNumber: string, bedNumber: string) => void;
  updateTransportRoute: (studentId: string, routeNumber: string, pickupStop: string) => void;
  issueLibraryBook: (title: string, author: string, isbn: string) => void;
  returnLibraryBook: (bookId: string) => void;
  postAnnouncement: (announcement: { title: string; category: Announcement['category']; summary: string; priority: 'High' | 'Normal' | 'Low' }) => void;
  resolveGrievance: (ticketId: string, response: string) => void;
  approveAdmissionApplicant: (applicantId: string) => void;
  createPlacementDrive: (drive: Omit<PlacementDrive, 'id'>) => void;
  updatePlacementApplicantStatus: (driveId: string, status: PlacementDrive['status']) => void;
  approveLeaveRequest: (leaveId: string, status: 'Approved' | 'Rejected') => void;
}

export const ErpContext = createContext<ErpContextType | undefined>(undefined);

export const ErpProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const savedState = getSavedState();

  // Load initial unified state from local storage or fallback to mocks
  const [currentPortal, setCurrentPortal] = useState<'STUDENT' | 'MANAGEMENT'>('STUDENT');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('utopia_mgmt_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [student, setStudent] = useState<StudentProfile>(DEMO_STUDENT);
  const [studentsList] = useState<StudentProfile[]>([
    DEMO_STUDENT,
    {
      id: 'stu_02',
      studentId: 'UTP-2023-3921',
      name: 'Julian Rivera',
      preferredName: 'Julian',
      email: 'julian.r@student.campusone.edu',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      program: 'B.Sc. Web Engineering',
      department: 'Department of Computer Science',
      currentSemester: 3,
      totalSemesters: 8,
      academicYear: '2023 - 2024',
      cgpa: 3.72,
      advisorName: 'Dr. Gregory Clark',
    },
    {
      id: 'stu_03',
      studentId: 'UTP-2023-4019',
      name: 'Elena Rostova',
      preferredName: 'Elena',
      email: 'elena.r@student.campusone.edu',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      program: 'B.Sc. Interactive Design',
      department: 'School of Art & Interactive Design',
      currentSemester: 3,
      totalSemesters: 8,
      academicYear: '2023 - 2024',
      cgpa: 3.91,
      advisorName: 'Prof. Arthur Smith',
    },
  ]);

  const [courses] = useState<EnrolledCourse[]>(MOCK_ENROLLED_COURSES);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(savedState?.attendance || MOCK_ATTENDANCE_RECORDS);
  const [homeworks, setHomeworks] = useState<HomeworkItem[]>(savedState?.homeworks || MOCK_HOMEWORK_ITEMS);
  const [exams] = useState<ExamRecord[]>(MOCK_EXAM_RECORDS);
  const [results, setResults] = useState<SemesterResult[]>(savedState?.results || MOCK_SEMESTER_RESULTS);
  const [finance, setFinance] = useState<FeeItem[]>(savedState?.finance || MOCK_FEE_ITEMS);
  const [hostel, setHostel] = useState<HostelDetails>(savedState?.hostel || MOCK_HOSTEL_DATA);
  const [transport, setTransport] = useState<TransportDetails>(savedState?.transport || MOCK_TRANSPORT_DATA);
  const [library, setLibrary] = useState<LibraryBook[]>(savedState?.library || MOCK_LIBRARY_BOOKS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(savedState?.announcements || MOCK_ANNOUNCEMENTS);
  const [leaves, setLeaves] = useState<LeaveRequest[]>(savedState?.leaves || [
    {
      id: 'LV-2023-014',
      studentId: 'UTP-2023-4182',
      leaveType: 'Medical',
      startDate: 'Nov 12, 2023',
      endDate: 'Nov 14, 2023',
      reason: 'Viral fever prescribed rest by health center physician.',
      status: 'Approved',
      appliedOn: 'Nov 11, 2023',
      reviewedBy: 'Dean of Student Welfare',
    },
    {
      id: 'LV-2024-001',
      studentId: 'UTP-2023-4182',
      leaveType: 'Academic',
      startDate: 'Jan 28, 2024',
      endDate: 'Jan 30, 2024',
      reason: 'Representing university at State Design Hackathon & Jury.',
      status: 'Pending',
      appliedOn: 'Jan 12, 2024',
    },
  ]);
  const [certificates] = useState<CertificateRequest[]>(MOCK_CERTIFICATE_REQUESTS);
  const [grievances, setGrievances] = useState<GrievanceTicket[]>(savedState?.grievances || MOCK_GRIEVANCES);
  const [placements, setPlacements] = useState<PlacementDrive[]>(savedState?.placements || MOCK_PLACEMENT_DRIVES);
  const [admissions, setAdmissions] = useState<Applicant[]>(savedState?.admissions || MOCK_APPLICANTS);
  const [departments] = useState<Department[]>(MOCK_DEPARTMENTS);
  const [facultyMembers] = useState<FacultyMember[]>(MOCK_FACULTY_MEMBERS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(savedState?.auditLogs || MOCK_AUDIT_LOGS);

  // Sync mutations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          attendance,
          homeworks,
          results,
          finance,
          hostel,
          transport,
          library,
          announcements,
          leaves,
          grievances,
          placements,
          admissions,
          auditLogs,
        })
      );
    } catch (err) {
      console.error('Failed to persist ERP state:', err);
    }
  }, [
    attendance,
    homeworks,
    results,
    finance,
    hostel,
    transport,
    library,
    announcements,
    leaves,
    grievances,
    placements,
    admissions,
    auditLogs,
  ]);

  // Helper to append to audit log
  const logAction = useCallback((action: string, module: string, details: string, status: AuditLogEntry['status'] = 'SUCCESS') => {
    const newLog: AuditLogEntry = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: 'Just now',
      role: (currentUser?.role as ManagementRole) || 'SUPER_ADMIN',
      userName: currentUser?.name || 'Administrator',
      action,
      module,
      details,
      status,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  }, [currentUser]);

  // Management Login
  const loginManagement = useCallback((email: string, pass: string): boolean => {
    const cred = MANAGEMENT_CREDENTIALS.find(
      (c) => c.email.toLowerCase() === email.trim().toLowerCase() && c.password === pass
    );

    if (cred) {
      const user: UserProfile = {
        id: `user_${cred.role.toLowerCase()}`,
        name: cred.name,
        email: cred.email,
        role: cred.role,
        department: cred.department,
        designation: cred.roleTitle,
        avatarUrl: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80`,
      };
      setCurrentUser(user);
      localStorage.setItem('utopia_mgmt_user', JSON.stringify(user));
      logAction('Management Sign-In', 'Authentication', `${cred.name} (${cred.roleTitle}) signed in to Management Portal.`);
      return true;
    }
    return false;
  }, [logAction]);

  // Quick Login
  const quickLogin = useCallback((role: ManagementRole) => {
    const cred = MANAGEMENT_CREDENTIALS.find((c) => c.role === role);
    if (cred) {
      const user: UserProfile = {
        id: `user_${cred.role.toLowerCase()}`,
        name: cred.name,
        email: cred.email,
        role: cred.role,
        department: cred.department,
        designation: cred.roleTitle,
        avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      };
      setCurrentUser(user);
      localStorage.setItem('utopia_mgmt_user', JSON.stringify(user));
      logAction('Quick Login Authenticated', 'Authentication', `${cred.name} (${cred.roleTitle}) authenticated via Quick Login.`);
    }
  }, [logAction]);

  // Logout
  const logoutManagement = useCallback(() => {
    if (currentUser) {
      logAction('Management Sign-Out', 'Authentication', `${currentUser.name} logged out.`);
    }
    setCurrentUser(null);
    localStorage.removeItem('utopia_mgmt_user');
  }, [currentUser, logAction]);

  // Cross-Portal Interconnection: Mark Attendance
  const markAttendance = useCallback((courseCode: string, studentId: string, status: 'Present' | 'Absent') => {
    setAttendance((prev) =>
      prev.map((rec) => {
        if (rec.courseCode === courseCode) {
          const newTotal = rec.totalLectures + 1;
          const newAttended = status === 'Present' ? rec.attendedLectures + 1 : rec.attendedLectures;
          const newPct = Math.round((newAttended / newTotal) * 100);
          return {
            ...rec,
            totalLectures: newTotal,
            attendedLectures: newAttended,
            percentage: newPct,
            lastUpdated: 'Today',
            status: newPct >= 75 ? 'Good' : 'Critical',
          };
        }
        return rec;
      })
    );
    logAction('Marked Student Attendance', 'Attendance Operations', `Marked ${status} for ${studentId} in course ${courseCode}. Student portal attendance automatically updated.`);
  }, [logAction]);

  // Cross-Portal Interconnection: Create Assignment
  const createAssignment = useCallback((assignment: { courseCode: string; courseTitle: string; assignmentTitle: string; dueDate: string; points: number }) => {
    const newHw: HomeworkItem = {
      id: `hw_mgmt_${Date.now()}`,
      courseCode: assignment.courseCode,
      courseTitle: assignment.courseTitle,
      assignmentTitle: assignment.assignmentTitle,
      dueDate: assignment.dueDate,
      status: 'Not Submitted',
      points: assignment.points,
    };
    setHomeworks((prev) => [newHw, ...prev]);
    logAction('Published Course Assignment', 'Academics & Classroom', `Faculty created "${assignment.assignmentTitle}" for ${assignment.courseCode}. Visible on Student Portal.`);
  }, [logAction]);

  // Cross-Portal Interconnection: Grade Homework
  const gradeHomework = useCallback((homeworkId: string, score: number) => {
    setHomeworks((prev) =>
      prev.map((hw) => (hw.id === homeworkId ? { ...hw, score, status: 'Completed' } : hw))
    );
    logAction('Graded Assignment Submission', 'Academics', `Evaluated submission for ID ${homeworkId} with score ${score}.`);
  }, [logAction]);

  // Cross-Portal Interconnection: Update Internal Marks
  const updateInternalMarks = useCallback((semesterNum: number, courseCode: string, newInternalMarks: number) => {
    setResults((prev) =>
      prev.map((sem) => {
        if (sem.semesterNumber === semesterNum) {
          const updatedSubjects = sem.subjects.map((sub) => {
            if (sub.code === courseCode) {
              const newTotal = newInternalMarks + sub.externalMarks;
              return {
                ...sub,
                internalMarks: newInternalMarks,
                totalMarks: newTotal,
                grade: newTotal >= 90 ? 'A+' : newTotal >= 80 ? 'A' : 'B+',
              };
            }
            return sub;
          });
          return { ...sem, subjects: updatedSubjects };
        }
        return sem;
      })
    );
    logAction('Updated Internal Marks', 'Examinations', `Entered internal marks (${newInternalMarks}/40) for ${courseCode} in Semester ${semesterNum}.`);
  }, [logAction]);

  // Cross-Portal Interconnection: Record Fee Payment
  const recordFeePayment = useCallback((feeId: string, amount: number, paymentMode: string) => {
    setFinance((prev) =>
      prev.map((fee) => {
        if (fee.id === feeId) {
          return {
            ...fee,
            status: 'Paid',
            paidDate: 'Today',
            receiptNumber: `RCPT-2024-${Math.floor(1000 + Math.random() * 9000)}`,
          };
        }
        return fee;
      })
    );
    logAction('Recorded Student Fee Payment', 'Accounts & Finance', `Accounts confirmed $${amount.toLocaleString()} via ${paymentMode}. Student portal balance updated to Paid.`);
  }, [logAction]);

  // Cross-Portal Interconnection: Resolve Hostel Complaint
  const resolveHostelComplaint = useCallback((complaintId: string) => {
    setHostel((prev) => ({
      ...prev,
      complaints: prev.complaints.map((c) =>
        c.id === complaintId ? { ...c, status: 'Resolved' } : c
      ),
    }));
    logAction('Resolved Hostel Maintenance', 'Hostel Management', `Marked maintenance complaint ${complaintId} as Resolved in Room 304 North Hall.`);
  }, [logAction]);

  // Cross-Portal Interconnection: Allocate Hostel Room
  const allocateHostelRoom = useCallback((studentId: string, roomNumber: string, bedNumber: string) => {
    setHostel((prev) => ({
      ...prev,
      roomNumber,
      bedNumber,
    }));
    logAction('Allocated Student Hostel Room', 'Hostel Management', `Assigned Room ${roomNumber} (${bedNumber}) to ${studentId}.`);
  }, [logAction]);

  // Cross-Portal Interconnection: Update Transport Route
  const updateTransportRoute = useCallback((studentId: string, routeNumber: string, pickupStop: string) => {
    setTransport((prev) => ({
      ...prev,
      routeNumber,
      pickupPoint: pickupStop,
    }));
    logAction('Assigned Transit Route', 'Transport Management', `Assigned ${routeNumber} at stop "${pickupStop}" for ${studentId}.`);
  }, [logAction]);

  // Cross-Portal Interconnection: Issue Library Book
  const issueLibraryBook = useCallback((title: string, author: string, isbn: string) => {
    const newBook: LibraryBook = {
      id: `bk_${Date.now()}`,
      isbn,
      title,
      author,
      issueDate: 'Today',
      dueDate: 'Feb 18, 2024',
      status: 'Issued',
    };
    setLibrary((prev) => [newBook, ...prev]);
    logAction('Issued Library Book', 'Library Management', `Issued "${title}" to student Merna Vance (UTP-2023-4182). Visible in Student Library view.`);
  }, [logAction]);

  // Cross-Portal Interconnection: Return Library Book
  const returnLibraryBook = useCallback((bookId: string) => {
    setLibrary((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, status: 'Returned' } : b))
    );
    logAction('Processed Book Return', 'Library Management', `Cleared returned book accession ID ${bookId}.`);
  }, [logAction]);

  // Cross-Portal Interconnection: Post Campus Announcement
  const postAnnouncement = useCallback((ann: { title: string; category: Announcement['category']; summary: string; priority: 'High' | 'Normal' | 'Low' }) => {
    const newAnn: Announcement = {
      id: `anc_${Date.now()}`,
      title: ann.title,
      category: ann.category,
      date: 'Today',
      summary: ann.summary,
      author: currentUser?.name || 'College Administration',
      priority: ann.priority,
      isRead: false,
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    logAction('Published Campus Announcement', 'Student Affairs & Circulars', `Posted official notice: "${ann.title}". Sent to Student Portal noticeboard.`);
  }, [currentUser, logAction]);

  // Cross-Portal Interconnection: Resolve Grievance
  const resolveGrievance = useCallback((ticketId: string, responseText: string) => {
    setGrievances((prev) =>
      prev.map((g) =>
        g.id === ticketId
          ? {
              ...g,
              status: 'Resolved',
              response: responseText,
              respondedBy: currentUser?.name || 'Student Grievance Cell',
            }
          : g
      )
    );
    logAction('Resolved Student Grievance', 'Student Affairs', `Ombudsman resolved grievance ${ticketId}. Response delivered to Student Portal.`);
  }, [currentUser, logAction]);

  // Cross-Portal Interconnection: Approve Admission
  const approveAdmissionApplicant = useCallback((applicantId: string) => {
    setAdmissions((prev) =>
      prev.map((app) =>
        app.id === applicantId ? { ...app, status: 'Approved', documentsVerified: true } : app
      )
    );
    logAction('Approved Student Admission', 'Admissions Directorate', `Application ${applicantId} officially approved for admission and enrollment.`);
  }, [logAction]);

  // Cross-Portal Interconnection: Create Placement Drive
  const createPlacementDrive = useCallback((drive: Omit<PlacementDrive, 'id'>) => {
    const newDrive: PlacementDrive = {
      ...drive,
      id: `PLC-2024-0${Math.floor(10 + Math.random() * 90)}`,
    };
    setPlacements((prev) => [newDrive, ...prev]);
    logAction('Created Placement Drive', 'Career & Placements', `Opened campus hiring drive for ${drive.companyName} (${drive.role}).`);
  }, [logAction]);

  // Cross-Portal Interconnection: Update Placement Status
  const updatePlacementApplicantStatus = useCallback((driveId: string, status: PlacementDrive['status']) => {
    setPlacements((prev) =>
      prev.map((d) => (d.id === driveId ? { ...d, status } : d))
    );
    logAction('Updated Placement Candidate Status', 'Career & Placements', `Candidate Merna Vance updated to "${status}" for drive ${driveId}.`);
  }, [logAction]);

  // Cross-Portal Interconnection: Approve Leave
  const approveLeaveRequest = useCallback((leaveId: string, status: 'Approved' | 'Rejected') => {
    setLeaves((prev) =>
      prev.map((lv) =>
        lv.id === leaveId
          ? { ...lv, status, reviewedBy: currentUser?.name || 'Dean of Student Welfare' }
          : lv
      )
    );
    logAction('Processed Student Leave Request', 'Academic Sanctions', `Leave request ${leaveId} was ${status}. Reflects on Student Portal leave tracker.`);
  }, [currentUser, logAction]);

  const updateStudentProfile = useCallback((updated: StudentProfile) => {
    setStudent(updated);
    logAction('Updated Student Bio', 'Registrar Records', `Updated student profile information for ${updated.name}.`);
  }, [logAction]);

  const contextValue: ErpContextType = {
    currentPortal,
    setCurrentPortal,
    currentUser,
    managementRole: (currentUser?.role as ManagementRole) || null,
    loginManagement,
    quickLogin,
    logoutManagement,

    student,
    studentsList,
    updateStudentProfile,
    courses,
    attendance,
    homeworks,
    exams,
    results,
    finance,
    hostel,
    transport,
    library,
    announcements,
    leaves,
    certificates,
    grievances,
    placements,
    admissions,
    departments,
    facultyMembers,
    auditLogs,

    markAttendance,
    createAssignment,
    gradeHomework,
    updateInternalMarks,
    recordFeePayment,
    resolveHostelComplaint,
    allocateHostelRoom,
    updateTransportRoute,
    issueLibraryBook,
    returnLibraryBook,
    postAnnouncement,
    resolveGrievance,
    approveAdmissionApplicant,
    createPlacementDrive,
    updatePlacementApplicantStatus,
    approveLeaveRequest,
  };

  return <ErpContext.Provider value={contextValue}>{children}</ErpContext.Provider>;
};
