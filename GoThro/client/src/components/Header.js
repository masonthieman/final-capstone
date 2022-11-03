import React, { useState } from 'react';
import { NavLink as RRNavLink, useLocation } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { logout } from '../modules/authManager';

export default function Header({ isLoggedIn, user }) {
  const location = useLocation()

  return (
    location.pathname === "/login"
    || location.pathname === "/register"
    || location.pathname === "/" ?
    ""
    :
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={RRNavLink} to="/">GoThro</NavbarBrand>
        
          
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
            <>
              <Nav navbar>
              
               
                <NavLink  tag={RRNavLink} to="/course">
                Courses
                </NavLink>
              </Nav>
              
              <Nav navbar>
                <NavLink tag={RRNavLink} to="/course/add">
                  Add Course
                </NavLink>
              </Nav>
            </>  
        
              
            
            }
          
          
          <Nav navbar>
            {isLoggedIn &&
              <>

                <NavItem>
                  <NavLink aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout} tag={RRNavLink} to="/">Logout</NavLink>
                </NavItem>

              </>
            }
            
          </Nav>
        
      </Navbar>
    
  );
}
