import { apiClient, ApiResponse } from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import { EnrolledCourse } from '../types/course';
import { MOCK_ENROLLED_COURSES } from '../mock/courses.mock';

export const courseService = {
  async getEnrolledCourses(): Promise<ApiResponse<EnrolledCourse[]>> {
    return apiClient<EnrolledCourse[]>(API_ENDPOINTS.courses.enrolled, MOCK_ENROLLED_COURSES);
  },
};
