import * as LDClient from 'launchdarkly-js-client-sdk';
import { v4 as uuidv4 } from 'uuid';

export interface LaunchDarklyUser {
  key: string;
  name?: string;
  email?: string;
  custom?: {
    location?: string;
    previousOrders?: number;
    loyaltyTier?: string;
    dietaryPreferences?: string[];
  };
}

export class LaunchDarklyService {
  private client: LDClient.LDClient | null = null;
  private user: LaunchDarklyUser;
  private isInitialized = false;

  constructor() {
    // Create a unique user for this session
    this.user = {
      key: this.getOrCreateUserKey(),
      name: 'Demo User',
      email: 'demo@brunchdarkly.com',
      custom: {
        location: 'San Francisco',
        previousOrders: Math.floor(Math.random() * 20),
        loyaltyTier: 'gold',
        dietaryPreferences: ['vegetarian']
      }
    };
  }

  private getOrCreateUserKey(): string {
    let userKey = localStorage.getItem('brunchdarkly_user_key');
    if (!userKey) {
      userKey = uuidv4();
      localStorage.setItem('brunchdarkly_user_key', userKey);
    }
    return userKey;
  }

  async initialize(): Promise<boolean> {
    const clientId = import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID;
    
    if (!clientId) {
      console.warn('LaunchDarkly client ID not found. Using mock flags.');
      this.isInitialized = true;
      return false;
    }

    try {
      this.client = LDClient.initialize(clientId, this.user, {
        bootstrap: 'localStorage',
        hash: this.user.key,
        streaming: true,
        useReport: false,
        sendEvents: true,
        allAttributesPrivate: false,
        privateAttributes: ['email']
      });

      await this.client.waitForInitialization();
      this.isInitialized = true;
      
      console.log('LaunchDarkly initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize LaunchDarkly:', error);
      this.isInitialized = true;
      return false;
    }
  }

  getFlag<T>(flagKey: string, defaultValue: T): T {
    if (!this.client || !this.isInitialized) {
      return this.getMockFlag(flagKey, defaultValue);
    }

    try {
      return this.client.variation(flagKey, defaultValue);
    } catch (error) {
      console.error(`Error getting flag ${flagKey}:`, error);
      return defaultValue;
    }
  }

  getAllFlags(): LDClient.LDFlagSet {
    if (!this.client || !this.isInitialized) {
      return this.getMockFlags();
    }

    try {
      return this.client.allFlags();
    } catch (error) {
      console.error('Error getting all flags:', error);
      return this.getMockFlags();
    }
  }

  onFlagChange(flagKey: string, callback: (value: any) => void): void {
    if (!this.client) {
      console.warn(`Cannot listen for flag changes: ${flagKey}`);
      return;
    }

    this.client.on(`change:${flagKey}`, callback);
  }

  track(eventName: string, data?: any, metricValue?: number): void {
    if (!this.client) {
      console.log(`Mock track event: ${eventName}`, data);
      return;
    }

    try {
      this.client.track(eventName, data, metricValue);
    } catch (error) {
      console.error(`Error tracking event ${eventName}:`, error);
    }
  }

  identify(user: Partial<LaunchDarklyUser>): void {
    this.user = { ...this.user, ...user };
    
    if (this.client) {
      this.client.identify(this.user);
    }
  }

  private getMockFlag<T>(flagKey: string, defaultValue: T): T {
    const mockFlags: Record<string, any> = {
      'dietary-preference': 'omnivore',
      'premium-items': true,
      'dynamic-pricing': false,
      'personalized-recommendations': true,
      'loyalty-program': false,
      'limited-time-offers': true,
      'weekend-specials': true,
      'chef-recommendations': true,
      'nutrition-info': false,
      'allergen-warnings': true
    };

    return mockFlags[flagKey] !== undefined ? mockFlags[flagKey] : defaultValue;
  }

  private getMockFlags(): LDClient.LDFlagSet {
    return {
      'dietary-preference': 'omnivore',
      'premium-items': true,
      'dynamic-pricing': false,
      'personalized-recommendations': true,
      'loyalty-program': false,
      'limited-time-offers': true,
      'weekend-specials': true,
      'chef-recommendations': true,
      'nutrition-info': false,
      'allergen-warnings': true
    };
  }

  getUser(): LaunchDarklyUser {
    return this.user;
  }

  isReady(): boolean {
    return this.isInitialized;
  }

  close(): void {
    if (this.client) {
      this.client.close();
    }
  }
}

export const launchDarklyService = new LaunchDarklyService();