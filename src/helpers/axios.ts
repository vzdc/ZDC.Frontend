import axios from "axios";

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		"Cache-Control": "no-cache",
		"accept": "application/json"
	}
});

instance.interceptors.response.use(
    
);

export default instance;