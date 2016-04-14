import React, { Component, PropTypes } from "react";
import { Row, Col, Input, Button } from "react-bootstrap";

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(name) {
		return (event) => {
			const state = {};
			state[name] = event.target.value;
			this.setState(state);
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.loginUser(this.state);
	}

	render() {
		return (
			<Row>
				<form style={styles.form}>
					<Col xs={12}>
						<h1>Login</h1>
						<Input name="email" type="email" label="Email" placeholder="me@example.com" onChange={this.handleChange("email")}/>
						<Input name="password" type="password" label="Password" placeholder="password" onChange={this.handleChange("password")} />
						<Button type="submit" onClick={this.handleSubmit}>Log In</Button>
					</Col>
				</form>
			</Row>
		);
	}
}

const styles = {
	form: {
		maxWidth: 400,
		margin: "0 auto"
	}
}

Login.displayName = "Login";
Login.propTypes = {
	loginUser: PropTypes.func.isRequired
};

export default Login;
