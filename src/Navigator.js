import React, { Component } from 'react';
import {Navbar, Nav, NavItem, NavDropdown} from 'react-bootstrap'
import classes from './nav.module.css';
import logo from './assets/rat.png'

class Navigator extends Component {


    render() {

  
        return (
            
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">
            <img className={classes.logo}
                  src={logo}
                  width="90"
                  height="70"
                  alt="React Bootstrap logo"
                />

            </Navbar.Brand>
              
            </Navbar>
            
        );
    }
}

export default Navigator;


/**
 * old code
 * <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="Dash">Dash</Nav.Link>
                  <Nav.Link href="Settings">Settings</Nav.Link>
                  <Nav.Link href="about">About</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="contact">Contact Us</Nav.Link>
                </Nav>
              </Navbar.Collapse>
 */