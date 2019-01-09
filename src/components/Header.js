import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, NavItem, NavLink, Collapse, Navbar, NavbarToggler, NavbarBrand } from 'reactstrap'
import * as routes from '../constants/routes'
import '../assets/scss/Header.scss'

const AuthNav = () => (
	<React.Fragment>
		<Nav navbar>
			<NavItem>
				
			</NavItem>
		</Nav>
		<Nav navbar className="ml-auto">
			<NavItem>
			</NavItem>
			<NavItem>
				
			</NavItem>
		</Nav>
	</React.Fragment>
)

const NonAuthNav = () => (
	<React.Fragment>
		<Nav navbar className="ml-auto">
			<NavItem>
				<NavLink tag={Link} to={routes.SIGNUP}>Sign Up</NavLink>
			</NavItem>
		</Nav>
		<Nav navbar className="ml-2">
			<NavItem>
				<Link to={routes.SIGNIN} className="btn btn-brand">Sign In</Link>
			</NavItem>
		</Nav>
	</React.Fragment>
)

class Header extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			collapsed: true
		}
	}

	toggleNavbar() {
		this.setState(prevState => ({ collapsed: !prevState.collapsed }))
	}

	render() {
		return (
			<Navbar className="custom-nav1" dark expand="md">
				<NavbarBrand to={routes.HOME} tag={Link}>
					<span>TE2 TWEB</span>
				</NavbarBrand>
				<NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
				<Collapse isOpen={!this.state.collapsed} navbar>
					{ localStorage.getItem('user') ? <AuthNav /> : <NonAuthNav />}
				</Collapse>
			</Navbar>
		)
	}
}

export default Header