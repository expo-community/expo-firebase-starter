import 'dotenv/config';

export default {
  expo: {
    name: 'Party',
    slug: 'party',
    privacy: 'unlisted',
    platforms: ['ios', 'android'],
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/PNY.png',
    splash: {
      image: './assets/PNY.png',
      resizeMode: 'contain',
      backgroundColor: '#1c1c1e'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: false,
      buildNumber: "11",
      bundleIdentifier: "com.partynearyou.app"
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID
    }
  }
};
