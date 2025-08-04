# BrunchDarkly 🥞

A stunning demo application showcasing LaunchDarkly's feature flag capabilities through an interactive brunch ordering experience. This production-ready demo demonstrates how feature flags can transform user experiences in real-time.

## 🚀 Features

### LaunchDarkly Integration
- **Real-time feature flags** with automatic updates
- **User context targeting** with demographic and behavioral data
- **Flag evaluation tracking** and analytics
- **Mock mode** for development without LaunchDarkly credentials

### Feature Flags Demonstrated
- **Dietary Preferences**: Target users with omnivore, vegetarian, vegan, or gluten-free options
- **Premium Items**: Toggle high-end menu items on/off
- **Dynamic Pricing**: Real-time price adjustments based on demand
- **Personalized Recommendations**: AI-powered menu suggestions
- **Loyalty Program**: Show/hide loyalty rewards and points
- **Limited Time Offers**: Flash promotions and discounts
- **Weekend Specials**: Time-based menu variations
- **Chef Recommendations**: Highlight featured items
- **Nutrition Info**: Toggle nutritional data display
- **Allergen Warnings**: Show/hide allergen information

### Analytics & Observability
- **PostHog integration** for comprehensive event tracking
- **Feature flag usage analytics** with real-time metrics
- **User behavior tracking** including order patterns
- **Session analytics** with engagement scoring
- **A/B testing insights** and conversion tracking

### User Experience
- **Smooth animations** and micro-interactions
- **Responsive design** optimized for all devices
- **Real-time updates** when flags change
- **Interactive ordering system** with cart management
- **Beautiful brunch-themed UI** with warm color palette

## 🛠️ Setup

### Prerequisites
- Node.js 18+ and npm
- LaunchDarkly account (optional - works in mock mode)
- PostHog account (optional - for analytics)

### Installation

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd brunchdarkly
   npm install
   ```

2. **Environment Configuration**:
   ```bash
   cp .env.example .env
   ```

3. **Configure LaunchDarkly** (optional):
   - Get your client-side ID from LaunchDarkly dashboard
   - Add to `.env`:
     ```
     VITE_LAUNCHDARKLY_CLIENT_ID=your_client_side_id_here
     ```

4. **Configure PostHog** (optional):
   - Get your project API key from PostHog
   - Add to `.env`:
     ```
     VITE_POSTHOG_KEY=your_posthog_key_here
     VITE_POSTHOG_HOST=https://app.posthog.com
     ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🎯 LaunchDarkly Flag Configuration

Create these feature flags in your LaunchDarkly project:

### String Flags
- `dietary-preference`: String flag with variations: `omnivore`, `vegetarian`, `vegan`, `gluten-free`

### Boolean Flags
- `premium-items`: Show premium menu items
- `dynamic-pricing`: Enable dynamic pricing
- `personalized-recommendations`: Show AI recommendations
- `loyalty-program`: Enable loyalty rewards
- `limited-time-offers`: Show promotional offers
- `weekend-specials`: Enable weekend menu items
- `chef-recommendations`: Highlight chef favorites
- `nutrition-info`: Display nutritional information
- `allergen-warnings`: Show allergen alerts

### Targeting Rules Examples
- Target vegetarians with `dietary-preference = "vegetarian"`
- Show premium items to users with `loyaltyTier = "gold"`
- Enable dynamic pricing during peak hours
- Personalize recommendations based on `previousOrders`

## 📊 Analytics Events

The application tracks these key events:

### Feature Flag Events
- `feature_flag_evaluated`: When flags are evaluated
- `flag_toggled`: When flags are manually changed

### User Actions
- `session_started` / `session_ended`: Session tracking
- `order_item_added` / `order_item_removed`: Cart interactions
- `order_placed`: Successful orders
- `user_action`: General user interactions

### Page Events
- `$pageview`: Page navigation
- Custom events for menu interactions

## 🎨 Customization

### Adding New Feature Flags

1. **Add to LaunchDarkly service**:
   ```typescript
   // src/services/launchDarkly.ts
   private getMockFlag<T>(flagKey: string, defaultValue: T): T {
     const mockFlags: Record<string, any> = {
       'your-new-flag': defaultValue,
       // ... existing flags
     };
   }
   ```

2. **Update the hook**:
   ```typescript
   // src/hooks/useLaunchDarkly.ts
   export interface FeatureFlags {
     yourNewFlag: boolean;
     // ... existing flags
   }
   ```

3. **Add to dashboard**:
   ```typescript
   // src/components/LaunchDarklyDashboard.tsx
   const flagConfigs = [
     {
       key: 'yourNewFlag',
       name: 'Your New Flag',
       description: 'Description of what this flag does',
       icon: <YourIcon className="h-5 w-5" />,
       type: 'toggle',
     },
     // ... existing configs
   ];
   ```

### Styling
The application uses Tailwind CSS with a warm brunch-inspired color palette:
- Primary: Amber/Orange tones
- Secondary: Green for vegetarian options
- Accent: Indigo for LaunchDarkly branding
- Neutral: Gray scale for text and backgrounds

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
```bash
VITE_LAUNCHDARKLY_CLIENT_ID=your_production_client_id
VITE_POSTHOG_KEY=your_production_posthog_key
VITE_ENVIRONMENT=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- LaunchDarkly for the amazing feature flag platform
- PostHog for analytics and observability
- The React and Tailwind CSS communities
- All the brunch enthusiasts who inspired this demo! 🥞☕

---

**Made with ❤️ and lots of ☕ by the BrunchDarkly team**