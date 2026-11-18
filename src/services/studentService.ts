import { apiClient, ApiResponse } from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import { StudentProfile } from '../types/student';
import { DEMO_STUDENT } from '../mock/demoStudent';

export const studentService = {
  async getProfile(): Promise<ApiResponse<StudentProfile>> {
    return apiClient<StudentProfile>(API_ENDPOINTS.student.profile, DEMO_STUDENT);
  },
};
