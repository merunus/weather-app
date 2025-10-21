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

<form onsubmit={handleSubmit} class="w-full">
	<div class="flex gap-2">
		<input
			type="text"
			bind:value={city}
			{disabled}
			placeholder="Enter city name..."
			class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all text-base"
			aria-label="City name"
		/>
		<button
			type="submit"
			{disabled}
			class="px-6 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
		>
			Search
		</button>
	</div>
</form>
