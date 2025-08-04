import posthog from 'posthog-js';

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  userId?: string;
}

export interface UserProperties {
  email?: string;
  name?: string;
  dietaryPreference?: string;
  loyaltyTier?: string;
  location?: string;
}

class AnalyticsService {
  private isInitialized = false;
  private mockMode = false;

  initialize(): void {
    const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
    const posthogHost = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com';

    if (!posthogKey) {
      console.warn('PostHog key not found. Running in mock mode.');
      this.mockMode = true;
      this.isInitialized = true;
      return;
    }

    try {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        capture_pageview: true,
        capture_pageleave: true,
        loaded: (posthog) => {
          if (import.meta.env.VITE_ENVIRONMENT === 'development') {
            posthog.debug();
          }
        }
      });

      this.isInitialized = true;
      console.log('Analytics initialized successfully');
    } catch (error) {
      console.error('Failed to initialize analytics:', error);
      this.mockMode = true;
      this.isInitialized = true;
    }
  }

  track(event: string, properties?: Record<string, any>): void {
    if (!this.isInitialized) {
      console.warn('Analytics not initialized');
      return;
    }

    if (this.mockMode) {
      console.log(`📊 Analytics Event: ${event}`, properties);
      return;
    }

    try {
      posthog.capture(event, {
        ...properties,
        timestamp: new Date().toISOString(),
        source: 'brunchdarkly-demo'
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }

  identify(userId: string, properties?: UserProperties): void {
    if (!this.isInitialized) {
      console.warn('Analytics not initialized');
      return;
    }

    if (this.mockMode) {
      console.log(`👤 User Identified: ${userId}`, properties);
      return;
    }

    try {
      posthog.identify(userId, properties);
    } catch (error) {
      console.error('Error identifying user:', error);
    }
  }

  setUserProperties(properties: UserProperties): void {
    if (!this.isInitialized) {
      console.warn('Analytics not initialized');
      return;
    }

    if (this.mockMode) {
      console.log('👤 User Properties Updated:', properties);
      return;
    }

    try {
      posthog.people.set(properties);
    } catch (error) {
      console.error('Error setting user properties:', error);
    }
  }

  trackFeatureFlagUsage(flagKey: string, flagValue: any, context?: Record<string, any>): void {
    this.track('feature_flag_evaluated', {
      flag_key: flagKey,
      flag_value: flagValue,
      ...context
    });
  }

  trackUserAction(action: string, context?: Record<string, any>): void {
    this.track('user_action', {
      action,
      ...context
    });
  }

  trackOrderEvent(event: 'item_added' | 'item_removed' | 'order_placed', data: Record<string, any>): void {
    this.track(`order_${event}`, {
      ...data,
      timestamp: new Date().toISOString()
    });
  }

  trackPageView(page: string, properties?: Record<string, any>): void {
    if (this.mockMode) {
      console.log(`📄 Page View: ${page}`, properties);
      return;
    }

    this.track('$pageview', {
      $current_url: window.location.href,
      page,
      ...properties
    });
  }

  startSession(): void {
    this.track('session_started', {
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  }

  endSession(): void {
    this.track('session_ended', {
      timestamp: new Date().toISOString(),
      duration: Date.now() - (window as any).sessionStartTime
    });
  }
}

export const analyticsService = new AnalyticsService();