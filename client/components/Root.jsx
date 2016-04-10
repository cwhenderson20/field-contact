import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";
import createBrowserHistory from "history/lib/createBrowserHistory";
import { useRouterHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

import configureStore from "../store";
import makeRoutes from "./Routes";

const browserHistory = useRouterHistory(createBrowserHistory)();
const store = configureStore({}, browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {
	selectLocationState: (state) => state.router
});

const routes = makeRoutes(store);

class Root extends Component {
	get content() {
		return (
			<Router history={history}>
				{routes}
			</Router>
		);
	}

	get devTools() {
		if (__DEBUG__) {
			if (__DEBUG_NEW_WINDOW__) {
				if (!window.devToolsExtension) {
					require("components/devtools/createDevToolsWindow").default(store);
				} else {
					window.devToolsExtension.open();
				}
			} else if (!window.devToolsExtension) {
				const DevTools = require("components/devtools/DevTools").default;
				return <DevTools />;
			}
		}
	}

	render() {
		return (
			<Provider store={store}>
				<div style={{ height: "100%" }}>
					{this.content}
					{this.devTools}
				</div>
			</Provider>
		);
	}
}

Root.displayName = "Root";

export default Root;
