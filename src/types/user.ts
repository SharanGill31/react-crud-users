
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
} & Record<string, unknown>;


export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  message?: string;
  success: boolean;
}
