import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "react-router-redux";
import { apiMiddleware } from "redux-api-middleware";
import thunk from "redux-thunk";
import rootReducer from "../reducer";

export default function configureStore(initialState = {}, history) {
	let middleware = applyMiddleware(thunk, apiMiddleware, routerMiddleware(history));

	if (__DEBUG__) {
		const devTools = window.devToolsExtension ?
			window.devToolsExtension() :
			require("components/devtools/DevTools").default.instrument();
		middleware = compose(middleware, devTools);
	}

	const store = middleware(createStore)(rootReducer, initialState);

	if (module.hot) {
		module.hot.accept("../reducer", () => {
			const nextRootReducer = require("../reducer").default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
