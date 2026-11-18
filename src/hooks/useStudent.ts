import { useState, useEffect } from 'react';
import { StudentProfile } from '../types/student';
import { studentService } from '../services/studentService';

export function useStudent() {
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    studentService.getProfile().then((res) => {
      if (mounted) {
        setStudent(res.data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return { student, loading };
}
