# Weather Dashboard

A responsive weather dashboard built with SvelteKit 5, TypeScript, and Tailwind CSS. Search for any city and view current weather conditions including temperature and weather status.

## Features

- 🔍 Search weather by city name
- 🌡️ Display temperature and weather condition
- ⏳ Loading indicators for better UX
- ❌ Error handling with user-friendly messages
- 📱 Responsive design with Tailwind CSS
- ⚡ Built with SvelteKit 5 and Vite

## Tech Stack

- **Framework**: SvelteKit 5
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: OpenWeatherMap API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenWeatherMap API key (get one free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your OpenWeatherMap API key to `.env`:
```
OPENWEATHER_API_KEY=your_actual_api_key_here
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Deployment to Vercel

### Method 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add your environment variable:
```bash
vercel env add OPENWEATHER_API_KEY
```

### Method 2: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variable:
   - Key: `OPENWEATHER_API_KEY`
   - Value: Your OpenWeatherMap API key
4. Deploy

## Project Structure

```
weather-app/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── SearchBar.svelte       # Search input component
│   │   │   ├── WeatherDisplay.svelte  # Weather display component
│   │   │   └── LoadingSpinner.svelte  # Loading indicator
│   │   └── types/
│   │       └── weather.ts             # TypeScript interfaces
│   ├── routes/
│   │   ├── +page.svelte               # Main page
│   │   ├── +layout.svelte             # Root layout
│   │   └── api/
│   │       └── weather/
│   │           └── +server.ts         # Weather API endpoint
│   ├── app.css                        # Tailwind imports
│   └── app.d.ts                       # Type declarations
├── .env.example                       # Environment variables template
├── svelte.config.js                   # SvelteKit configuration
├── tailwind.config.js                 # Tailwind configuration
├── vite.config.ts                     # Vite configuration
└── vercel.json                        # Vercel deployment config
```

## API Route

### `GET /api/weather?city={cityName}`

**Query Parameters:**
- `city` (required): Name of the city

**Success Response (200):**
```json
{
  "city": "London",
  "temperature": 15,
  "condition": "Clouds",
  "icon": "https://openweathermap.org/img/wn/04d@2x.png"
}
```

**Error Response (400/404/500):**
```json
{
  "error": "Error message"
}
```

## License

MIT
