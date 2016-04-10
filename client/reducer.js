import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import { authReducer as auth } from "core/auth";

export default combineReducers({
	auth,
	router
});
