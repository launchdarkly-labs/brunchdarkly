# Environment Variables Setup

To use the server-side flag management features, you need to configure the following environment variables:

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Client-side LaunchDarkly SDK (for frontend)
NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID=your-client-side-id-here

# Server-side LaunchDarkly SDK (for reading flags)
LAUNCHDARKLY_SDK_KEY=your-server-side-sdk-key-here

# LaunchDarkly Management API (for toggling flags) - Optional
LAUNCHDARKLY_MANAGEMENT_API_KEY=your-management-api-key-here
LAUNCHDARKLY_PROJECT_KEY=your-project-key
LAUNCHDARKLY_ENVIRONMENT_KEY=production

# Optional: Weather API key (if using weather features)
NEXT_PUBLIC_WEATHER_API_KEY=your-weather-api-key-here
```

## Where to Find These Keys

### LaunchDarkly Client ID (Client-side)
1. Go to your LaunchDarkly dashboard
2. Navigate to Account Settings → Projects
3. Select your project
4. Go to Environments
5. Copy the "Client-side ID" for your environment

### LaunchDarkly SDK Key (Server-side)
1. Go to your LaunchDarkly dashboard
2. Navigate to Account Settings → Projects
3. Select your project
4. Go to Environments
5. Copy the "SDK key" for your environment

### LaunchDarkly Management API Key (Optional - for flag toggling)
1. Go to your LaunchDarkly dashboard
2. Navigate to Account Settings → Authorization
3. Create a new access token with:
   - **Role**: Writer or Admin
   - **Permissions**: Include flag management permissions
4. Copy the generated token

**Important**: All keys are sensitive and should never be exposed to the client-side. They're used only in server-side operations.

## Features Enabled

With these environment variables configured:

- **Client-side**: Feature flags work in the browser
- **Server-side**: Admin panel can toggle flags via API routes
- **Weather Widget**: Shows weather-based recommendations (if API key provided)

## Security Notes

- Never commit `.env.local` to version control
- The server-side SDK key has full access to your LaunchDarkly project
- Use different environments (development/staging/production) with separate keys