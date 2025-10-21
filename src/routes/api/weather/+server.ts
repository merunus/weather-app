import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { WeatherApiResponse, WeatherData, WeatherError } from '$lib/types/weather';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ url }) => {
	const city = url.searchParams.get('city');

	if (!city) {
		return json({ error: 'City parameter is required' } as WeatherError, { status: 400 });
	}

	const OPENWEATHER_API_KEY = env.OPENWEATHER_API_KEY;

	if (!OPENWEATHER_API_KEY) {
		return json(
			{ error: 'OpenWeather API key is not configured' } as WeatherError,
			{ status: 500 }
		);
	}

	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${OPENWEATHER_API_KEY}`
		);

		if (!response.ok) {
			if (response.status === 404) {
				return json({ error: 'City not found. Please check the spelling and try again.' } as WeatherError, {
					status: 404
				});
			}
			return json({ error: 'Failed to fetch weather data' } as WeatherError, { status: 500 });
		}

		const data: WeatherApiResponse = await response.json();

		const weatherData: WeatherData = {
			city: data.name,
			temperature: Math.round(data.main.temp),
			condition: data.weather[0].main,
			icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
		};

		return json(weatherData);
	} catch (error) {
		console.error('Weather API error:', error);
		return json({ error: 'An unexpected error occurred' } as WeatherError, { status: 500 });
	}
};
