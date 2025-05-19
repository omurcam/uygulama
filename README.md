# Anadolu Wellness

A mobile application focused on traditional Turkish herbal remedies and healthy living tips tailored for Turkish diaspora in Europe and America.

## About

Anadolu Wellness brings centuries of traditional Turkish herbal knowledge to the modern world. The app provides detailed information on traditional Turkish herbs and natural mixtures, personalized health tracking, multimedia content, and a community forum where users can share their experiences and recipes.

## Features

### 1. Herbal Library
- A categorized list of 150+ traditional Turkish herbs and natural mixtures
- Each herb includes detailed description, health benefits, preparation instructions, and usage tips
- Search and filter functionality by herb name, benefit, or preparation method

### 2. Personalized Health Tracker
- User profile with basic health information and preferences
- Daily herbal intake reminders with push notifications
- Personalized recommendations based on user profile

### 3. Multimedia Content
- Embedded video tutorials and audio guides on herbal preparation and wellness practices
- Easy content updates for admin without coding

### 4. Community Forum
- Share questions, recipes, and experiences with the community
- Like and comment functionality
- User profiles and community engagement

### 5. Freemium Monetization
- Free access to basic herbal library and community
- Premium subscription unlocks full herb database, personalized plans, videos, and ad-free experience
- Integrated payment processing for subscriptions

## Technology Stack

- React Native / Expo
- Firebase (Authentication, Firestore, Storage)
- Stripe for payment processing
- Expo AV for multimedia playback
- Expo Notifications for reminders

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/anadolu-wellness.git
cd anadolu-wellness
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Follow the Expo CLI instructions to run the app on your device or emulator

## Project Structure

```
anadolu-wellness/
├── app/              # Main application screens
│   ├── (tabs)/       # Tab-based navigation screens
│   └── herb/         # Herb detail screens
├── assets/           # Images, fonts, and other static assets
├── components/       # Reusable UI components
├── constants/        # App constants and theme configuration
├── hooks/            # Custom React hooks
├── services/         # API services and business logic
└── utils/            # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Traditional Turkish herbal remedies research
- Expo team for the amazing development tools
- React Native community
