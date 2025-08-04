import { useState, useEffect, useCallback } from 'react';
import { launchDarklyService } from '../services/launchDarkly';
import { analyticsService } from '../services/analytics';

export interface FeatureFlags {
  dietaryPreference: 'omnivore' | 'vegetarian' | 'vegan' | 'gluten-free';
  premiumItems: boolean;
  dynamicPricing: boolean;
  personalizedRecommendations: boolean;
  loyaltyProgram: boolean;
  limitedTimeOffers: boolean;
  weekendSpecials: boolean;
  chefRecommendations: boolean;
  nutritionInfo: boolean;
  allergenWarnings: boolean;
}

export const useLaunchDarkly = () => {
  const [flags, setFlags] = useState<FeatureFlags>({
    dietaryPreference: 'omnivore',
    premiumItems: true,
    dynamicPricing: false,
    personalizedRecommendations: true,
    loyaltyProgram: false,
    limitedTimeOffers: true,
    weekendSpecials: true,
    chefRecommendations: true,
    nutritionInfo: false,
    allergenWarnings: true,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const loadFlags = useCallback(async () => {
    try {
      const connected = await launchDarklyService.initialize();
      setIsConnected(connected);

      const newFlags: FeatureFlags = {
        dietaryPreference: launchDarklyService.getFlag('dietary-preference', 'omnivore'),
        premiumItems: launchDarklyService.getFlag('premium-items', true),
        dynamicPricing: launchDarklyService.getFlag('dynamic-pricing', false),
        personalizedRecommendations: launchDarklyService.getFlag('personalized-recommendations', true),
        loyaltyProgram: launchDarklyService.getFlag('loyalty-program', false),
        limitedTimeOffers: launchDarklyService.getFlag('limited-time-offers', true),
        weekendSpecials: launchDarklyService.getFlag('weekend-specials', true),
        chefRecommendations: launchDarklyService.getFlag('chef-recommendations', true),
        nutritionInfo: launchDarklyService.getFlag('nutrition-info', false),
        allergenWarnings: launchDarklyService.getFlag('allergen-warnings', true),
      };

      setFlags(newFlags);

      // Track flag evaluations
      Object.entries(newFlags).forEach(([key, value]) => {
        analyticsService.trackFeatureFlagUsage(key, value, {
          user_key: launchDarklyService.getUser().key
        });
      });

      // Set up flag change listeners
      Object.keys(newFlags).forEach((flagKey) => {
        launchDarklyService.onFlagChange(flagKey.replace(/([A-Z])/g, '-$1').toLowerCase(), (newValue) => {
          setFlags(prev => ({
            ...prev,
            [flagKey]: newValue
          }));
          
          analyticsService.trackFeatureFlagUsage(flagKey, newValue, {
            change_type: 'real_time_update',
            user_key: launchDarklyService.getUser().key
          });
        });
      });

    } catch (error) {
      console.error('Error loading feature flags:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFlags();

    return () => {
      launchDarklyService.close();
    };
  }, [loadFlags]);

  const trackFlagInteraction = useCallback((flagKey: string, newValue: any, context?: Record<string, any>) => {
    analyticsService.track('flag_toggled', {
      flag_key: flagKey,
      new_value: newValue,
      user_key: launchDarklyService.getUser().key,
      ...context
    });
  }, []);

  const updateUserContext = useCallback((updates: Record<string, any>) => {
    launchDarklyService.identify(updates);
    analyticsService.setUserProperties(updates);
  }, []);

  return {
    flags,
    isLoading,
    isConnected,
    trackFlagInteraction,
    updateUserContext,
    user: launchDarklyService.getUser(),
    reload: loadFlags
  };
};