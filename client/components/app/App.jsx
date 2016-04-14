import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Grid } from "react-bootstrap";

import Navigation from "./Navigation";
import { authActions } from "core/auth";
import "static/global.css";

class App extends Component {
	constructor(props, context) {
		super(props, context);
	}

	componentWillReceiveProps(nextProps) {
		const { router } = this.context;
		const { isAuthenticated } = this.props;

		if (isAuthenticated && !nextProps.isAuthenticated) {
			router.replace("/login");
		} else if (!isAuthenticated && nextProps.isAuthenticated) {
			router.replace("/dashboard");
		}
	}

	render() {
		const { isAuthenticated, children, logoutUser } = this.props;
		return (
			<div>
				{isAuthenticated ? <Navigation logOut={logoutUser}/> : null}
				<Grid>
					{children}
				</Grid>
			</div>
		);
	}
}

App.displayName = "App";
App.contextTypes = {
	router: PropTypes.object.isRequired
};
App.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	children: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	const { auth } = state;
	const { isAuthenticated } = auth;

	return { auth, isAuthenticated };
}

export default connect(mapStateToProps, authActions)(App);
