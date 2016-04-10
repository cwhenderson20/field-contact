import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./app/App";
import LoginContainer from "./auth/LoginContainer";

export default function makeRoutes() {
	return (
		<Route path="/" component={App}>
			<IndexRoute component={LoginContainer} />
		</Route>
	);
}

makeRoutes.displayName = "makeRoutes";
