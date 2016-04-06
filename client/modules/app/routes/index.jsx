import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "../../layout/App";
import Test from "../../layout/Test";

export default function MakeRoutes() {
	return (
		<Route path="/" component={App}>
			<IndexRoute component={Test} />
		</Route>
	);
}

MakeRoutes.displayName = "MakeRoutes";
