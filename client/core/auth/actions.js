import axios from "axios";
import jwt from "jsonwebtoken";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from "./action-types";

function requestLogin(credentials) {
	return {
		type: LOGIN_REQUEST,
		isFetching: true,
		isAuthenticated: false,
		credentials
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
				const token = res.data.token;
				const decodedToken = jwt.decode(token);
				localStorage.setItem("authtoken", token);
				dispatch(receiveLogin(token, decodedToken._id));
			}).catch((err) => {
				dispatch(loginError(err.data.message));
			});
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
		localStorage.removeItem("authtoken");
		dispatch(receiveLogout());
	};
}
