import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import Logo from '../../assets/logo.png';

import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        token: state.token,
    }
}

const Header = props => {
    let links = null;
    if (props.token === null) {
        links = (
            <Nav className="mr-md-5">
                <NavItem>
                    <NavLink exact to="/login" className="NavLink">Login</NavLink>
                </NavItem>
            </Nav>
        )
    } else {
        links = (
            <Nav className="mr-md-5">
                <NavItem>
                    <NavLink exact to="/" className="NavLink me-2">Burger Builder</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink exact to="/orders" className="NavLink me-2">Orders</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink exact to="/logout" className="NavLink me-2">Logout</NavLink>
                </NavItem>
            </Nav>
        )
    }
    return (
        <div className="Navigation">
            <Navbar style={{
                backgroundColor: "#D70F64",
                height: "70px",
            }}>
                <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
                    <NavLink exact to="/" className="NavLink me-2">
                    <img src={Logo} alt="Logo" width="80px" />
                    </NavLink>

                </NavbarBrand>
                {links}
            </Navbar>
        </div>
    )
}

export default connect(mapStateToProps)(Header);