<script lang="ts">
	import type { WeatherData } from '$lib/types/weather';

	interface Props {
		weather: WeatherData;
	}

	let { weather }: Props = $props();

	// Map weather conditions to emojis
	const weatherEmoji: Record<string, string> = {
		Clear: '☀️',
		Clouds: '☁️',
		Rain: '🌧️',
		Drizzle: '🌦️',
		Thunderstorm: '⛈️',
		Snow: '❄️',
		Mist: '🌫️',
		Smoke: '🌫️',
		Haze: '🌫️',
		Dust: '🌫️',
		Fog: '🌫️',
		Sand: '🌫️',
		Ash: '🌫️',
		Squall: '💨',
		Tornado: '🌪️'
	};

	const emoji = weatherEmoji[weather.condition] || '🌍';
</script>

<div class="mt-8 bg-gray-50 rounded-xl p-6 text-center animate-fade-in">
	<div class="flex items-center justify-center gap-2 mb-3">
		<span class="text-2xl">{emoji}</span>
		<h2 class="text-xl font-semibold text-gray-700">City: {weather.city}</h2>
	</div>
	<div class="mb-2">
		<div class="text-5xl sm:text-6xl font-bold text-blue-600">{weather.temperature}°C</div>
	</div>
	<div class="text-lg text-gray-600 capitalize">{weather.condition}</div>
</div>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.3s ease-out;
	}
</style>
