import React from "react";
import { Navbar, Nav } from "react-bootstrap";
// cant use <a> in react, instead, use <link> from react router dom
import { Link, useLocation } from "react-router-dom";
import Auth from "../utils/auth"
import heart from "../assets/images/heart.png"

export default function Header() {
  // logour function
  const logout = event => {
    event.preventDefault()
    Auth.logout()
  }
  const loggedIn = Auth.loggedIn();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';


  return (

    <Navbar collapseOnSelect expand="sm" variant="dark" className={loggedIn && !isHomePage ? "bg-dark" : null}>
      {loggedIn ? (
        <>
          <Navbar.Brand as={Link} to="/" className="brand brand-logged d-flex align-items-center">
            <img alt="heart" style={{ display: "inline" }} src={heart} className="heart-icon" />
            FitTrack
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav >
              {/* use eventKey to show navbar style from react bootstrap */}
              <Nav.Link as={Link} to="/exercise" eventKey="1" >Exercise</Nav.Link>
              <Nav.Link as={Link} to="/history" eventKey="2">History</Nav.Link>
              <Nav.Link as={Link} to="/" eventKey="3" onClick={logout} >Logout </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>) :
        (<Navbar.Brand as={Link} to="/" className={`brand brand-new mx-auto d-flex align-items-center
          ${isLoginPage || isSignupPage ? "brand-text" : null}`}>
          <img alt="heart" style={{ display: "inline" }} src={heart} className="heart-icon" />
          FitTrack
        </Navbar.Brand>)}
    </Navbar >
  );
}
