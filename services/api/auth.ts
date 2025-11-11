/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from './client';
import {
  AuthResponse,
  VerificationResponse,
  SendVerificationRequest,
  VerifyCodeRequest,
  RegisterRequest,
  LoginRequest,
  ProfileResponse,
  Profile,
} from './types';

export const authService = {
  // Send verification code to email
  async sendVerificationCode(email: string): Promise<VerificationResponse> {
    return apiClient.post<VerificationResponse>('/api/auth/send-code', {
      email,
    } as SendVerificationRequest);
  },

  // Verify code
  async verifyCode(email: string, code: string): Promise<VerificationResponse> {
    return apiClient.post<VerificationResponse>('/api/auth/verify-code', {
      email,
      code,
    } as VerifyCodeRequest);
  },

  // Register user
  async registerUser(userData: RegisterRequest): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/api/auth/register', userData);
  },

  // Resend verification code
  async resendVerificationCode(email: string): Promise<VerificationResponse> {
    return apiClient.post<VerificationResponse>('/api/auth/resend-verification', {
      email,
    } as SendVerificationRequest);
  },

  // Login user (for future use)
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/api/auth/login', credentials);
  },

  // Logout user (for future use)
  async logout(): Promise<{ success: boolean; message: string }> {
    return apiClient.post('/api/auth/user/logout');
  },

 

  
  // Get user profile (you can keep it here or move to profileService)
  async getProfile(token: string, email?: string): Promise<ProfileResponse> {
    const body = email ? { email } : {};
    return apiClient.post<ProfileResponse>('/api/auth/profile', body, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Update user profile (you can keep it here or move to profileService)
  async updateProfile(
    profileData: any,
    token: string
  ): Promise<ProfileResponse> {
    return apiClient.post<ProfileResponse>('/api/auth/profile', profileData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Verify token validity (optional)
  async verifyToken(token: string): Promise<{ valid: boolean; user?: Profile }> {
    try {
      const response = await apiClient.get<ProfileResponse>('/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return { valid: true, user: response.profile };
    } catch (error) {
      return { valid: false };
    }
  },

};

