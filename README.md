# WeatherHub 🌤️

A minimalist, real-time weather application built with React, TypeScript, and Tailwind CSS. Search any city worldwide and get current conditions, 24-hour temperature trends, air quality data, and a 5-day forecast — all wrapped in a clean inverse light/dark theme system.

[![Live Demo](https://img.shields.io/badge/Live_Demo-weatherhub--nine.vercel.app-000?style=for-the-badge&logo=vercel)](https://weatherhub-nine.vercel.app)

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=flat&logo=vite)

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Smart City Search** | Autocomplete with debounced geocoding — type a city name and get instant suggestions |
| **Current Conditions** | Temperature, feels-like, humidity, wind, pressure, visibility, sunrise/sunset |
| **24h Temperature Chart** | Interactive line chart showing temperature and feels-like trends (Recharts) |
| **Air Quality Index** | Real-time AQI with pollutant breakdown (PM2.5, PM10, NO₂, O₃, CO) |
| **5-Day Forecast** | Daily weather predictions with highs, lows, and conditions |
| **°C / °F Toggle** | Switch temperature units globally with one click (persisted) |
| **Favorite Cities** | Save up to 10 cities for quick access (localStorage) |
| **Geolocation** | Auto-detect your location on first visit |
| **Last City Memory** | Automatically loads the last searched city on page reload |
| **Inverse Theme System** | Light/dark mode where accent colors mirror the opposite mode's background |
| **Responsive Design** | Mobile-first layout that adapts to any screen size |

## 🎨 Design Philosophy

WeatherHub follows a **minimalist inverse theme** approach:

- **Light mode**: White backgrounds, dark (`slate-900`) accent buttons and text
- **Dark mode**: Near-black backgrounds, white (`slate-50`) accent buttons and text
- No shadows, no gradients — just clean borders and solid colors
- The accent color in each mode is the background color of the opposite mode

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **UI** | React 19 |
| **Language** | TypeScript 5.9 |
| **Build Tool** | Vite 7.3 |
| **Styling** | Tailwind CSS 3.4 |
| **Charts** | Recharts |
| **HTTP Client** | Axios |
| **Data Source** | OpenWeatherMap API |
| **Hosting** | Vercel |

## 📁 Project Structure

```
src/
├── api/                    # API service layer
│   ├── client.ts           # Axios instance with interceptors
│   ├── weatherService.ts   # Weather, forecast & geocoding API calls
│   └── geolocationService.ts
├── components/
│   ├── common/             # Reusable UI primitives
│   │   ├── Button.tsx      # Variant-based button (primary/secondary/outline/ghost)
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── Skeleton.tsx
│   ├── layout/
│   │   ├── Header.tsx      # App title, unit toggle, theme toggle
│   │   └── Footer.tsx
│   └── weather/
│       ├── SearchBar.tsx       # Autocomplete with keyboard navigation
│       ├── CurrentWeather.tsx  # Main weather display card
│       ├── TemperatureChart.tsx # 24h trend line chart
│       ├── AirQualityCard.tsx  # AQI with pollutant bars
│       ├── WeatherForecast.tsx # 5-day daily forecast
│       └── FavoriteCities.tsx  # Saved cities grid
├── context/
│   ├── ThemeContext.tsx          # Light/dark mode with system detection
│   ├── TemperatureUnitContext.tsx # °C/°F global state with persistence
│   └── FavoritesContext.tsx      # Favorite cities with localStorage
├── hooks/
│   ├── useWeather.ts       # Current weather data fetching
│   ├── useForecast.ts      # 5-day forecast fetching
│   ├── useAirQuality.ts    # Air pollution data fetching
│   ├── useGeolocation.ts   # Browser geolocation API
│   └── useDebounce.ts      # Debounce utility for search input
├── types/                  # TypeScript interfaces
├── utils/                  # Helper functions (temperature, date, storage)
├── pages/
│   └── HomePage.tsx        # Main page composing all weather components
├── App.tsx                 # Root component with context providers
├── main.tsx                # Entry point
└── index.css               # Design system (tokens, components)
```

## 🛠️ Getting Started

### Prerequisites

- **Node.js** 18+ and **npm**
- **OpenWeatherMap API key** — [Get one free](https://openweathermap.org/api)

### Installation

```bash
# Clone the repository
git clone https://github.com/Gonzalo251104/WeatherHub.git
cd WeatherHub

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your API key
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|:--------:|
| `VITE_OPENWEATHER_API_KEY` | Your OpenWeatherMap API key | ✅ |
| `VITE_OPENWEATHER_BASE_URL` | API base URL (`https://api.openweathermap.org/data/2.5`) | ✅ |

### Running Locally

```bash
# Development server (hot reload)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type checking
npx tsc --noEmit

# Lint
npm run lint
```

## 🏗️ Architecture

### State Management
- **React Context** for global concerns (theme, favorites, temperature units)
- **Custom Hooks** to encapsulate data fetching and decouple logic from UI
- **localStorage** for persistence (theme, unit preference, last city, favorites)

### API Layer
- Centralized Axios client with base URL and error interceptors
- Separate service functions for Weather, Forecast, Air Quality, and Geocoding APIs
- Full TypeScript coverage on all API responses

### Design System
- Utility classes defined in `index.css` (`@layer components`)
- Variant-based Button component with 4 styles × 3 sizes
- Consistent color tokens: `slate-50` ↔ `slate-950` inverse system
- All transitions use `duration-300` for smooth mode switches

## 🚢 Deployment

This project is deployed on **Vercel** with automatic deployments on push to `master`.

To deploy your own instance:

1. Fork this repository
2. Connect it to [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard:
   - `VITE_OPENWEATHER_API_KEY`
   - `VITE_OPENWEATHER_BASE_URL`
4. Deploy — Vercel auto-detects Vite and configures the build

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Weather data by [OpenWeatherMap](https://openweathermap.org/)
- Charts by [Recharts](https://recharts.org/)
- Built with [Vite](https://vitejs.dev/), [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/)
