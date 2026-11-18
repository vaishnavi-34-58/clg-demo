import { apiClient, ApiResponse } from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import { HomeworkItem } from '../types/assignment';
import { MOCK_HOMEWORK_ITEMS } from '../mock/homeworks.mock';

export const assignmentService = {
  async getHomeworkItems(): Promise<ApiResponse<HomeworkItem[]>> {
    return apiClient<HomeworkItem[]>(API_ENDPOINTS.assignments.list, MOCK_HOMEWORK_ITEMS);
  },
};
