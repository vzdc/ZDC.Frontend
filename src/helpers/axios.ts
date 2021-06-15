import axios from "axios";

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	timeout: 10000,
	headers: {
		"Authorization": localStorage.getItem("access") && "Bearer " + localStorage.getItem("access"),
		"Content-Type": "application/json",
		"Cache-Control": "no-cache",
		"accept": "application/json"
	}
});

export default instance;