import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../images/online-mgt-meeting-logo.png";

const Header = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Nav className="flex-row justify-content-between full-width">
            <Navbar.Brand to="/" as={Link}>
              <img src={Logo} alt="logo" width="50px" /> <strong>OMS</strong>
            </Navbar.Brand>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
