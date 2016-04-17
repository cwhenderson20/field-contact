import jwt from "jsonwebtoken";
import { CALL_API } from "redux-api-middleware";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from "./action-types";

export function loginUser(credentials) {
	return (dispatch) => {
		dispatch({
			[CALL_API]: {
				endpoint: "/api/login",
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(credentials),
				types: [
					LOGIN_REQUEST,
					{
						type: LOGIN_SUCCESS,
						payload: (action, state, res) => {
							return res.json().then((json) => {
								const token = json.token;
								const user = jwt.decode(token)._id;

								localStorage.setItem("authtoken", token);
								return ({token, user});
							})
						}
					},
					LOGIN_FAILURE
				]
			}
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
