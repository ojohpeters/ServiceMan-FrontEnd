// src/services/api.ts
import { apiRequest } from '@/lib/apiRequest';
import type { 
  User, 
  Category, 
  Serviceman, 
  ServiceRequest, 
  Rating, 
  Notification, 
  Application, 
  Analytics,
  LoginData,
  RegisterData,
  CreateRequestData,
  ReportCostData,
  SetCostData,
  RatingData,
  PaymentResponse,
  LandingData
} from '@/types';

export const api = {
  // Auth
  register: (data: RegisterData): Promise<User> => apiRequest('POST', '/auth/register/', data).then(r => r.json()),
  login: (data: LoginData): Promise<{ access: string; refresh: string; user: User }> => apiRequest('POST', '/auth/login/', data).then(r => r.json()),
  refresh: (): Promise<{ access: string }> => apiRequest('POST', '/auth/refresh/').then(r => r.json()),

  // Categories
  getCategories: (): Promise<Category[]> => apiRequest('GET', '/categories/').then(r => r.json()),

  // Landing
  getLanding: (): Promise<LandingData> => apiRequest('GET', '/landing/').then(r => r.json()),

  // Browse / Servicemen
  getServicemen: (params: Record<string, any> = {}): Promise<{ results: Serviceman[]; count: number }> => {
    const qs = new URLSearchParams(params).toString();
    return apiRequest('GET', `/servicemen/${qs ? `?${qs}` : ''}`).then(r => r.json());
  },
  getServicemanProfile: (id: string | number): Promise<Serviceman> => apiRequest('GET', `/servicemen/${id}/profile/`).then(r => r.json()),

  // Client requests & payments
  createRequest: (data: CreateRequestData): Promise<PaymentResponse> => apiRequest('POST', '/clients/request/', data).then(r => r.json()),
  mockConsultationPay: (id: string | number, body: { simulate: string }): Promise<ServiceRequest> => apiRequest('POST', `/mock-pay/consultation/${id}/`, body).then(r => r.json()),
  mockFinalPay: (id: string | number, body: { simulate: string }): Promise<ServiceRequest> => apiRequest('POST', `/mock-pay/final/${id}/`, body).then(r => r.json()),
  getClientRequests: (): Promise<ServiceRequest[]> => apiRequest('GET', '/clients/requests/').then(r => r.json()),
  rateRequest: (id: string | number, body: RatingData): Promise<Rating> => apiRequest('POST', `/clients/requests/${id}/rate/`, body).then(r => r.json()),

  // Serviceman
  getServicemanJobs: (): Promise<ServiceRequest[]> => apiRequest('GET', '/servicemen/jobs/').then(r => r.json()),
  reportCost: (id: string | number, body: ReportCostData): Promise<ServiceRequest> => apiRequest('POST', `/servicemen/requests/${id}/report-cost/`, body).then(r => r.json()),
  startJob: (id: string | number): Promise<ServiceRequest> => apiRequest('POST', `/servicemen/requests/${id}/start/`).then(r => r.json()),
  completeJob: (id: string | number): Promise<ServiceRequest> => apiRequest('POST', `/servicemen/requests/${id}/complete/`).then(r => r.json()),
  getServicemanRatings: (): Promise<Rating[]> => apiRequest('GET', '/servicemen/ratings/').then(r => r.json()),

  // Admin
  getApplications: (): Promise<Application[]> => apiRequest('GET', '/admin/applications/').then(r => r.json()),
  approveApplication: (id: string | number): Promise<Application> => apiRequest('POST', `/admin/applications/${id}/approve/`).then(r => r.json()),
  rejectApplication: (id: string | number): Promise<Application> => apiRequest('POST', `/admin/applications/${id}/reject/`).then(r => r.json()),
  getAllRequests: (): Promise<ServiceRequest[]> => apiRequest('GET', '/admin/requests/').then(r => r.json()),
  notifyServiceman: (id: string | number): Promise<ServiceRequest> => apiRequest('POST', `/admin/requests/${id}/notify-serviceman/`).then(r => r.json()),
  setServiceCost: (id: string | number, body: SetCostData): Promise<{ final_bill: number; payment_url: string }> => apiRequest('POST', `/admin/requests/${id}/set-cost/`, body).then(r => r.json()),
  getAnalytics: (): Promise<Analytics> => apiRequest('GET', '/admin/analytics/').then(r => r.json()),

  // Notifications
  getNotifications: (): Promise<Notification[]> => apiRequest('GET', '/notifications/').then(r => r.json()),
  markNotificationRead: (id: string | number): Promise<Notification> => apiRequest('POST', `/notifications/${id}/read/`).then(r => r.json()),
};