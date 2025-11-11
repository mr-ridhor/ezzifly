/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from './client';
import {
  ProfileResponse,

} from './types';

export const profileService = {
  // Get user profile
  async getProfile(email: string, token: string): Promise<ProfileResponse> {
    return apiClient.post<ProfileResponse>(
      '/api/auth/profile',
      { email } as any,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
  },

  // Update user profile
  async updateProfile(
    profileData: any,
    token: string
  ): Promise<ProfileResponse> {
    return apiClient.post<ProfileResponse>(
      '/api/auth/profile',
      profileData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
  },

  // Alternative: If your API uses PUT for updates
  async updateProfilePut(
    profileData: any,
    token: string
  ): Promise<ProfileResponse> {
    return apiClient.put<ProfileResponse>(
      '/api/auth/profile',
      profileData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
  },
};