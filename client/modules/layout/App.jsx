import React, { PropTypes } from "react";
import { Grid } from "react-bootstrap";
import Navigation from "./Navigation";
import "static/global.css";

function App({ children }) {
	return (
		<div>
			<Navigation />
			<Grid>
				{children}
			</Grid>
		</div>
	);
}

App.displayName = "App";
App.propTypes = {
	children: PropTypes.object.isRequired
};

export default App;
