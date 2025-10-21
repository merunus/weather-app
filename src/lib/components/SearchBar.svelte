<script lang="ts">
	interface Props {
		onSearch: (city: string) => void;
		disabled?: boolean;
	}

	let { onSearch, disabled = false }: Props = $props();
	let city = $state('');

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (city.trim()) {
			onSearch(city.trim());
		}
	}
</script>

<form onsubmit={handleSubmit} class="w-full max-w-md">
	<div class="flex gap-2">
		<input
			type="text"
			bind:value={city}
			{disabled}
			placeholder="Enter city name..."
			class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
			aria-label="City name"
		/>
		<button
			type="submit"
			{disabled}
			class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
		>
			Search
		</button>
	</div>
</form>
