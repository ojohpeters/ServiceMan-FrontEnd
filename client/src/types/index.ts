// TypeScript interfaces for ServiceMan application

export interface User {
  id: number;
  email: string;
  full_name: string;
  phone_number: string;
  contact_address: string;
  role: 'client' | 'serviceman' | 'admin';
  is_active: boolean;
  is_verified?: boolean;
  created_at: string;
  updated_at: string;
  avatar?: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  icon?: string;
  image?: string;
  created_at: string;
}

export interface Serviceman extends User {
  qualifications: string;
  years_of_experience: number;
  categories: number[];
  average_rating: number;
  completed_jobs_count: number;
  is_available: boolean;
  profile_image?: string;
}

export interface ServiceRequest {
  id: number;
  client_id: number;
  serviceman_id: number;
  category_id: number;
  requested_date: string;
  is_emergency: boolean;
  consultation_fee: number;
  consultation_paid: boolean;
  serviceman_estimate?: number;
  base_cost?: number;
  markup_percent?: number;
  final_bill?: number;
  final_payment_paid: boolean;
  status: 'created' | 'awaiting_admin' | 'notified_serviceman' | 'serviceman_reported' | 'awaiting_client_payment' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  client?: User;
  serviceman?: Serviceman;
  category?: Category;
  rating?: Rating;
}

export interface Rating {
  id: number;
  request_id: number;
  client_id: number;
  serviceman_id: number;
  stars: number;
  feedback: string;
  created_at: string;
}

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  is_read: boolean;
  notification_type: 'info' | 'success' | 'warning' | 'error';
  created_at: string;
}

export interface Application {
  id: number;
  user_id: number;
  status: 'pending' | 'approved' | 'rejected';
  qualifications: string;
  years_of_experience: number;
  categories: number[];
  submitted_at: string;
  reviewed_at?: string;
  user?: User;
}

export interface Analytics {
  total_requests: number;
  completed_requests: number;
  total_revenue: number;
  average_ratings_by_category: Array<{
    category: string;
    average_rating: number;
    total_jobs: number;
  }>;
  monthly_stats: Array<{
    month: string;
    requests: number;
    revenue: number;
  }>;
}

// Request/Response Types
export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  role: 'client' | 'serviceman';
  full_name: string;
  email: string;
  phone_number: string;
  contact_address: string;
  password: string;
  qualifications?: string;
  years_of_experience?: number;
  categories?: number[];
}

export interface CreateRequestData {
  serviceman_id: number;
  category_id: number;
  requested_date: string;
  is_emergency: boolean;
}

export interface ReportCostData {
  serviceman_estimate: number;
}

export interface SetCostData {
  base_cost: number;
  markup_percent: number;
}

export interface RatingData {
  stars: number;
  feedback: string;
}

export interface PaymentResponse {
  request_id: number;
  consultation_fee?: number;
  final_bill?: number;
  payment_required: boolean;
  payment_url?: string;
}

export interface LandingData {
  featured_categories: Category[];
  top_servicemen: Serviceman[];
  hero: {
    title: string;
    subtitle: string;
    cta_text: string;
  };
}