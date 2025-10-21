<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import WeatherDisplay from '$lib/components/WeatherDisplay.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import type { WeatherData, WeatherError } from '$lib/types/weather';

	let weatherData = $state<WeatherData | null>(null);
	let loading = $state(false);
	let error = $state<string | null>(null);

	async function handleSearch(city: string) {
		loading = true;
		error = null;
		weatherData = null;

		try {
			const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
			const data = await response.json();

			if (!response.ok) {
				const errorData = data as WeatherError;
				error = errorData.error || 'Failed to fetch weather data';
				return;
			}

			weatherData = data as WeatherData;
		} catch (err) {
			error = 'Network error. Please check your connection and try again.';
			console.error('Search error:', err);
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Weather Dashboard</title>
	<meta name="description" content="Search and view current weather conditions for any city" />
</svelte:head>

<main class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
	<div class="bg-white rounded-2xl shadow-xl p-8 sm:p-12 w-full max-w-lg">
		<h1 class="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
			Weather Dashboard
		</h1>

		<SearchBar onSearch={handleSearch} disabled={loading} />

		{#if loading}
			<LoadingSpinner />
		{/if}

		{#if error}
			<div
				class="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-fade-in"
				role="alert"
			>
				<div class="flex items-start">
					<svg
						class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
						fill="currentColor"
						viewBox="0 0 20 20"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clip-rule="evenodd"
						/>
					</svg>
					<div class="text-sm">
						<strong class="font-semibold">Error: </strong>
						<span>{error}</span>
					</div>
				</div>
			</div>
		{/if}

		{#if weatherData && !loading}
			<WeatherDisplay weather={weatherData} />
		{/if}
	</div>
</main>

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
