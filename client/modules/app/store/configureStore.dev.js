import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "react-router-redux";
import rootReducer from "../rootReducer";

export default function configureStore(initialState = {}, history) {
	let middleware = applyMiddleware(routerMiddleware(history));

	if (__DEBUG__) {
		const devTools = window.devToolsExtension ?
			window.devToolsExtension() :
			require("modules/app/utils/DevTools").default.instrument();
		middleware = compose(middleware, devTools);
	}

	const store = middleware(createStore)(rootReducer, initialState);

	if (module.hot) {
		module.hot.accept("../rootReducer", () => {
			const nextRootReducer = require("../rootReducer").default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
