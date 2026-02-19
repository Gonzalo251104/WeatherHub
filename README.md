# WeatherHub 🌤️

A modern, responsive weather application built with React, TypeScript, and Tailwind CSS. Get real-time weather information for any city worldwide with a beautiful, user-friendly interface.

![WeatherHub](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=flat&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=flat&logo=vite)

## ✨ Features

- **Real-time Weather Data**: Current weather conditions and 5-day forecast
- **City Search**: Search for weather information in any city worldwide
- **Geolocation**: Automatically detect and display weather for your current location
- **Favorite Cities**: Save and quickly access weather for multiple cities
- **Dark/Light Mode**: Toggle between dark and light themes with system preference detection
- **Responsive Design**: Mobile-first design that works on all devices
- **Detailed Information**: Temperature, humidity, wind speed, pressure, visibility, and more
- **Beautiful UI**: Glass morphism effects and smooth animations
- **Type-Safe**: Full TypeScript support for better development experience

## 🚀 Tech Stack

### Core Technologies
- **React 19.2** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7.3** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework

### Key Dependencies
- **Axios** - HTTP client for API requests
- **React Leaflet** - Interactive maps (optional feature)
- **Recharts** - Chart library for data visualization (optional feature)
- **OpenWeatherMap API** - Weather data provider

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

## 📁 Project Structure

```
weatherhub/
├── public/                 # Static assets
├── src/
│   ├── api/               # API service layer
│   │   ├── client.ts      # Axios instance configuration
│   │   ├── weatherService.ts  # Weather API functions
│   │   └── geolocationService.ts  # Geolocation utilities
│   ├── components/        # React components
│   │   ├── common/        # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── ErrorMessage.tsx
│   │   │   └── Skeleton.tsx
│   │   ├── layout/        # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── weather/       # Weather-specific components
│   │       ├── SearchBar.tsx
│   │       ├── CurrentWeather.tsx
│   │       ├── WeatherForecast.tsx
│   │       └── FavoriteCities.tsx
│   ├── context/           # React context providers
│   │   ├── ThemeContext.tsx     # Dark/Light mode
│   │   └── FavoritesContext.tsx # Favorite cities
│   ├── hooks/             # Custom React hooks
│   │   ├── useWeather.ts
│   │   ├── useForecast.ts
│   │   └── useGeolocation.ts
│   ├── pages/             # Page components
│   │   └── HomePage.tsx
│   ├── types/             # TypeScript type definitions
│   │   ├── weather.types.ts
│   │   └── app.types.ts
│   ├── utils/             # Utility functions
│   │   ├── temperature.ts
│   │   ├── date.ts
│   │   ├── weather.ts
│   │   └── storage.ts
│   ├── constants/         # App constants and configuration
│   │   └── index.ts
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Installation

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- OpenWeatherMap API key (free tier available)

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd weatherhub
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. **Get your OpenWeatherMap API key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key
   - Add it to your `.env` file:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
VITE_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
```

5. **Start the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📜 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format
```

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENWEATHER_API_KEY` | Your OpenWeatherMap API key | Yes |
| `VITE_OPENWEATHER_BASE_URL` | API base URL | No (has default) |

## 🎨 Features Deep Dive

### Current Weather
- Real-time temperature with "feels like" temperature
- Weather condition description with icon
- Humidity, wind speed, pressure, and visibility
- Sunrise and sunset times
- High/low temperature for the day

### 5-Day Forecast
- Daily weather predictions
- Temperature ranges
- Weather conditions
- Precipitation probability
- Humidity levels

### Search & Location
- Search any city by name
- Auto-detect user location with browser geolocation API
- Error handling for invalid cities or denied location access

### Favorite Cities
- Save up to 10 favorite cities
- Quick access to saved locations
- Persistent storage using localStorage
- Easy add/remove functionality

### Theme System
- Light and dark mode toggle
- System preference detection
- Smooth theme transitions
- Persistent theme preference

## 🏗️ Architecture

### State Management
- **React Context** for global state (theme, favorites)
- **Custom Hooks** for data fetching and business logic
- **Component-level state** for UI interactions

### API Layer
- Centralized Axios client with interceptors
- Type-safe API functions
- Error handling and retry logic
- Request/response transformations

### Styling
- **Tailwind CSS** for utility-first styling
- **CSS custom properties** for theming
- **Glass morphism** effects
- **Responsive design** with mobile-first approach

### Type Safety
- Comprehensive TypeScript types
- API response interfaces
- Component prop types
- Utility function signatures

## 🧪 Best Practices Implemented

- ✅ Component composition and reusability
- ✅ Custom hooks for shared logic
- ✅ TypeScript for type safety
- ✅ Error boundaries and error handling
- ✅ Loading states and skeletons
- ✅ Accessible UI (ARIA labels, keyboard navigation)
- ✅ Clean code principles (SOLID, DRY)
- ✅ Code splitting and lazy loading ready
- ✅ Environment variable management
- ✅ Responsive images and performance optimization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from [Heroicons](https://heroicons.com/)
- Built with [Vite](https://vitejs.dev/), [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/)

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Note**: This is a portfolio project demonstrating modern React development practices, TypeScript usage, and API integration. It showcases clean code architecture, responsive design, and professional-grade user experience.
