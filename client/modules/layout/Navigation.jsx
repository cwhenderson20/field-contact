import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";

function Navigation() {
	return (
		<Navbar>
			<Navbar.Header>
				<Navbar.Brand>
					<a href="/">Field Contact</a>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<NavItem href="/">Dashboard</NavItem>
					<NavItem href="/add">Add Entry</NavItem>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

Navigation.displayName = "Navigation";
Navigation.propTypes = {};

export default Navigation;
