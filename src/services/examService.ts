import { apiClient, ApiResponse } from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import { ExamRecord } from '../types/examination';
import { MOCK_EXAM_RECORDS } from '../mock/examinations.mock';

export const examService = {
  async getExamRecords(): Promise<ApiResponse<ExamRecord[]>> {
    return apiClient<ExamRecord[]>(API_ENDPOINTS.examinations.schedule, MOCK_EXAM_RECORDS);
  },
};
