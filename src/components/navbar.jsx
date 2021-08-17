import React, { useEffect, useState } from 'react';
//using plain bootstrap cause couple of issues
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';

const NavBar = () => {
  const handleLogout = () => {
    console.log("wanna logout")
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    window.location = "/"
  }
  return(
    <div>
      <div className="row">
        <div className="d-flex flex-column">
          <Navbar className="justify-content-around mb-5"  expand="md" sticky="top">
            <Navbar.Brand href="/" className="mx-3 p-2">HOME</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-5 justify-content-around"/>
            <Navbar.Collapse id="basic-navbar-nav" className="mr-5 justify-content-end mx-auto">
              <Nav className="p-2">
              <Nav.Link className="m-1" href="/signup">Sign Up</Nav.Link>
              <Nav.Link className="m-1" href="/signin">Sign In</Nav.Link>
              <Nav.Link className="m-1" href="/profile">Profile</Nav.Link>
              <Button className="m-1" variant="secondary" onClick={handleLogout}>Log Out</Button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </div>
  )
};

export default NavBar