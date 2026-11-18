export interface SubjectResult {
  code: string;
  name: string;
  credits: number;
  internalMarks: number; // max 40
  externalMarks: number; // max 60
  totalMarks: number; // max 100
  grade: string;
  gradePoint: number;
  status: 'Pass' | 'Fail';
}

export interface SemesterResult {
  semesterNumber: number;
  semesterName: string;
  academicYear: string;
  sgpa: number;
  totalCredits: number;
  earnedCredits: number;
  subjects: SubjectResult[];
}

export const MOCK_SEMESTER_RESULTS: SemesterResult[] = [
  {
    semesterNumber: 1,
    semesterName: 'Semester 1',
    academicYear: '2022 - 2023',
    sgpa: 3.80,
    totalCredits: 20,
    earnedCredits: 20,
    subjects: [
      { code: 'DSN101', name: 'Design Foundations & Typography', credits: 4, internalMarks: 38, externalMarks: 56, totalMarks: 94, grade: 'A+', gradePoint: 4.0, status: 'Pass' },
      { code: 'ART102', name: 'Color Psychology & Visual Form', credits: 4, internalMarks: 36, externalMarks: 52, totalMarks: 88, grade: 'A', gradePoint: 3.8, status: 'Pass' },
      { code: 'COM101', name: 'Digital Communication & Media', credits: 3, internalMarks: 35, externalMarks: 51, totalMarks: 86, grade: 'A', gradePoint: 3.7, status: 'Pass' },
      { code: 'WEB101', name: 'Fundamentals of Web Publishing', credits: 5, internalMarks: 39, externalMarks: 55, totalMarks: 94, grade: 'A+', gradePoint: 4.0, status: 'Pass' },
      { code: 'GEN101', name: 'Creative Critical Thinking', credits: 4, internalMarks: 34, externalMarks: 48, totalMarks: 82, grade: 'B+', gradePoint: 3.5, status: 'Pass' },
    ],
  },
  {
    semesterNumber: 2,
    semesterName: 'Semester 2',
    academicYear: '2022 - 2023',
    sgpa: 3.88,
    totalCredits: 21,
    earnedCredits: 21,
    subjects: [
      { code: 'ART103', name: 'Digital Illustration & Vector Graphics', credits: 4, internalMarks: 39, externalMarks: 57, totalMarks: 96, grade: 'A+', gradePoint: 4.0, status: 'Pass' },
      { code: 'UXD201', name: 'Design Systems & Wireframing', credits: 5, internalMarks: 38, externalMarks: 55, totalMarks: 93, grade: 'A+', gradePoint: 4.0, status: 'Pass' },
      { code: 'ITD102', name: 'Frontend Architecture (HTML/CSS/JS)', credits: 4, internalMarks: 37, externalMarks: 53, totalMarks: 90, grade: 'A', gradePoint: 3.8, status: 'Pass' },
      { code: 'PHO201', name: 'Digital Photography & Lighting', credits: 4, internalMarks: 35, externalMarks: 50, totalMarks: 85, grade: 'A', gradePoint: 3.7, status: 'Pass' },
      { code: 'ANI201', name: '2D Motion Principles', credits: 4, internalMarks: 36, externalMarks: 52, totalMarks: 88, grade: 'A', gradePoint: 3.8, status: 'Pass' },
    ],
  },
  {
    semesterNumber: 3,
    semesterName: 'Semester 3 (Current Interim)',
    academicYear: '2023 - 2024',
    sgpa: 3.84,
    totalCredits: 18,
    earnedCredits: 18,
    subjects: [
      { code: 'ART101', name: 'Graphic Fundamentals', credits: 3, internalMarks: 38, externalMarks: 56, totalMarks: 94, grade: 'A+', gradePoint: 4.0, status: 'Pass' },
      { code: 'ITD201', name: 'Advanced Web Design', credits: 4, internalMarks: 37, externalMarks: 54, totalMarks: 91, grade: 'A', gradePoint: 3.9, status: 'Pass' },
      { code: 'UXD301', name: 'User Experience Research', credits: 3, internalMarks: 36, externalMarks: 50, totalMarks: 86, grade: 'A', gradePoint: 3.7, status: 'Pass' },
      { code: 'ANI301', name: '3D Animation Techniques', credits: 4, internalMarks: 38, externalMarks: 52, totalMarks: 90, grade: 'A', gradePoint: 3.8, status: 'Pass' },
      { code: 'ART202', name: 'Visual Communication Design', credits: 4, internalMarks: 35, externalMarks: 51, totalMarks: 86, grade: 'A', gradePoint: 3.7, status: 'Pass' },
    ],
  },
];
