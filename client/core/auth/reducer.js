import jwt from "jsonwebtoken";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from "./action-types";

function getInitialState() {
	const initialState = {
		isFetching: false,
		isAuthenticated: false
	};

	const token = localStorage.getItem("authtoken");

	if (token) {
		const decodedToken = jwt.decode(token);

		if (!decodedToken || decodedToken.exp <= Date.now() / 1000) {
			return initialState;
		}

		initialState.isAuthenticated = true;
		initialState.token = token;
		initialState.user = decodedToken._id;
	}

	return initialState;
}

const initialState = getInitialState();

export function authReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				isAuthenticated: false
			});
		case LOGIN_SUCCESS:
			console.log(action);
			return Object.assign({}, state, {
				isFetching: false,
				isAuthenticated: true,
				token: action.payload.token,
				user: action.payload.user
			});
		case LOGIN_FAILURE:
			return Object.assign({}, state, {
				isFetching: false,
				isAuthenticated: false,
				errorMessage: action.message
			});
		case LOGOUT_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				isAuthenticated: true
			});
		case LOGOUT_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				isAuthenticated: false
			});
		default:
			return state;
	}
}
