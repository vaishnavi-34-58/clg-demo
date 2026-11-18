/**
 * Central API Client wrapper
 * Configured with mock toggle to allow seamless backend integration later
 */

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

const USE_MOCK_DATA = true;

export async function apiClient<T>(
  endpoint: string,
  mockFallback: T,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  if (USE_MOCK_DATA) {
    // Simulate realistic async network response in demo mode
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: mockFallback,
          success: true,
        });
      }, 150);
    });
  }

  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
    const result = await response.json();
    return {
      data: result,
      success: response.ok,
    };
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    return {
      data: mockFallback,
      success: false,
      message: (error as Error).message,
    };
  }
}
