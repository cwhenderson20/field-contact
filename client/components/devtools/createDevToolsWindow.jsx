import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import DevTools from "./DevToolsWindow";

export default function createDevToolsWindow(store) {
	const win = window.open(
		null,
		"redux-devtools",
		`width=400,height=${window.outerHeight},menubar=no,resizable=yes,scrollbars=no,status=no`
	);

	win.location.reload();

	setTimeout(() => {
		win.document.write("<div id=\"react-devtools-root\"></div>");
		win.document.body.style.margin = "0";

		ReactDOM.render(
			<Provider store={store}>
				<DevTools />
			</Provider>,
			win.document.getElementById("react-devtools-root")
		);
	}, 10);
}
