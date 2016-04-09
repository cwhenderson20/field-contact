import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "../../layout/App";
import Login from "modules/auth/components/Login";
// import Dashboard from "modules/dashboard/components/Dashboard";
import Add from "modules/add/components/Add";
import NotFound from "modules/NotFound";

export default function MakeRoutes() {
	return (
		<Route path="/" component={App}>
			<IndexRoute component={Login} />
			<Route path="add" component={Add} />
			<Route path="*" component={NotFound} />
		</Route>
	);
}

MakeRoutes.displayName = "MakeRoutes";
