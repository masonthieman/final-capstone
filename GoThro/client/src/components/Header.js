import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
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
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="transparent" expand="md">
        <NavbarBrand tag={RRNavLink} to="/">GoThro</NavbarBrand>
        
          
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
              <>
              
               
                <NavLink color="light" tag={RRNavLink} to="/course">
                Courses
                </NavLink>
              
              
                <NavLink tag={RRNavLink} to="/course/add">
                  Add Course
                </NavLink>
                
        
              
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
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        
      </Navbar>
    </div>
  );
}
