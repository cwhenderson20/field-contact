import axios from "axios";
import { TOKEN_KEY } from "core/auth";

export function callAPI(config, authenticated) {
	const token = localStorage.getItem(TOKEN_KEY) || null;

	if (authenticated) {
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		} else {
			return Promise.reject(new Error("No authorization token found for authenticated API request"));
		}
	}

	// TODO: deal with axios errors?
	return axios(config);
}
