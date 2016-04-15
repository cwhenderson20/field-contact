import React, { PropTypes } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem } from "react-bootstrap";

function Navigation({ logOut }) {
	return (
		<Navbar>
			<Navbar.Header>
				<LinkContainer to="/dashboard">
					<Navbar.Brand>Field Contact</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<LinkContainer to="/dashboard">
						<NavItem>Dashboard</NavItem>
					</LinkContainer>
					<LinkContainer to="/add">
						<NavItem>Add Entry</NavItem>
					</LinkContainer>
				</Nav>
				<Nav pullRight>
					<NavItem onClick={logOut}>Log Out</NavItem>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

Navigation.displayName = "Navigation";
Navigation.propTypes = {
	logOut: PropTypes.func.isRequired
};

export default Navigation;
