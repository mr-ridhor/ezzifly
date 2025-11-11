export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  }
  
  export interface AuthResponse {
    success: boolean;
    message: string;
    user: User;
    token: string;
  }
  
  export interface VerificationResponse {
    success: boolean;
    message: string;
  }
  
  export interface SendVerificationRequest {
    email: string;
  }
  
  export interface VerifyCodeRequest {
    email: string;
    code: string;
  }
  
  export interface RegisterRequest {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password_confirmation: string;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  export interface Profile {
    id: number;
    title: string | null;
    first_name: string;
    last_name: string;
    middle_name: string | null;
    email: string;
    phone: string | null;
    gender: string | null;
    dob: string | null;
    nationality: string | null;
    passport_no: string | null;
    passport_country: string | null;
    passport_expiration: string | null;
    image: string | null;
  }
  
  export interface ProfileResponse {
    success: boolean;
    message: string;
    profile: Profile;
  }
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    success: boolean;
    message: string;
    user: User;
    token: string;
  }