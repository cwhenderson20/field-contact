import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from "react-router-redux";
import { apiMiddleware } from "redux-api-middleware";
import thunk from "redux-thunk";
import rootReducer from "../reducer";

export default function configureStore(initialState = {}, history) {
	const middleware = applyMiddleware(thunk, apiMiddleware, routerMiddleware(history));
	const store = middleware(createStore)(rootReducer, initialState);
	return store;
}
