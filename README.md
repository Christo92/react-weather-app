# 🌦️ React Weather App

A responsive weather forecast application built with **React**, **TypeScript**, and **Framer Motion**.
It displays the current weather, a 5-day forecast, and supports light/dark mode. The app fetches weather data from the [OpenWeatherMap API](https://openweathermap.org/api).

---

## ✨ Features

- 🌤 Current weather by city
- 📆 5-day daily forecast
- 🔎 City search with error handling
- 🎨 Light & dark mode toggle
- 🎬 Animated transitions with Framer Motion
- ⚡ Fast data fetching with React Query

---

## 🚀 Getting Started

### 1. Clone the repository

```
git clone git@github.com:Christo92/react-weather-app.git
cd react-weather-app
```

### 2. Install dependencies

```
npm install
```

### 3. Setup the API key
To use the app, you need an API key from OpenWeatherMap:

- Create a free account at openweathermap.org
- Go to API keys
- Subscribe to the Current Weather Data (free tier is enough)
- Copy your API key

Then, create a .env file at the root of the project:

```
VITE_APP_OPENWEATHERMAP_ID="your_api_key_here"
```

> ⚠️ Replace "your_api_key_here" with your actual API key.

### 4. Start the development server

```
npm run dev
```

### 📁 Project Structure

```
src/
├── components/       # React UI components
│   ├── Weather.tsx
│   ├── WeatherInfo.tsx
│   ├── DailyForecast.tsx
│   └── SearchBar.tsx
├── hooks/            # Custom React hooks
│   └── useWeather.ts
├── theme/            # Theme context and toggle
│   └── ThemeContext.tsx
├── assets/           # Static assets (icons, images)
├── App.tsx           # Root component
├── main.tsx          # App entry point
└── index.css         # Global styles
```

### 💡 Technologies Used
- React with TypeScript
- React Query for efficient data fetching and caching
- Framer Motion for animations
- Axios for HTTP requests
- Vite for development and build tooling
- OpenWeatherMap API for weather data

### 🧪 Development Tips
- You can enable dark mode by clicking the theme toggle button.
- Use the search bar to look up weather by city.
- If a city is not found or typed incorrectly, a notification will appear.
- Animations are used on the first load and when switching between screens.
