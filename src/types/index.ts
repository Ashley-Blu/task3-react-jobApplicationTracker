// User type definition
export interface User {
  email: string;
  username: string;
  password: string;
}

// Job type definition
export interface Job {
  id: number;
  jobTitle?: string;
  company: string;
  address?: string;
  contact?: string;
  status?: string;
  duties?: string;
  requirements?: string;
  notes?: string;
}

// Form data type for signup
export interface SignupFormData {
  email: string;
  username: string;
  password: string;
}

// Form data type for login
export interface LoginFormData {
  username: string;
  password: string;
}

// Edit job form data
export interface EditJobData {
  company: string;
  status: string;
  address: string;
  contact: string;
  duties: string;
  requirements: string;
  notes: string;
}
