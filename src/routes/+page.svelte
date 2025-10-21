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

<main class="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">
	<div class="container mx-auto max-w-4xl py-12">
		<div class="text-center mb-12">
			<h1 class="text-5xl font-bold text-white mb-4 drop-shadow-lg">Weather Dashboard</h1>
			<p class="text-xl text-blue-50">Search for current weather conditions in any city</p>
		</div>

		<div class="flex flex-col items-center gap-8">
			<SearchBar onSearch={handleSearch} disabled={loading} />

			{#if loading}
				<LoadingSpinner />
			{/if}

			{#if error}
				<div
					class="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md w-full animate-fade-in"
					role="alert"
				>
					<div class="flex items-start">
						<svg
							class="w-6 h-6 mr-3 flex-shrink-0"
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
						<div>
							<strong class="font-bold">Error: </strong>
							<span class="block sm:inline">{error}</span>
						</div>
					</div>
				</div>
			{/if}

			{#if weatherData && !loading}
				<WeatherDisplay weather={weatherData} />
			{/if}
		</div>
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
