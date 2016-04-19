import jwt from "jsonwebtoken";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from "./action-types";
import { TOKEN_KEY } from "./constants";

function getInitialState() {
	const initialState = {
		isFetching: false,
		isAuthenticated: false
	};

	const token = localStorage.getItem(TOKEN_KEY);

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
			return Object.assign({}, state, {
				isFetching: false,
				isAuthenticated: true,
				token: action.token,
				user: action.user
			});
		case LOGIN_FAILURE:
			return Object.assign({}, state, {
				isFetching: false,
				isAuthenticated: false,
				errorMessage: action.error
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
