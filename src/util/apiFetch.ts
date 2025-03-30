import apiClient from "@/lib/axios";
import { AxiosRequestConfig } from "axios";

const apiUrl = new URL((import.meta?.env?.VITE_API_BASE_URL as string) || 'http://localhost:8000');
const devApiBaseHost = apiUrl.hostname;
const PORT = Number(import.meta.env.VITE_PORT) || 8000;
const devApiBaseUrl = `${apiUrl.protocol}//${devApiBaseHost}:${PORT}`;

export const API_BASE_URL = import.meta.env.DEV ? devApiBaseUrl : (import.meta.env.VITE_API_BASE_URL as string) || '/';

// Define the types for options and configuration

export class FetchApiError extends Error {
	status: number;

	data: {
		message: string;
		statusCode: number;
	};

	constructor(status: number, data: {
		message: string;
		statusCode: number;
	}) {
		super(`FetchApiError: ${status}`);
		this.status = status;
		this.data = data;
	}
}

// Global headers configuration
export const globalHeaders: Record<string, string> = {};

// Function to update global headers
export const setGlobalHeaders = (newHeaders: Record<string, string>) => {
	Object.assign(globalHeaders, newHeaders);
};

export const removeGlobalHeaders = (headerKeys: string[]) => {
	headerKeys.forEach((key) => {
		delete globalHeaders[key];
	});
};

// Main apiFetch function with interceptors and type safety
const apiFetch = async (endpoint: string, options: AxiosRequestConfig = {}) => {
	const { headers, data, ...restOptions } = options;
	const method = restOptions.method || 'GET';

	const config: AxiosRequestConfig = {
		method,
		url: `http://localhost:5000${endpoint}`,
		// url: `${API_BASE_URL}${endpoint}`,
		headers: {
			...(method !== 'GET' && { 'Content-Type': 'application/json' }),
			...globalHeaders,
			...headers,
		},
		...(data && { data }), // Only include data for non-GET requests
		...restOptions,
	};

	try {
		console.log({ endpoint, config });

		const response = await apiClient(config);

		console.log(response);

		return response.data; // Axios automatically parses JSON
	} catch (error: any) {
		console.error('Error in apiFetch:', error);

		// Axios errors have a response object
		if (error.response) {
			throw new FetchApiError(error.response.status, error.response.data);
		}

		throw error;
	}
};

export default apiFetch;
