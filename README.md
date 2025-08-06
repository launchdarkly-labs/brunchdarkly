# BrunchDarkly 🥞

A Next.js demo application showcasing LaunchDarkly's feature flag capabilities through an interactive brunch ordering experience. Built with React, TypeScript, and Tailwind CSS, this app demonstrates how feature flags can control user experiences in real-time.

## 🚀 Features

### LaunchDarkly Integration
- **Real-time feature flags** with automatic updates using LaunchDarkly React SDK
- **User context targeting** with demographic and behavioral data
- **Admin panel** for toggling flags in development
- **Automatic initialization** with user context generation

### Feature Flags Implemented
- **`dietaryPreference`** (string): Filter menu items by dietary needs (`omnivore`, `vegetarian`, `vegan`, `gluten-free`)
- **`premiumItems`** (boolean): Show/hide premium menu category and items
- **`dynamicPricing`** (boolean): Enable weather-based price adjustments
- **`personalizedRecommendations`** (boolean): Display AI-powered menu suggestions
- **`loyaltyProgram`** (boolean): Show loyalty points and tier in user profile
- **`limitedTimeOffers`** (boolean): Display promotional banners
- **`weatherBasedMenu`** (boolean): Show weather-optimized menu indicator
- **`chefRecommendations`** (boolean): Highlight chef-recommended items with badges
- **`nutritionInfo`** (boolean): Display calorie and protein information on menu items
- **`allergenWarnings`** (boolean): Show allergen information and warnings

### Core Features
- **Interactive brunch menu** with categorized items
- **Shopping cart functionality** with quantity management
- **Weather integration** affecting pricing and menu optimization
- **User profile management** with dietary preferences
- **Real-time flag administration** through admin panel
- **Responsive design** with smooth animations using Framer Motion

## 🛠️ Setup

### Prerequisites
- Node.js 18+ and yarn/npm
- LaunchDarkly account (optional - app works without configuration)

### Installation

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd brunchdarkly
   yarn install
   # or npm install
   ```

2. **Environment Configuration** (optional):
   Create a `.env.local` file in the project root:
   ```bash
   # LaunchDarkly Configuration
   NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID=your_client_side_id_here
   
   # Optional: Weather API for dynamic pricing
   NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key_here
   ```

3. **Start the development server**:
   ```bash
   yarn dev
   # or npm run dev
   ```

4. **Open your browser**: Navigate to `http://localhost:3000`

### Production Build
```bash
yarn build
yarn start
```

## 🎯 LaunchDarkly Flag Configuration

Create these feature flags in your LaunchDarkly project:

### String Flags
- **`dietaryPreference`**: Controls menu filtering
  - **Type**: String
  - **Variations**: `omnivore`, `vegetarian`, `vegan`, `gluten-free`
  - **Default**: `omnivore`

### Boolean Flags
- **`premiumItems`**: Show/hide premium menu category
- **`dynamicPricing`**: Enable weather-based price adjustments  
- **`personalizedRecommendations`**: Display recommendation section
- **`loyaltyProgram`**: Show loyalty points in user profile
- **`limitedTimeOffers`**: Display promotional banners
- **`weatherBasedMenu`**: Show weather indicator on menu
- **`chefRecommendations`**: Highlight items with chef badges
- **`nutritionInfo`**: Show calories/protein on menu items
- **`allergenWarnings`**: Display allergen information

### Targeting Examples
- Target vegetarians: `dietaryPreference = "vegetarian"`
- Show premium items to gold members: `loyaltyTier = "gold"`
- Enable dynamic pricing during peak hours: `time >= "11:00" && time <= "14:00"`
- Personalize for returning customers: `previousOrders > 0`

## 🔧 How It Works

### Flag-Driven Experience
The application demonstrates several LaunchDarkly patterns:

1. **Menu Filtering**: The `dietaryPreference` string flag filters menu items in real-time
2. **Feature Toggling**: Boolean flags show/hide entire UI sections (premium items, recommendations)
3. **Dynamic Content**: Weather integration affects pricing when `dynamicPricing` is enabled
4. **User Context**: LaunchDarkly automatically receives user context for targeting
5. **Real-time Updates**: Flag changes are reflected immediately without page refresh

### Admin Panel Features
- View all active flags and their current values
- Toggle boolean flags directly in the UI (development mode)
- See real-time flag evaluation results
- Test different flag combinations instantly

## 🎨 Tech Stack & Architecture

### Technologies Used
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React hooks + TanStack Query
- **Feature Flags**: LaunchDarkly React SDK
- **Icons**: Lucide React

### Project Structure
```
app/
├── components/          # React components
│   ├── AdminPanel.tsx   # Flag management interface
│   ├── BrunchMenu.tsx   # Main menu with flag-controlled features
│   ├── UserProfile.tsx  # User context and preferences
│   └── ...
├── hooks/              # Custom React hooks
│   └── useWeather.ts   # Weather API integration
├── providers.tsx       # LaunchDarkly and Query providers
├── types.ts           # TypeScript type definitions
└── page.tsx           # Main application page

### Key Components
- **`BrunchMenu`**: Main menu component with flag-controlled filtering and pricing
- **`AdminPanel`**: Development tool for toggling feature flags in real-time
- **`UserProfile`**: Displays user context and dietary preferences from LaunchDarkly
- **`PersonalizedRecommendations`**: AI-powered suggestions (flag-controlled)
- **`WeatherWidget`**: Weather integration for dynamic pricing
- **`MenuItem`**: Individual menu item with nutrition and allergen info

### Design System
The application uses a warm, brunch-inspired color palette:
- **Primary**: Amber/Orange gradients (`from-amber-600 to-orange-600`)
- **Secondary**: Emerald for actions (`emerald-500`)
- **Accent**: Purple for recommendations (`purple-600`)
- **Background**: Soft orange gradient (`from-orange-50 to-yellow-50`)

## 🚀 Deployment

### Build for Production
```bash
yarn build
yarn start
```

### Environment Variables for Production
```bash
NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID=your_production_client_id
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
```

### Deployment Platforms
This Next.js application can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Railway**
- Any platform supporting Node.js applications

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
- The React and Tailwind CSS communities
- All the brunch enthusiasts who inspired this demo! 🥞☕

---

**Made with ❤️ and lots of ☕ by the BrunchDarkly team**