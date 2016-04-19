import jwt from "jsonwebtoken";
import { callAPI } from "util/api";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from "./action-types";
import { TOKEN_KEY } from "./constants";

function requestLogin() {
	return {
		type: LOGIN_REQUEST,
		isFetching: true,
		isAuthenticated: false
	};
}

function receiveLogin(token, user) {
	return {
		type: LOGIN_SUCCESS,
		isFetching: false,
		isAuthenticated: true,
		token,
		user
	};
}

function loginError(error) {
	return {
		type: LOGIN_FAILURE,
		isFetching: false,
		isAuthenticated: false,
		error
	};
}

export function loginUser(credentials) {
	return (dispatch) => {
		dispatch(requestLogin());
		callAPI({
			url: "/api/login",
			method: "POST",
			data: credentials
		}).then((response) => {
			const token = response.data.token;
			const user = jwt.decode(token)._id;

			localStorage.setItem(TOKEN_KEY, token);
			dispatch(receiveLogin(token, user));
		}).catch((error) => dispatch(loginError(error)));
	}
}

function requestLogout() {
	return {
		type: LOGOUT_REQUEST,
		isFetching: true,
		isAuthenticated: true
	};
}

function receiveLogout() {
	return {
		type: LOGOUT_SUCCESS,
		isFetching: false,
		isAuthenticated: false
	};
}

export function logoutUser() {
	return (dispatch) => {
		dispatch(requestLogout());
		localStorage.removeItem(TOKEN_KEY);
		dispatch(receiveLogout());
	};
}
