import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from "react-router-redux";
import rootReducer from "reducers/rootReducer";

export default function configureStore(initialState = {}, history) {
	const middleware = applyMiddleware(routerMiddleware(history));
	const store = middleware(createStore)(rootReducer, initialState);
	return store;
}
