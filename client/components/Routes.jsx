import React from "react";
import { Route } from "react-router";

import App from "./app/App";
import LoginContainer from "./auth/LoginContainer";
import Dashboard from "./dashboard/Dashboard";
import Add from "./dashboard/Add";
import { authRouteResolver } from "core/auth";

export default function makeRoutes(store) {
	return (
		<Route path="/" component={App} onEnter={authRouteResolver(store.getState)}>
			<Route path="login" component={LoginContainer} />
			<Route path="dashboard" component={Dashboard} />
			<Route path="add" component={Add} />
		</Route>
	);
}

makeRoutes.displayName = "makeRoutes";
