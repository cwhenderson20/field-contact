import React, { PropTypes } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";

function Navigation({ logOut }) {
	return (
		<Navbar>
			<Navbar.Header>
				<Navbar.Brand>
					<a href="/dashboard">Field Contact</a>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<NavItem href="/dashboard">Dashboard</NavItem>
					<NavItem href="/add">Add Entry</NavItem>
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
