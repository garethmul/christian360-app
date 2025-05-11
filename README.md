# Christian360 App

A React Native mobile application built with Expo for the Christian360 platform. The app connects Christians through various features including social posts, job listings, events, accommodations, and more.

## Features

- **Posts Feed**: Share and engage with community posts (like LinkedIn)
- **Jobs Board**: Find and apply for Christian ministry positions (like Indeed)
- **Events Calendar**: Discover and register for Christian events (like Eventbrite)
- **Accommodation**: Find Christian-friendly stays (like AirBNB)
- **Additional Features**:
  - Locations (like Google Maps)
  - Groups (like WhatsApp communities)
  - Recommended Reading (like Goodreads)
  - Digital Products (like Kajabi)
  - Partner Organizations (like LinkedIn companies)

## Tech Stack

- React Native with Expo
- NativeWind (TailwindCSS for React Native)
- React Navigation for routing
- ShadCN compatible styling

## Getting Started

### Prerequisites

- Node.js (>=14.0.0)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device

### Installation and Running with Expo Go

1. Clone the repository:
   ```
   git clone <repository-url>
   cd christian360
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Running on Expo Go:
   - Install the Expo Go app on your mobile device
   - For Android: Scan the QR code displayed in the terminal with the Expo Go app
   - For iOS: Scan the QR code with your camera app, then open the link in Expo Go
   
5. Alternative options:
   ```
   npm run android  # Run on Android emulator
   npm run ios      # Run on iOS simulator (Mac only)
   npm run web      # Run in web browser
   ```

## Important Setup Notes

1. **NativeWind Configuration:** Ensure that NativeWind is properly configured in babel.config.js with the following plugins:
   ```
   plugins: [
     "nativewind/babel", 
     "react-native-reanimated/plugin"
   ]
   ```

2. **First Run:** On first run, you may need to restart the bundler with cache clearing:
   ```
   npm start -- --reset-cache
   ```

3. **CSS Classes:** This project uses NativeWind for styling with Tailwind CSS classes directly in your React Native components.

## Using the App

1. **Posts Feed**: Browse community posts, like and comment on content
2. **Jobs**: Browse job listings from Christian organizations
3. **Events**: Discover Christian events in your area
4. **Stays**: Find Christian-friendly accommodations
5. **More**: Access additional features like Locations, Groups, Reading, Products, and Partner Organizations

## Troubleshooting

- If you encounter any issues with Expo Go, ensure your mobile device and development machine are on the same network
- To clear cache: `expo start -c`
- For Metro bundler issues: `npm start -- --reset-cache` 
- If you experience styling issues, restart the bundler and ensure NativeWind is properly set up

## Project Structure

```
christian360/
├── app/                  # App-specific screens and navigation
├── components/           # Reusable components
│   ├── Posts/            # Posts feature components
│   ├── Jobs/             # Jobs feature components
│   ├── Events/           # Events feature components
│   ├── Accommodation/    # Accommodation feature components
│   ├── Locations/        # Locations feature components
│   ├── Groups/           # Groups feature components
│   ├── RecommendedReading/ # Reading feature components
│   ├── DigitalProducts/  # Digital products feature components
│   ├── PartnerOrganizations/ # Partner organizations components
│   └── ui/               # Shared UI components
├── assets/               # Images, fonts, and other static files
├── App.js                # Main app component
└── tailwind.config.js    # TailwindCSS configuration
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 