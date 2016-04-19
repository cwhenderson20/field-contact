import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import rootReducer from "../reducer";

export default function configureStore(initialState = {}, history) {
	const middleware = applyMiddleware(thunk, routerMiddleware(history));
	const store = middleware(createStore)(rootReducer, initialState);
	return store;
}
