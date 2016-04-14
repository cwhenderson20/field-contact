import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from "./action-types";

const initialState = {
	isFetching: false,
	isAuthenticated: localStorage.getItem("token") ? true : false
};

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
				token: action.token
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
