import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBCollapse,
  MDBNavbarNav,
  MDBIcon,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [showNavNoTogglerThird, setShowNavNoTogglerThird] = useState(false);

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarToggler
          type="button"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavNoTogglerThird(!showNavNoTogglerThird)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <NavLink className='navbar-brand' to="/">
            <img src='/images/logo.jpg' alt='Blog'/>
        </NavLink>

        <MDBCollapse navbar show={showNavNoTogglerThird}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <NavLink to="/add-blog" className={({isActive}) => (isActive ? 'active' : '')}>
                Add Blog
              </NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <NavLink to="/about" className={({isActive}) => (isActive ? 'active' : '')}>
                About
              </NavLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
