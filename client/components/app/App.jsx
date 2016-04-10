import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Grid } from "react-bootstrap";

import Navigation from "./Navigation";
import "static/global.css";

class App extends Component {
	render() {
		const { isAuthenticated, children } = this.props;

		return (
			<div>
				{isAuthenticated ? <Navigation /> : null}
				<Grid>
					{children}
				</Grid>
			</div>
		);
	}
}

App.displayName = "App";
App.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	children: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	const { auth } = state;
	const { isAuthenticated } = auth;

	return { auth, isAuthenticated };
}

export default connect(mapStateToProps)(App);
