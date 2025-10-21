<script lang="ts">
	import type { WeatherData } from '$lib/types/weather';

	interface Props {
		weather: WeatherData;
	}

	let { weather }: Props = $props();
</script>

<div
	class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md animate-fade-in"
>
	<div class="text-center">
		<h2 class="text-3xl font-bold text-gray-800 mb-4">{weather.city}</h2>
		<div class="flex justify-center items-center mb-4">
			<img src={weather.icon} alt={weather.condition} class="w-24 h-24" />
		</div>
		<div class="mb-4">
			<div class="text-5xl font-bold text-gray-900">{weather.temperature}°C</div>
		</div>
		<div class="text-xl text-gray-600 capitalize">{weather.condition}</div>
	</div>
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
