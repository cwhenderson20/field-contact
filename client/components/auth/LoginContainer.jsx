import React, { Component } from "react";
import { connect } from "react-redux";

import Login from "./Login";
import { authActions } from "core/auth";

class LoginContainer extends Component {
	render() {
		return (
			<Login {...this.props} />
		);
	}
}

LoginContainer.displayName = "LoginContainer";

export default connect(null, authActions)(LoginContainer);
