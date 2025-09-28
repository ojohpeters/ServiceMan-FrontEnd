// Configuration constants
export const CONFIG = {
  API_URL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1",
  DEV_MODE: import.meta.env.VITE_DEV_MODE === "true" || true, // Default to true for development
  APP_NAME: "ServiceMan",
  EMERGENCY_FEE: 5000,
  STANDARD_FEE: 2000,
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  BROWSE: "/browse",
  HIRE: "/hire",
  CLIENT_DASHBOARD: "/client/dashboard",
  SERVICEMAN_DASHBOARD: "/serviceman/dashboard", 
  ADMIN_DASHBOARD: "/admin/dashboard",
  CATEGORIES: "/categories",
  HOW_IT_WORKS: "/how-it-works",
  PRICING: "/pricing",
  SAFETY: "/safety",
  HELP: "/help",
  CONTACT: "/contact",
  TERMS: "/terms",
  PRIVACY: "/privacy",
} as const;