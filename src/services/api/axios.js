import axios from 'axios';

const getAccessToken = () => {
	return (
		localStorage.getItem('ACCESS_TOKEN') ||
		sessionStorage.getItem('ACCESS_TOKEN')
	);
};

const instance = axios.create({
	baseURL: import.meta.env.VITE_APP_API_DOMAIN,
	responseType: 'json',
});

instance.interceptors.request.use(
	(config) => {
		const token = getAccessToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const getAxiosInstance = () => instance;
