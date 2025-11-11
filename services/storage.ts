/* eslint-disable @typescript-eslint/no-explicit-any */
class StorageService {
    private isClientSide = typeof window !== 'undefined';
  
    setItem(key: string, value: any): void {
      if (!this.isClientSide) return;
      
      try {
        const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  
    getItem<T>(key: string, defaultValue: T | null = null): T | null {
      if (!this.isClientSide) return defaultValue;
      
      try {
        const item = localStorage.getItem(key);
        if (!item) return defaultValue;
        
        try {
          return JSON.parse(item) as T;
        } catch {
          return item as T;
        }
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
      }
    }
  
    removeItem(key: string): void {
      if (!this.isClientSide) return;
      
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    }
  
    clear(): void {
      if (!this.isClientSide) return;
      
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    }
  }
  // Auth-specific helpers
export const authStorage = {
  getToken(): string | null {
    return storageService.getItem<string>('authToken');
  },

  setToken(token: string): void {
    storageService.setItem('authToken', token);
  },

  getUser(): any | null {
    return storageService.getItem('user');
  },

  setUser(user: any): void {
    storageService.setItem('user', user);
  },

  clearAuth(): void {
    storageService.removeItem('authToken');
    storageService.removeItem('user');
  },

  isAuthenticated(): boolean {
    return !!authStorage.getToken();
  },
};
  export const storageService = new StorageService();