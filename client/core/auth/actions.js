import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./action-types";

function requestLogin(credentials) {
	return {
		type: LOGIN_REQUEST,
		isFetching: true,
		isAuthenticated: false,
		credentials
	};
}

function receiveLogin(token) {
	return {
		type: LOGIN_SUCCESS,
		isFetching: false,
		isAuthenticated: true,
		token
	};
}

function loginError(message) {
	return {
		type: LOGIN_FAILURE,
		isFetching: false,
		isAuthenticated: false,
		message
	};
}

export function loginUser(credentials) {
	return (dispatch) => {
		dispatch(requestLogin(credentials));

		axios.post("/api/login", credentials)
			.then((res) => {
				localStorage.setItem("token", res.data.token);
				dispatch(receiveLogin(res.data.token));
			}).catch((err) => {
				dispatch(loginError(err.data.message));
			});
	}
}
