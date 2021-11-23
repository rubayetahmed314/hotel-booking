import React, { useState } from 'react';
import './Header.css';
import { NavLink, withRouter } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarToggler,
    Collapse,
} from 'reactstrap';

import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        token: state.token,
    };
};

const Header = props => {
    // console.log('From Header:', props);
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const onCategoryClick = category => {
        props.history.push(`/photos/${category}`, { fromHeader: true });

        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    let logInOut = null;
    if (props.token === null) {
        logInOut = (
            <NavItem>
                <NavLink exact to='/login' className='NavLink'>
                    Login
                </NavLink>
            </NavItem>
        );
    } else {
        logInOut = (
            <NavItem>
                <NavLink exact to='/logout' className='NavLink'>
                    Logout
                </NavLink>
            </NavItem>
        );
    }
    return (
        <div
            style={{
                marginBottom: '20px',
                position: 'sticky',
                top: 0,
                zIndex: 2,
            }}
        >
            <Navbar
                dark
                color='dark'
                expand='md'
                className='justify-content-center'
            >
                <NavbarBrand
                    href='/'
                    className='mr-auto ml-md-2 py-0'
                    style={{
                        fontFamily: "'Lobster', cursive",
                        fontSize: '150%',
                        color: 'white',
                    }}
                >
                    <img
                        src={process.env.PUBLIC_URL + '/logo.png'}
                        alt='Logo'
                        height='50vh'
                    />
                    {'   '}
                    Hotel Booking
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className='ml-auto mr-md-3'>
                        <NavItem>
                            <NavLink exact to='/' className='NavLink'>
                                Home
                            </NavLink>
                        </NavItem>
                        {/* <NavItem> */}
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle
                                nav
                                caret
                                style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                    fontSize: '20px',
                                    marginTop: '-8px',
                                    marginLeft: '25px',
                                }}
                            >
                                Categories
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem
                                    onClick={() => onCategoryClick('lowtier')}
                                >
                                    Low Tier
                                </DropdownItem>
                                <DropdownItem
                                    onClick={() => onCategoryClick('midtier')}
                                >
                                    Mid Tier
                                </DropdownItem>
                                <DropdownItem
                                    onClick={() => onCategoryClick('toptier')}
                                >
                                    Top Tier
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        {/* </NavItem> */}
                        {logInOut}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default connect(mapStateToProps)(withRouter(Header));
