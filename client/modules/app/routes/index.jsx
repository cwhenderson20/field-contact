import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "../../layout/App";
import Dashboard from "modules/dashboard/components/Dashboard";
import Add from "modules/add/components/Add";

export default function MakeRoutes() {
	return (
		<Route path="/" component={App}>
			<IndexRoute component={Dashboard} />
			<Route path="add" component={Add} />
		</Route>
	);
}

MakeRoutes.displayName = "MakeRoutes";
