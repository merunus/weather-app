export interface WeatherData {
	city: string;
	temperature: number;
	condition: string;
	icon: string;
}

export interface WeatherApiResponse {
	name: string;
	main: {
		temp: number;
	};
	weather: Array<{
		main: string;
		description: string;
		icon: string;
	}>;
}

export interface WeatherError {
	error: string;
}
